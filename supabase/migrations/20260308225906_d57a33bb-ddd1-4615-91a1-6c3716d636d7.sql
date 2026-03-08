
-- Add referral_code to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code text UNIQUE DEFAULT NULL;

-- Generate referral codes for all existing users who don't have one
UPDATE public.profiles
SET referral_code = upper(substr(md5(user_id::text || random()::text), 1, 8))
WHERE referral_code IS NULL;

-- Create referrals tracking table
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL,
  referred_id uuid NOT NULL,
  coins_awarded integer NOT NULL DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(referred_id)
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Users can view their own referrals (as referrer)
CREATE POLICY "Users can view own referrals"
  ON public.referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = referrer_id);

-- System inserts via trigger (security definer), but allow authenticated insert for the signup flow
CREATE POLICY "Authenticated can insert referrals"
  ON public.referrals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = referred_id);

-- Function: process referral after signup
CREATE OR REPLACE FUNCTION public.process_referral(_referral_code text, _referred_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _referrer_id uuid;
  _reward integer := 10;
BEGIN
  -- Find referrer by code
  SELECT user_id INTO _referrer_id
  FROM profiles
  WHERE referral_code = _referral_code;

  IF _referrer_id IS NULL THEN
    RETURN false;
  END IF;

  -- Don't allow self-referral
  IF _referrer_id = _referred_user_id THEN
    RETURN false;
  END IF;

  -- Check if already referred
  IF EXISTS (SELECT 1 FROM referrals WHERE referred_id = _referred_user_id) THEN
    RETURN false;
  END IF;

  -- Record referral
  INSERT INTO referrals (referrer_id, referred_id, coins_awarded)
  VALUES (_referrer_id, _referred_user_id, _reward);

  -- Award coins to referrer
  PERFORM add_coins(_referrer_id, _reward);

  RETURN true;
END;
$$;

-- Auto-generate referral code for new users
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := upper(substr(md5(NEW.user_id::text || random()::text), 1, 8));
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_generate_referral_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Enable realtime for referrals
ALTER PUBLICATION supabase_realtime ADD TABLE public.referrals;
