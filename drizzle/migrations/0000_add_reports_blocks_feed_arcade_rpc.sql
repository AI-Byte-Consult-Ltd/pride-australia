-- Content reports (community moderation)
create table public.content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null,
  target_type text not null check (target_type in ('post','reply','user')),
  target_id uuid not null,
  reason text not null check (char_length(reason) between 1 and 500),
  status text not null default 'open' check (status in ('open','resolved','dismissed')),
  resolved_by uuid,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (reporter_id, target_type, target_id)
);

grant select, insert, update on public.content_reports to authenticated;
grant all on public.content_reports to service_role;
alter table public.content_reports enable row level security;

create policy "Users can file reports"
  on public.content_reports for insert to authenticated
  with check (reporter_id = auth.uid());
create policy "Users can view their own reports"
  on public.content_reports for select to authenticated
  using (reporter_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins can resolve reports"
  on public.content_reports for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- User blocks (muting other users)
create table public.user_blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null,
  blocked_id uuid not null,
  created_at timestamptz not null default now(),
  unique (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

grant select, insert, delete on public.user_blocks to authenticated;
grant all on public.user_blocks to service_role;
alter table public.user_blocks enable row level security;

create policy "Users can manage their own blocks"
  on public.user_blocks for all to authenticated
  using (blocker_id = auth.uid())
  with check (blocker_id = auth.uid());

-- Arcade game sessions (server-validated rounds; only touched by RPCs)
create table public.arcade_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  score integer not null default 0,
  reward integer not null default 0,
  finished boolean not null default false,
  created_at timestamptz not null default now()
);

grant all on public.arcade_sessions to service_role;
alter table public.arcade_sessions enable row level security;

-- Unified feed: posts + echoes with counters, blocked-user filtering,
-- hashtag filtering, pagination and author mode.
create or replace function public.get_feed(
  _mode text default 'for_you',
  _limit integer default 20,
  _before timestamptz default null,
  _hashtag text default null,
  _author uuid default null
)
returns table (
  item_type text,
  post_id uuid,
  content text,
  created_at timestamptz,
  author_id uuid,
  author_name text,
  author_username text,
  author_avatar text,
  like_count bigint,
  liked_by_me boolean,
  reply_count bigint,
  echo_count bigint,
  echoed_by_me boolean,
  sticker text,
  image_url text,
  echoer_id uuid,
  echoer_name text,
  echoer_username text,
  echo_message text,
  item_time timestamptz
)
language sql
stable
security definer
set search_path to public
as $$
  with blocked as (
    select blocked_id as bid from user_blocks where blocker_id = auth.uid()
    union
    select blocker_id as bid from user_blocks where blocked_id = auth.uid()
  ),
  base as (
    select p.id as post_id, p.content, p.created_at, p.user_id as author_id,
      pr.display_name as author_name, pr.username as author_username, pr.avatar_url as author_avatar,
      (select count(*) from post_likes l where l.post_id = p.id)::bigint as like_count,
      exists (select 1 from post_likes l where l.post_id = p.id and l.user_id = auth.uid()) as liked_by_me,
      (select count(*) from post_replies r where r.post_id = p.id)::bigint as reply_count,
      (select count(*) from post_echoes e where e.post_id = p.id)::bigint as echo_count,
      exists (select 1 from post_echoes e where e.post_id = p.id and e.user_id = auth.uid()) as echoed_by_me,
      p.sticker, p.image_url
    from posts p
    join profiles pr on pr.user_id = p.user_id
  ),
  posts_rows as (
    select 'post'::text as item_type, post_id, content, created_at, author_id, author_name, author_username,
      author_avatar, like_count, liked_by_me, reply_count, echo_count, echoed_by_me, sticker, image_url,
      null::uuid as echoer_id, null::text as echoer_name, null::text as echoer_username, null::text as echo_message,
      created_at as item_time
    from base
  ),
  echo_rows as (
    select 'echo'::text as item_type, b.post_id, b.content, b.created_at, b.author_id, b.author_name, b.author_username,
      b.author_avatar, b.like_count, b.liked_by_me, b.reply_count, b.echo_count, b.echoed_by_me, b.sticker, b.image_url,
      e.user_id as echoer_id, epr.display_name as echoer_name, epr.username as echoer_username,
      e.message as echo_message, e.created_at as item_time
    from post_echoes e
    join base b on b.post_id = e.post_id
    join profiles epr on epr.user_id = e.user_id
  ),
  combined as (
    select * from posts_rows
    union all
    select * from echo_rows
  )
  select c.*
  from combined c
  where c.item_time < coalesce(_before, 'infinity'::timestamptz)
    and c.author_id not in (select bid from blocked)
    and coalesce(c.echoer_id, c.author_id) not in (select bid from blocked)
    and (
      (_mode = 'for_you')
      or (_mode = 'following' and (
        c.author_id in (select following_id from follows where follower_id = auth.uid())
        or c.echoer_id in (select following_id from follows where follower_id = auth.uid())
      ))
      or (_mode = 'author' and c.item_type = 'post' and c.author_id = _author)
    )
    and (
      _hashtag is null
      or c.content ~ ('(^|[^A-Za-z0-9_])#' || regexp_replace(trim(leading '#' from _hashtag), '[^A-Za-z0-9_]', '', 'g') || '($|[^A-Za-z0-9_])')
    )
  order by c.item_time desc
  limit _limit;
$$;

grant execute on function public.get_feed(text, integer, timestamptz, text, uuid) to authenticated, service_role;

-- Private per-user counters and referral code (not exposed via public profiles policies)
create or replace function public.get_my_private_profile()
returns table (
  username_changes integer,
  display_name_changes integer,
  avatar_changes integer,
  banner_changes integer,
  referral_code text
)
language sql
stable
security definer
set search_path to public
as $$
  select p.username_changes, p.display_name_changes, p.avatar_changes, p.banner_changes, p.referral_code
  from public.profiles p
  where p.user_id = auth.uid();
$$;

grant execute on function public.get_my_private_profile() to authenticated, service_role;

-- Paid profile field updates: first change is free, later ones cost Pride Coins.
-- Raises app error codes consumed by the Settings page:
-- invalid_username, username_taken, invalid_display_name, insufficient_coins, invalid_image_url
create or replace function public.update_profile_field(_field text, _value text)
returns integer
language plpgsql
security definer
set search_path to public
as $$
declare
  v_user uuid := auth.uid();
  v_profile public.profiles%rowtype;
  v_cost integer := 0;
  v_folder text;
begin
  if v_user is null then
    raise exception 'not_signed_in';
  end if;

  select * into v_profile from public.profiles where user_id = v_user;
  if not found then
    raise exception 'profile_not_found';
  end if;

  if _field = 'username' then
    if _value is null or _value !~ '^@[A-Za-z0-9_]{3,29}$' then
      raise exception 'invalid_username';
    end if;
    if v_profile.username = _value then
      return 0;
    end if;
    if v_profile.username_changes >= 1 then
      v_cost := 50;
    end if;
    if v_profile.pride_coins < v_cost then
      raise exception 'insufficient_coins';
    end if;
    update public.profiles
      set username = _value, username_changes = username_changes + 1,
          pride_coins = pride_coins - v_cost, updated_at = now()
      where user_id = v_user;
    return v_cost;

  elsif _field = 'display_name' then
    if _value is null or char_length(_value) < 2 or char_length(_value) > 50 then
      raise exception 'invalid_display_name';
    end if;
    if v_profile.display_name = _value then
      return 0;
    end if;
    if v_profile.display_name_changes >= 1 then
      v_cost := 25;
    end if;
    if v_profile.pride_coins < v_cost then
      raise exception 'insufficient_coins';
    end if;
    update public.profiles
      set display_name = _value, display_name_changes = display_name_changes + 1,
          pride_coins = pride_coins - v_cost, updated_at = now()
      where user_id = v_user;
    return v_cost;

  elsif _field in ('avatar_url', 'banner_url') then
    v_folder := case when _field = 'avatar_url' then 'avatars' else 'banners' end;
    if _value is null or _value not like '%/object/public/pride-social-network/' || v_folder || '/%' then
      raise exception 'invalid_image_url';
    end if;
    if _field = 'avatar_url' then
      v_cost := case when v_profile.avatar_changes >= 1 then 30 else 0 end;
    else
      v_cost := case when v_profile.banner_changes >= 1 then 40 else 0 end;
    end if;
    if v_profile.pride_coins < v_cost then
      raise exception 'insufficient_coins';
    end if;
    if _field = 'avatar_url' then
      update public.profiles
        set avatar_url = _value, avatar_changes = avatar_changes + 1,
            pride_coins = pride_coins - v_cost, updated_at = now()
        where user_id = v_user;
    else
      update public.profiles
        set banner_url = _value, banner_changes = banner_changes + 1,
            pride_coins = pride_coins - v_cost, updated_at = now()
        where user_id = v_user;
    end if;
    return v_cost;

  else
    raise exception 'invalid_field';
  end if;

exception
  when unique_violation then
    raise exception 'username_taken';
end;
$$;

grant execute on function public.update_profile_field(text, text) to authenticated, service_role;

-- GDPR self-service account deletion (cascades clean public data)
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path to public
as $$
begin
  if auth.uid() is null then
    raise exception 'not_signed_in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

grant execute on function public.delete_my_account() to authenticated, service_role;

-- Moderation queue for admins/moderators
create or replace function public.get_open_reports(_limit integer default 50)
returns table (
  id uuid,
  target_type text,
  target_id uuid,
  reason text,
  status text,
  reporter_id uuid,
  reporter_username text,
  target_username text,
  target_preview text,
  created_at timestamptz
)
language plpgsql
stable
security definer
set search_path to public
as $$
begin
  if not coalesce(public.has_role(auth.uid(), 'admin'), false)
     and not coalesce(public.has_role(auth.uid(), 'moderator'), false) then
    return;
  end if;

  return query
  select r.id, r.target_type, r.target_id, r.reason, r.status, r.reporter_id,
    pr.username as reporter_username,
    coalesce(tp.username, tp.display_name) as target_username,
    case
      when r.target_type = 'post' then (select p.content from public.posts p where p.id = r.target_id)
      when r.target_type = 'reply' then (select rr.content from public.post_replies rr where rr.id = r.target_id)
    end::text as target_preview,
    r.created_at
  from public.content_reports r
  left join public.profiles pr on pr.user_id = r.reporter_id
  left join public.profiles tp on tp.user_id = r.target_id
  where r.status = 'open'
  order by r.created_at desc
  limit _limit;
end;
$$;

grant execute on function public.get_open_reports(integer) to authenticated, service_role;

-- Arcade: charge the 10-coin entry fee and open a server-validated session
create or replace function public.arcade_start()
returns uuid
language plpgsql
security definer
set search_path to public
as $$
declare
  v_user uuid := auth.uid();
  v_id uuid;
begin
  if v_user is null then
    raise exception 'not_signed_in';
  end if;
  if (select pride_coins from public.profiles where user_id = v_user) < 10 then
    raise exception 'insufficient_coins';
  end if;
  update public.profiles set pride_coins = pride_coins - 10 where user_id = v_user;
  insert into public.arcade_sessions (user_id) values (v_user) returning id into v_id;
  return v_id;
end;
$$;

grant execute on function public.arcade_start() to authenticated, service_role;

-- Arcade: pay out the reward for a finished session (score / 5, capped at 50)
create or replace function public.arcade_finish(_session_id uuid, _score integer)
returns integer
language plpgsql
security definer
set search_path to public
as $$
declare
  v_user uuid := auth.uid();
  v_reward integer;
begin
  if v_user is null then
    raise exception 'not_signed_in';
  end if;
  update public.arcade_sessions
    set score = greatest(coalesce(_score, 0), 0),
        finished = true,
        reward = least(floor(greatest(coalesce(_score, 0), 0) / 5.0)::int, 50)
    where id = _session_id and user_id = v_user and finished = false
    returning reward into v_reward;
  if v_reward is null then
    return 0;
  end if;
  if v_reward > 0 then
    update public.profiles set pride_coins = pride_coins + v_reward where user_id = v_user;
  end if;
  return v_reward;
end;
$$;

grant execute on function public.arcade_finish(uuid, integer) to authenticated, service_role;

-- Assign a generated username to new accounts that don't have one yet
create or replace function public.ensure_username(_candidate text)
returns text
language plpgsql
security definer
set search_path to public
as $$
declare
  v_user uuid := auth.uid();
  v_current text;
  v_final text := _candidate;
  v_try integer := 0;
begin
  if v_user is null then
    return null;
  end if;
  select username into v_current from public.profiles where user_id = v_user;
  if v_current is not null then
    return v_current;
  end if;
  if v_final is null or v_final !~ '^@[A-Za-z0-9_]{3,29}$' then
    v_final := '@pride' || substring(v_user::text from 1 for 6);
  end if;
  loop
    begin
      update public.profiles set username = v_final where user_id = v_user and username is null;
      if found then
        return v_final;
      end if;
      exit;
    exception when unique_violation then
      v_try := v_try + 1;
      if v_try > 5 then
        exit;
      end if;
      v_final := _candidate || (1000 + floor(random() * 9000))::int::text;
    end;
  end loop;
  return null;
end;
$$;

grant execute on function public.ensure_username(text) to authenticated, service_role;
