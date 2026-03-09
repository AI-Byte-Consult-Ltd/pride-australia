-- Fix RLS on businesses table
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved businesses" 
ON public.businesses 
FOR SELECT 
USING (is_approved = true);

CREATE POLICY "Users can view their own businesses" 
ON public.businesses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own businesses" 
ON public.businesses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own businesses" 
ON public.businesses 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Fix mutable search path on on_follow_created
CREATE OR REPLACE FUNCTION public.on_follow_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.notifications (recipient_id, sender_id, type, content)
  VALUES (NEW.following_id, NEW.follower_id, 'follow', 'started following you');
  RETURN NEW;
END;
$function$;