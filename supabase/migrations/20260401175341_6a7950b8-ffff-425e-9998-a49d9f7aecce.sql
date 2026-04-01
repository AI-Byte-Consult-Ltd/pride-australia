
CREATE OR REPLACE FUNCTION public.arcade_play(_user_id uuid, _entry_fee integer DEFAULT 10)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF (SELECT pride_coins FROM profiles WHERE user_id = _user_id) < _entry_fee THEN
    RETURN false;
  END IF;
  UPDATE profiles SET pride_coins = pride_coins - _entry_fee WHERE user_id = _user_id;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.arcade_reward(_user_id uuid, _reward integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF _reward > 50 THEN
    _reward := 50;
  END IF;
  IF _reward > 0 THEN
    UPDATE profiles SET pride_coins = pride_coins + _reward WHERE user_id = _user_id;
  END IF;
END;
$$;
