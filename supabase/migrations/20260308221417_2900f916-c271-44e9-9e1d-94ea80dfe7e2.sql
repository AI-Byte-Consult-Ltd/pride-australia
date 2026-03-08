
-- Add change tracking columns to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS username_changes integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS display_name_changes integer NOT NULL DEFAULT 0;

-- Function: award coins to a user
CREATE OR REPLACE FUNCTION public.add_coins(target_user_id uuid, amount integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles SET pride_coins = pride_coins + amount WHERE user_id = target_user_id;
END;
$$;

-- Trigger: new post → author gets +5
CREATE OR REPLACE FUNCTION public.on_post_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM add_coins(NEW.user_id, 5);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_post_created
  AFTER INSERT ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.on_post_created();

-- Trigger: new reply → replier +2, post author +1
CREATE OR REPLACE FUNCTION public.on_reply_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author uuid;
BEGIN
  PERFORM add_coins(NEW.user_id, 2);
  SELECT user_id INTO post_author FROM posts WHERE id = NEW.post_id;
  IF post_author IS NOT NULL AND post_author <> NEW.user_id THEN
    PERFORM add_coins(post_author, 1);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_reply_created
  AFTER INSERT ON public.post_replies
  FOR EACH ROW EXECUTE FUNCTION public.on_reply_created();

-- Trigger: new like → liker +1, post author +1
CREATE OR REPLACE FUNCTION public.on_like_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author uuid;
BEGIN
  PERFORM add_coins(NEW.user_id, 1);
  SELECT user_id INTO post_author FROM posts WHERE id = NEW.post_id;
  IF post_author IS NOT NULL AND post_author <> NEW.user_id THEN
    PERFORM add_coins(post_author, 1);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_like_created
  AFTER INSERT ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.on_like_created();

-- Trigger: new echo → echoer +3, post author +2
CREATE OR REPLACE FUNCTION public.on_echo_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author uuid;
BEGIN
  PERFORM add_coins(NEW.user_id, 3);
  SELECT user_id INTO post_author FROM posts WHERE id = NEW.post_id;
  IF post_author IS NOT NULL AND post_author <> NEW.user_id THEN
    PERFORM add_coins(post_author, 2);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_echo_created
  AFTER INSERT ON public.post_echoes
  FOR EACH ROW EXECUTE FUNCTION public.on_echo_created();

-- Function: spend coins for profile change (username or display_name)
-- Returns true if successful, false if insufficient balance
CREATE OR REPLACE FUNCTION public.spend_coins_for_change(
  _user_id uuid,
  _change_type text  -- 'username' or 'display_name'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_changes integer;
  cost integer;
  current_balance integer;
BEGIN
  IF _change_type = 'username' THEN
    SELECT username_changes, pride_coins INTO current_changes, current_balance
      FROM profiles WHERE user_id = _user_id;
    cost := CASE WHEN current_changes >= 1 THEN 50 ELSE 0 END;
  ELSIF _change_type = 'display_name' THEN
    SELECT display_name_changes, pride_coins INTO current_changes, current_balance
      FROM profiles WHERE user_id = _user_id;
    cost := CASE WHEN current_changes >= 1 THEN 25 ELSE 0 END;
  ELSE
    RETURN false;
  END IF;

  IF current_balance < cost THEN
    RETURN false;
  END IF;

  IF _change_type = 'username' THEN
    UPDATE profiles
      SET pride_coins = pride_coins - cost,
          username_changes = username_changes + 1
      WHERE user_id = _user_id;
  ELSE
    UPDATE profiles
      SET pride_coins = pride_coins - cost,
          display_name_changes = display_name_changes + 1
      WHERE user_id = _user_id;
  END IF;

  RETURN true;
END;
$$;
