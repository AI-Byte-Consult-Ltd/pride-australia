
-- Add banner_url and change counters
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS banner_url text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS avatar_changes integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS banner_changes integer NOT NULL DEFAULT 0;

-- Update spend_coins_for_change to handle avatar and banner
CREATE OR REPLACE FUNCTION public.spend_coins_for_change(_user_id uuid, _change_type text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
  ELSIF _change_type = 'avatar' THEN
    SELECT avatar_changes, pride_coins INTO current_changes, current_balance
      FROM profiles WHERE user_id = _user_id;
    cost := CASE WHEN current_changes >= 1 THEN 30 ELSE 0 END;
  ELSIF _change_type = 'banner' THEN
    SELECT banner_changes, pride_coins INTO current_changes, current_balance
      FROM profiles WHERE user_id = _user_id;
    cost := CASE WHEN current_changes >= 1 THEN 40 ELSE 0 END;
  ELSE
    RETURN false;
  END IF;

  IF current_balance < cost THEN
    RETURN false;
  END IF;

  IF _change_type = 'username' THEN
    UPDATE profiles SET pride_coins = pride_coins - cost, username_changes = username_changes + 1 WHERE user_id = _user_id;
  ELSIF _change_type = 'display_name' THEN
    UPDATE profiles SET pride_coins = pride_coins - cost, display_name_changes = display_name_changes + 1 WHERE user_id = _user_id;
  ELSIF _change_type = 'avatar' THEN
    UPDATE profiles SET pride_coins = pride_coins - cost, avatar_changes = avatar_changes + 1 WHERE user_id = _user_id;
  ELSIF _change_type = 'banner' THEN
    UPDATE profiles SET pride_coins = pride_coins - cost, banner_changes = banner_changes + 1 WHERE user_id = _user_id;
  END IF;

  RETURN true;
END;
$$;
