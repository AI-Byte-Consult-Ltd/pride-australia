-- =====================================================================
-- Security & integrity hardening + Pride Coins ledger
--
-- One-time migration. Fixes:
--   * balance / counters writable directly from the browser
--   * coin functions callable for any user_id (add_coins, arcade_*, spend_*, referral)
--   * like/unlike and echo/unecho farming, empty-post farming
--   * forged notifications from the client
--   * private profile fields (date of birth, referral code) readable by everyone
--   * businesses could approve themselves
--   * follows / businesses created outside migrations (RLS made explicit here)
-- Adds: points ledger, block list, content reports, account deletion,
--       server-side feed with real counts and pagination.
--
-- Pride Coins are internal, non-transferable activity points of the platform.
-- They have no monetary value and are not connected to any cryptocurrency
-- or blockchain token.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Ledger: every change of a balance is recorded
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.coin_ledger (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL,
  amount integer NOT NULL,
  reason text NOT NULL,
  ref_key text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- One reward per (user, reason, reference): unlike/re-like no longer pays twice
CREATE UNIQUE INDEX IF NOT EXISTS coin_ledger_once
  ON public.coin_ledger (user_id, reason, ref_key) WHERE ref_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS coin_ledger_user_time
  ON public.coin_ledger (user_id, reason, created_at DESC);

ALTER TABLE public.coin_ledger ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own ledger" ON public.coin_ledger;
CREATE POLICY "Users can view own ledger" ON public.coin_ledger
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
REVOKE INSERT, UPDATE, DELETE ON public.coin_ledger FROM anon, authenticated;

-- Opening balances, so that the ledger sums match current balances
INSERT INTO public.coin_ledger (user_id, amount, reason, ref_key)
SELECT user_id, pride_coins, 'opening_balance', 'opening'
FROM public.profiles
WHERE pride_coins <> 0
ON CONFLICT DO NOTHING;

-- Internal: award (or charge) points. Never callable from the client.
-- Returns the amount actually applied (0 if capped or already awarded).
CREATE OR REPLACE FUNCTION public._coin_award(
  _user_id uuid, _amount integer, _reason text, _ref_key text, _daily_cap integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _today integer;
  _id bigint;
BEGIN
  IF _user_id IS NULL OR _amount = 0 THEN
    RETURN 0;
  END IF;

  -- serialise awards per user+reason so the daily cap can't be raced
  PERFORM pg_advisory_xact_lock(hashtext(_user_id::text || ':' || _reason));

  IF _daily_cap IS NOT NULL AND _amount > 0 THEN
    SELECT coalesce(sum(amount), 0) INTO _today
    FROM coin_ledger
    WHERE user_id = _user_id AND reason = _reason
      AND created_at > now() - interval '24 hours';
    IF _today >= _daily_cap THEN
      RETURN 0;
    END IF;
    _amount := least(_amount, _daily_cap - _today);
  END IF;

  INSERT INTO coin_ledger (user_id, amount, reason, ref_key)
  VALUES (_user_id, _amount, _reason, _ref_key)
  ON CONFLICT DO NOTHING
  RETURNING id INTO _id;

  IF _id IS NULL THEN
    RETURN 0;
  END IF;

  UPDATE profiles SET pride_coins = pride_coins + _amount WHERE user_id = _user_id;
  RETURN _amount;
END;
$$;

-- Internal: charge points atomically. Returns false on insufficient balance.
CREATE OR REPLACE FUNCTION public._coin_charge(_user_id uuid, _cost integer, _reason text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _cost <= 0 THEN
    RETURN true;
  END IF;
  UPDATE profiles SET pride_coins = pride_coins - _cost
  WHERE user_id = _user_id AND pride_coins >= _cost;
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  INSERT INTO coin_ledger (user_id, amount, reason) VALUES (_user_id, -_cost, _reason);
  RETURN true;
END;
$$;

-- ---------------------------------------------------------------------
-- 2. Remove the unsafe functions
-- ---------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.arcade_play(uuid, integer);
DROP FUNCTION IF EXISTS public.arcade_reward(uuid, integer);
DROP FUNCTION IF EXISTS public.spend_coins_for_change(uuid, text);
DROP FUNCTION IF EXISTS public.process_referral(text, uuid);

-- add_coins is kept only as an internal helper (no client access, logged)
CREATE OR REPLACE FUNCTION public.add_coins(target_user_id uuid, amount integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM _coin_award(target_user_id, amount, 'legacy', NULL, NULL);
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_add_pride_coins(_target_user_id uuid, _amount integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can modify Pride Coins';
  END IF;
  IF _amount < -1000000 OR _amount > 1000000 OR _amount = 0 THEN
    RAISE EXCEPTION 'Invalid amount';
  END IF;
  INSERT INTO coin_ledger (user_id, amount, reason, ref_key)
  VALUES (_target_user_id, _amount, 'admin', 'by:' || auth.uid() || ':' || gen_random_uuid());
  UPDATE profiles SET pride_coins = greatest(0, pride_coins + _amount)
  WHERE user_id = _target_user_id;
END;
$$;

-- ---------------------------------------------------------------------
-- 3. Profiles: lock down writes and private columns
-- ---------------------------------------------------------------------
-- Writes: only bio directly; everything else goes through checked functions.
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;
GRANT UPDATE (bio) ON public.profiles TO authenticated;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Reads: public columns only. date_of_birth, referral_code and change
-- counters are visible to the owner via get_my_private_profile().
REVOKE SELECT ON public.profiles FROM anon, authenticated;
GRANT SELECT (id, user_id, display_name, username, avatar_url, banner_url, bio,
              pride_coins, created_at, updated_at)
  ON public.profiles TO authenticated;

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_bio_length;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_bio_length CHECK (bio IS NULL OR length(bio) <= 500) NOT VALID;

CREATE OR REPLACE FUNCTION public.get_my_private_profile()
RETURNS TABLE (
  referral_code text, date_of_birth date,
  username_changes integer, display_name_changes integer,
  avatar_changes integer, banner_changes integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT referral_code, date_of_birth, username_changes, display_name_changes,
         avatar_changes, banner_changes
  FROM profiles WHERE user_id = auth.uid();
$$;

-- Sets a generated username once, for accounts that don't have one yet.
-- Free and does not count as a change. Returns the resulting username.
CREATE OR REPLACE FUNCTION public.ensure_username(_candidate text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _current text;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;
  SELECT username INTO _current FROM profiles WHERE user_id = auth.uid();
  IF _current IS NOT NULL THEN
    RETURN _current;
  END IF;
  IF _candidate !~ '^@[A-Za-z0-9_]{3,29}$'
     OR EXISTS (SELECT 1 FROM profiles WHERE lower(username) = lower(_candidate)) THEN
    _candidate := '@Pride' || substr(replace(auth.uid()::text, '-', ''), 1, 10);
  END IF;
  UPDATE profiles SET username = _candidate WHERE user_id = auth.uid() AND username IS NULL;
  RETURN _candidate;
END;
$$;

-- Changes username / display name / avatar / banner. First change is free,
-- later ones cost Pride Coins. Returns the cost that was charged.
CREATE OR REPLACE FUNCTION public.update_profile_field(_field text, _value text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _p profiles%ROWTYPE;
  _changes integer;
  _price integer;
  _cost integer;
  _url_prefix text;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  SELECT * INTO _p FROM profiles WHERE user_id = _uid FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile_not_found';
  END IF;

  _value := btrim(_value);
  _url_prefix := '^https://[a-z0-9]+\.supabase\.co/storage/v1/object/public/pride-social-network/';

  IF _field = 'username' THEN
    IF _value !~ '^@[A-Za-z0-9_]{3,29}$' THEN
      RAISE EXCEPTION 'invalid_username';
    END IF;
    IF EXISTS (SELECT 1 FROM profiles WHERE lower(username) = lower(_value) AND user_id <> _uid) THEN
      RAISE EXCEPTION 'username_taken';
    END IF;
    IF _p.username IS NOT DISTINCT FROM _value THEN RETURN 0; END IF;
    _changes := _p.username_changes; _price := 50;
  ELSIF _field = 'display_name' THEN
    IF length(_value) < 2 OR length(_value) > 50 THEN
      RAISE EXCEPTION 'invalid_display_name';
    END IF;
    IF _p.display_name IS NOT DISTINCT FROM _value THEN RETURN 0; END IF;
    _changes := _p.display_name_changes; _price := 25;
  ELSIF _field = 'avatar_url' THEN
    IF _value !~ (_url_prefix || 'avatars/' || _uid || '/') THEN
      RAISE EXCEPTION 'invalid_image_url';
    END IF;
    _changes := _p.avatar_changes; _price := 30;
  ELSIF _field = 'banner_url' THEN
    IF _value !~ (_url_prefix || 'banners/' || _uid || '/') THEN
      RAISE EXCEPTION 'invalid_image_url';
    END IF;
    _changes := _p.banner_changes; _price := 40;
  ELSE
    RAISE EXCEPTION 'invalid_field';
  END IF;

  _cost := CASE WHEN _changes >= 1 THEN _price ELSE 0 END;
  IF NOT _coin_charge(_uid, _cost, 'change_' || _field) THEN
    RAISE EXCEPTION 'insufficient_coins';
  END IF;

  IF _field = 'username' THEN
    UPDATE profiles SET username = _value, username_changes = username_changes + 1 WHERE user_id = _uid;
  ELSIF _field = 'display_name' THEN
    UPDATE profiles SET display_name = _value, display_name_changes = display_name_changes + 1 WHERE user_id = _uid;
  ELSIF _field = 'avatar_url' THEN
    UPDATE profiles SET avatar_url = _value, avatar_changes = avatar_changes + 1 WHERE user_id = _uid;
  ELSE
    UPDATE profiles SET banner_url = _value, banner_changes = banner_changes + 1 WHERE user_id = _uid;
  END IF;

  RETURN _cost;
END;
$$;

-- New user: profile with display name and date of birth from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _dob date;
BEGIN
  BEGIN
    _dob := (new.raw_user_meta_data ->> 'date_of_birth')::date;
  EXCEPTION WHEN others THEN
    _dob := NULL;
  END;
  INSERT INTO public.profiles (user_id, display_name, date_of_birth)
  VALUES (new.id, left(new.raw_user_meta_data ->> 'display_name', 50), _dob);
  RETURN new;
END;
$$;

-- ---------------------------------------------------------------------
-- 4. Rewards for activity: once per target, with daily caps
-- ---------------------------------------------------------------------
-- Posts must not be empty (text, sticker or image)
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_not_empty;
ALTER TABLE public.posts ADD CONSTRAINT posts_not_empty
  CHECK (length(btrim(content)) > 0 OR sticker IS NOT NULL OR image_url IS NOT NULL) NOT VALID;

ALTER TABLE public.post_replies DROP CONSTRAINT IF EXISTS post_replies_content_length;
ALTER TABLE public.post_replies ADD CONSTRAINT post_replies_content_length
  CHECK (length(btrim(content)) > 0 AND length(content) <= 2000) NOT VALID;

ALTER TABLE public.post_echoes DROP CONSTRAINT IF EXISTS post_echoes_message_length;
ALTER TABLE public.post_echoes ADD CONSTRAINT post_echoes_message_length
  CHECK (message IS NULL OR length(message) <= 1000) NOT VALID;

CREATE OR REPLACE FUNCTION public.on_post_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM _coin_award(NEW.user_id, 5, 'post', NEW.id::text, 25);
  PERFORM _notify_mentions(NEW.user_id, NEW.content, 'mention_post', NEW.id, NULL);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.on_reply_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author uuid;
BEGIN
  SELECT user_id INTO post_author FROM posts WHERE id = NEW.post_id;
  PERFORM _coin_award(NEW.user_id, 2, 'reply', NEW.id::text, 20);
  IF post_author IS NOT NULL AND post_author <> NEW.user_id THEN
    PERFORM _coin_award(post_author, 1, 'reply_received', NEW.post_id || ':' || NEW.user_id, 50);
    PERFORM _notify(post_author, NEW.user_id, 'reply', NEW.post_id, NEW.id, left(NEW.content, 100));
  END IF;
  PERFORM _notify_mentions(NEW.user_id, NEW.content, 'mention_reply', NEW.post_id, NEW.id);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.on_like_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author uuid;
BEGIN
  SELECT user_id INTO post_author FROM posts WHERE id = NEW.post_id;
  IF post_author IS NOT NULL AND post_author <> NEW.user_id THEN
    PERFORM _coin_award(NEW.user_id, 1, 'like', NEW.post_id::text, 20);
    PERFORM _coin_award(post_author, 1, 'like_received', NEW.post_id || ':' || NEW.user_id, 100);
    -- notify only the first time this user likes this post
    IF NOT EXISTS (
      SELECT 1 FROM notifications
      WHERE recipient_id = post_author AND sender_id = NEW.user_id
        AND type = 'like' AND post_id = NEW.post_id
    ) THEN
      PERFORM _notify(post_author, NEW.user_id, 'like', NEW.post_id, NULL, NULL);
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.on_echo_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author uuid;
BEGIN
  SELECT user_id INTO post_author FROM posts WHERE id = NEW.post_id;
  IF post_author IS NOT NULL AND post_author <> NEW.user_id THEN
    PERFORM _coin_award(NEW.user_id, 3, 'echo', NEW.post_id::text, 15);
    PERFORM _coin_award(post_author, 2, 'echo_received', NEW.post_id || ':' || NEW.user_id, 100);
    PERFORM _notify(post_author, NEW.user_id, 'echo', NEW.post_id, NULL, left(NEW.message, 100));
  END IF;
  IF NEW.message IS NOT NULL THEN
    PERFORM _notify_mentions(NEW.user_id, NEW.message, 'mention_post', NEW.post_id, NULL);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_echo_created ON public.post_echoes;
CREATE TRIGGER trg_echo_created
  AFTER INSERT ON public.post_echoes
  FOR EACH ROW EXECUTE FUNCTION public.on_echo_created();

-- ---------------------------------------------------------------------
-- 5. Referrals: processed by the server when the email is confirmed
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated can insert referrals" ON public.referrals;
REVOKE INSERT, UPDATE, DELETE ON public.referrals FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.on_auth_user_confirmed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _code text := upper(btrim(NEW.raw_user_meta_data ->> 'referral_code'));
  _referrer uuid;
  _awarded integer;
BEGIN
  IF NEW.email_confirmed_at IS NULL OR _code IS NULL OR _code = '' THEN
    RETURN NEW;
  END IF;
  IF TG_OP = 'UPDATE' AND OLD.email_confirmed_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  SELECT user_id INTO _referrer FROM profiles WHERE referral_code = _code;
  IF _referrer IS NULL OR _referrer = NEW.id THEN
    RETURN NEW;
  END IF;

  -- max 5 rewarded invites per day per referrer
  _awarded := _coin_award(_referrer, 10, 'referral', NEW.id::text, 50);
  INSERT INTO referrals (referrer_id, referred_id, coins_awarded)
  VALUES (_referrer, NEW.id, _awarded)
  ON CONFLICT (referred_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_referral ON auth.users;
CREATE TRIGGER on_auth_user_referral
  AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.on_auth_user_confirmed();

-- ---------------------------------------------------------------------
-- 6. Arcade: server-side sessions
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.arcade_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  score integer,
  reward integer
);
CREATE INDEX IF NOT EXISTS arcade_sessions_user_time ON public.arcade_sessions (user_id, started_at DESC);
ALTER TABLE public.arcade_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own arcade sessions" ON public.arcade_sessions;
CREATE POLICY "Users can view own arcade sessions" ON public.arcade_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
REVOKE INSERT, UPDATE, DELETE ON public.arcade_sessions FROM anon, authenticated;

-- Pays the entry fee and opens a session. Returns the session id, or NULL
-- when the balance is too low or the daily play limit is reached.
CREATE OR REPLACE FUNCTION public.arcade_start()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _id uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;
  IF (SELECT count(*) FROM arcade_sessions
      WHERE user_id = _uid AND started_at > now() - interval '24 hours') >= 30 THEN
    RETURN NULL;
  END IF;
  IF NOT _coin_charge(_uid, 10, 'arcade_entry') THEN
    RETURN NULL;
  END IF;
  INSERT INTO arcade_sessions (user_id) VALUES (_uid) RETURNING id INTO _id;
  RETURN _id;
END;
$$;

-- Closes a session and pays the reward (score/5, max 50 per game,
-- max 100 per day). A game lasts 30 seconds; results that arrive too fast
-- or too late are not rewarded.
CREATE OR REPLACE FUNCTION public.arcade_finish(_session_id uuid, _score integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _s arcade_sessions%ROWTYPE;
  _elapsed numeric;
  _reward integer := 0;
BEGIN
  SELECT * INTO _s FROM arcade_sessions
  WHERE id = _session_id AND user_id = _uid AND finished_at IS NULL
  FOR UPDATE;
  IF NOT FOUND THEN
    RETURN 0;
  END IF;

  _elapsed := extract(epoch FROM now() - _s.started_at);
  IF _elapsed >= 5 AND _elapsed <= 600 AND _score > 0 THEN
    -- the score can't grow faster than ~10 points/second of real play
    _reward := least(floor(least(_score, _elapsed * 10) / 5)::integer, 50);
    _reward := _coin_award(_uid, _reward, 'arcade_reward', _session_id::text, 100);
  END IF;

  UPDATE arcade_sessions
  SET finished_at = now(), score = greatest(_score, 0), reward = _reward
  WHERE id = _session_id;
  RETURN _reward;
END;
$$;

-- ---------------------------------------------------------------------
-- 7. Notifications: created only by the server
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON public.notifications;
REVOKE INSERT ON public.notifications FROM anon, authenticated;

-- ---------------------------------------------------------------------
-- 8. Blocks and reports
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id uuid NOT NULL,
  blocked_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (blocker_id, blocked_id),
  CHECK (blocker_id <> blocked_id)
);
ALTER TABLE public.user_blocks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own blocks" ON public.user_blocks;
DROP POLICY IF EXISTS "Users can block" ON public.user_blocks;
DROP POLICY IF EXISTS "Users can unblock" ON public.user_blocks;
CREATE POLICY "Users can view own blocks" ON public.user_blocks
  FOR SELECT TO authenticated USING (auth.uid() = blocker_id);
CREATE POLICY "Users can block" ON public.user_blocks
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = blocker_id);
CREATE POLICY "Users can unblock" ON public.user_blocks
  FOR DELETE TO authenticated USING (auth.uid() = blocker_id);

CREATE OR REPLACE FUNCTION public.is_blocked_between(_a uuid, _b uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_blocks
    WHERE (blocker_id = _a AND blocked_id = _b) OR (blocker_id = _b AND blocked_id = _a)
  );
$$;

CREATE TABLE IF NOT EXISTS public.content_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('post', 'reply', 'user')),
  target_id uuid NOT NULL,
  reason text NOT NULL CHECK (length(btrim(reason)) BETWEEN 1 AND 500),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_by uuid,
  resolved_at timestamptz,
  UNIQUE (reporter_id, target_type, target_id)
);
CREATE INDEX IF NOT EXISTS content_reports_status ON public.content_reports (status, created_at DESC);
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can report" ON public.content_reports;
DROP POLICY IF EXISTS "Users and moderators can view reports" ON public.content_reports;
DROP POLICY IF EXISTS "Moderators can update reports" ON public.content_reports;
CREATE POLICY "Users can report" ON public.content_reports
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reporter_id AND status = 'open' AND resolved_by IS NULL);
CREATE POLICY "Users and moderators can view reports" ON public.content_reports
  FOR SELECT TO authenticated
  USING (auth.uid() = reporter_id OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'));
CREATE POLICY "Moderators can update reports" ON public.content_reports
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'));

-- Moderators can remove reported content
DROP POLICY IF EXISTS "Moderators can delete posts" ON public.posts;
CREATE POLICY "Moderators can delete posts" ON public.posts
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'));
DROP POLICY IF EXISTS "Moderators can delete replies" ON public.post_replies;
CREATE POLICY "Moderators can delete replies" ON public.post_replies
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'));

-- Moderation queue with a preview of the reported content
CREATE OR REPLACE FUNCTION public.get_open_reports(_limit integer DEFAULT 100)
RETURNS TABLE (
  id uuid, target_type text, target_id uuid, reason text, created_at timestamptz,
  reporter_username text, target_user_id uuid, target_username text, target_preview text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  IF NOT (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator')) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY
  SELECT r.id, r.target_type, r.target_id, r.reason, r.created_at,
         rp.username,
         t.user_id,
         tp.username,
         t.preview
  FROM content_reports r
  LEFT JOIN profiles rp ON rp.user_id = r.reporter_id
  LEFT JOIN LATERAL (
    SELECT p.user_id, left(p.content, 280) AS preview FROM posts p
      WHERE r.target_type = 'post' AND p.id = r.target_id
    UNION ALL
    SELECT pr.user_id, left(pr.content, 280) FROM post_replies pr
      WHERE r.target_type = 'reply' AND pr.id = r.target_id
    UNION ALL
    SELECT pf.user_id, left(coalesce(pf.bio, ''), 280) FROM profiles pf
      WHERE r.target_type = 'user' AND pf.user_id = r.target_id
  ) t ON true
  LEFT JOIN profiles tp ON tp.user_id = t.user_id
  WHERE r.status = 'open'
  ORDER BY r.created_at DESC
  LIMIT least(_limit, 500);
END;
$$;

-- Internal: create one notification (skips self and blocked pairs)
CREATE OR REPLACE FUNCTION public._notify(
  _recipient uuid, _sender uuid, _type text, _post_id uuid, _reply_id uuid, _content text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _recipient IS NULL OR _recipient = _sender OR is_blocked_between(_recipient, _sender) THEN
    RETURN;
  END IF;
  INSERT INTO notifications (recipient_id, sender_id, type, post_id, reply_id, content)
  VALUES (_recipient, _sender, _type, _post_id, _reply_id, _content);
END;
$$;

-- Internal: notify @mentioned users (max 10 per text)
CREATE OR REPLACE FUNCTION public._notify_mentions(
  _sender uuid, _content text, _type text, _post_id uuid, _reply_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _recipient uuid;
BEGIN
  IF _content IS NULL OR position('@' in _content) = 0 THEN
    RETURN;
  END IF;
  FOR _recipient IN
    SELECT DISTINCT p.user_id
    FROM (
      SELECT DISTINCT m[1] AS name
      FROM regexp_matches(_content, '@(\w+)', 'g') AS m
      LIMIT 10
    ) mentions
    JOIN profiles p ON p.username IN (mentions.name, '@' || mentions.name)
  LOOP
    PERFORM _notify(_recipient, _sender, _type, _post_id, _reply_id, left(_content, 100));
  END LOOP;
END;
$$;

-- Hashtag and follow notifications also respect blocks
CREATE OR REPLACE FUNCTION public.notify_hashtag_subscribers()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tag text;
  sub record;
BEGIN
  FOR tag IN
    SELECT DISTINCT lower((regexp_matches(NEW.content, '#([A-Za-z0-9_]+)', 'g'))[1])
  LOOP
    FOR sub IN
      SELECT user_id FROM hashtag_subscriptions
      WHERE lower(hashtag) = '#' || tag AND user_id <> NEW.user_id
    LOOP
      PERFORM _notify(sub.user_id, NEW.user_id, 'hashtag', NEW.id, NULL, '#' || tag);
    END LOOP;
  END LOOP;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.on_follow_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM _notify(NEW.following_id, NEW.follower_id, 'follow', NULL, NULL, 'started following you');
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------
-- 9. Follows (table was created outside migrations): explicit RLS
-- ---------------------------------------------------------------------
DELETE FROM public.follows a
USING public.follows b
WHERE a.follower_id = b.follower_id AND a.following_id = b.following_id
  AND a.created_at > b.created_at;
DELETE FROM public.follows WHERE follower_id = following_id;
CREATE UNIQUE INDEX IF NOT EXISTS follows_pair_unique ON public.follows (follower_id, following_id);
CREATE INDEX IF NOT EXISTS follows_following_idx ON public.follows (following_id);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'follows' LOOP
    EXECUTE format('DROP POLICY %I ON public.follows', pol.policyname);
  END LOOP;
END $$;
CREATE POLICY "Follows are viewable by authenticated users" ON public.follows
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can follow others" ON public.follows
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = follower_id AND follower_id <> following_id
              AND NOT is_blocked_between(follower_id, following_id));
CREATE POLICY "Users can unfollow" ON public.follows
  FOR DELETE TO authenticated USING (auth.uid() = follower_id);
REVOKE UPDATE ON public.follows FROM anon, authenticated;

-- ---------------------------------------------------------------------
-- 10. Businesses: owners can't approve themselves
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.guard_business_approval()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NOT NULL
     AND NOT (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator')) THEN
    IF TG_OP = 'INSERT' THEN
      NEW.is_approved := false;
    ELSE
      NEW.is_approved := OLD.is_approved;
      NEW.user_id := OLD.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_guard_business_approval ON public.businesses;
CREATE TRIGGER trg_guard_business_approval
  BEFORE INSERT OR UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.guard_business_approval();

DROP POLICY IF EXISTS "Moderators can manage businesses" ON public.businesses;
CREATE POLICY "Moderators can manage businesses" ON public.businesses
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'))
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'));

-- ---------------------------------------------------------------------
-- 11. Server-side feed: real counts, pagination, following, blocks
-- ---------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS posts_created_idx ON public.posts (created_at DESC);
CREATE INDEX IF NOT EXISTS posts_user_created_idx ON public.posts (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS post_echoes_created_idx ON public.post_echoes (created_at DESC);

-- _mode: 'for_you' (everyone), 'following' (people I follow), 'author' (one user's posts)
-- _before: cursor = item_time of the last item already shown
CREATE OR REPLACE FUNCTION public.get_feed(
  _mode text DEFAULT 'for_you',
  _before timestamptz DEFAULT NULL,
  _limit integer DEFAULT 30,
  _hashtag text DEFAULT NULL,
  _author uuid DEFAULT NULL
)
RETURNS TABLE (
  item_type text,
  item_time timestamptz,
  post_id uuid,
  content text,
  sticker text,
  image_url text,
  created_at timestamptz,
  author_id uuid,
  author_name text,
  author_username text,
  author_avatar text,
  like_count bigint,
  reply_count bigint,
  echo_count bigint,
  liked_by_me boolean,
  echoed_by_me boolean,
  echoer_id uuid,
  echoer_name text,
  echoer_username text,
  echo_message text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
DECLARE
  _uid uuid := auth.uid();
  _tag text := nullif(lower(btrim(_hashtag)), '');
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;
  _limit := least(greatest(coalesce(_limit, 30), 1), 100);

  RETURN QUERY
  WITH hidden AS (
    SELECT blocked_id AS id FROM user_blocks WHERE blocker_id = _uid
    UNION
    SELECT blocker_id FROM user_blocks WHERE blocked_id = _uid
  ),
  followed AS (
    SELECT following_id AS id FROM follows WHERE follower_id = _uid
  ),
  items AS (
    (SELECT 'post'::text AS kind, p.created_at AS t, p.id AS pid,
            NULL::uuid AS eid, NULL::text AS emsg
     FROM posts p
     WHERE (_before IS NULL OR p.created_at < _before)
       AND p.user_id NOT IN (SELECT id FROM hidden)
       AND (_mode <> 'following' OR p.user_id IN (SELECT id FROM followed))
       AND (_mode <> 'author' OR p.user_id = _author)
       AND (_tag IS NULL OR position(_tag in lower(p.content)) > 0)
     ORDER BY p.created_at DESC
     LIMIT _limit)
    UNION ALL
    (SELECT 'echo'::text, e.created_at, e.post_id, e.user_id, e.message
     FROM post_echoes e
     JOIN posts p ON p.id = e.post_id
     WHERE _mode <> 'author'
       AND (_before IS NULL OR e.created_at < _before)
       AND e.user_id NOT IN (SELECT id FROM hidden)
       AND p.user_id NOT IN (SELECT id FROM hidden)
       AND (_mode <> 'following' OR e.user_id IN (SELECT id FROM followed))
       AND (_tag IS NULL OR position(_tag in lower(p.content)) > 0)
     ORDER BY e.created_at DESC
     LIMIT _limit)
  ),
  page AS (
    SELECT * FROM items ORDER BY t DESC LIMIT _limit
  )
  SELECT
    pg.kind, pg.t, p.id, p.content, p.sticker, p.image_url, p.created_at,
    p.user_id, coalesce(ap.display_name, 'Anonymous'), ap.username, ap.avatar_url,
    (SELECT count(*) FROM post_likes l WHERE l.post_id = p.id),
    (SELECT count(*) FROM post_replies r WHERE r.post_id = p.id),
    (SELECT count(*) FROM post_echoes e2 WHERE e2.post_id = p.id),
    EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = p.id AND l.user_id = _uid),
    EXISTS (SELECT 1 FROM post_echoes e2 WHERE e2.post_id = p.id AND e2.user_id = _uid),
    pg.eid, coalesce(ep.display_name, CASE WHEN pg.eid IS NOT NULL THEN 'Anonymous' END), ep.username,
    pg.emsg
  FROM page pg
  JOIN posts p ON p.id = pg.pid
  LEFT JOIN profiles ap ON ap.user_id = p.user_id
  LEFT JOIN profiles ep ON ep.user_id = pg.eid
  ORDER BY pg.t DESC;
END;
$$;

-- ---------------------------------------------------------------------
-- 12. Account deletion (GDPR art. 17)
-- ---------------------------------------------------------------------
-- Storage files are removed by the client (storage API) before this call.
CREATE OR REPLACE FUNCTION public.delete_my_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;
  DELETE FROM notifications WHERE recipient_id = _uid OR sender_id = _uid;
  DELETE FROM post_likes WHERE user_id = _uid;
  DELETE FROM post_echoes WHERE user_id = _uid;
  DELETE FROM post_replies WHERE user_id = _uid;
  DELETE FROM follows WHERE follower_id = _uid OR following_id = _uid;
  DELETE FROM hashtag_subscriptions WHERE user_id = _uid;
  DELETE FROM user_blocks WHERE blocker_id = _uid OR blocked_id = _uid;
  DELETE FROM content_reports WHERE reporter_id = _uid;
  DELETE FROM referrals WHERE referrer_id = _uid OR referred_id = _uid;
  DELETE FROM arcade_sessions WHERE user_id = _uid;
  DELETE FROM coin_ledger WHERE user_id = _uid;
  DELETE FROM businesses WHERE user_id = _uid;
  DELETE FROM posts WHERE user_id = _uid;
  DELETE FROM user_roles WHERE user_id = _uid;
  DELETE FROM profiles WHERE user_id = _uid;
  DELETE FROM auth.users WHERE id = _uid;
END;
$$;

-- ---------------------------------------------------------------------
-- 13. Function permissions
-- Supabase grants EXECUTE on new public functions to anon and
-- authenticated by default, so internal helpers must be revoked explicitly.
-- ---------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public._coin_award(uuid, integer, text, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public._coin_charge(uuid, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.add_coins(uuid, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public._notify(uuid, uuid, text, uuid, uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public._notify_mentions(uuid, text, text, uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_confirmed() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.guard_business_approval() FROM PUBLIC, anon, authenticated;

-- Client-callable functions: signed-in users only
REVOKE EXECUTE ON FUNCTION public.admin_add_pride_coins(uuid, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_my_private_profile() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.ensure_username(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.update_profile_field(text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.arcade_start() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.arcade_finish(uuid, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_feed(text, timestamptz, integer, text, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_open_reports(integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.delete_my_account() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_blocked_between(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_pride_coins(uuid, integer),
                         public.get_my_private_profile(),
                         public.ensure_username(text),
                         public.update_profile_field(text, text),
                         public.arcade_start(),
                         public.arcade_finish(uuid, integer),
                         public.get_feed(text, timestamptz, integer, text, uuid),
                         public.get_open_reports(integer),
                         public.delete_my_account(),
                         public.is_blocked_between(uuid, uuid)
  TO authenticated;
