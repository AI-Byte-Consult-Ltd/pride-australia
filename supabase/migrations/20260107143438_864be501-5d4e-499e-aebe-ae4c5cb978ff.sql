-- Fix 1: Create secure RPC function for admin to add pride coins
CREATE OR REPLACE FUNCTION public.admin_add_pride_coins(
  _target_user_id UUID,
  _amount INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify caller is admin
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can modify pride coins';
  END IF;
  
  -- Validate amount
  IF _amount < -1000000 OR _amount > 1000000 THEN
    RAISE EXCEPTION 'Invalid amount: must be between -1M and 1M';
  END IF;
  
  -- Perform update
  UPDATE profiles 
  SET pride_coins = pride_coins + _amount
  WHERE user_id = _target_user_id;
END;
$$;

-- Fix 2: Replace public profiles policy with authenticated-only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Profiles viewable by authenticated users"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);