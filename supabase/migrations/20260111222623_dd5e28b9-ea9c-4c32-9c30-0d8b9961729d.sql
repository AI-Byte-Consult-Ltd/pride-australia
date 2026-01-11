-- Fix RLS policies for post_likes - change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Likes are viewable by authenticated users" ON public.post_likes;
DROP POLICY IF EXISTS "Users can create their own likes" ON public.post_likes;
DROP POLICY IF EXISTS "Users can delete their own likes" ON public.post_likes;

-- Recreate as PERMISSIVE policies (default)
CREATE POLICY "Likes are viewable by authenticated users" 
ON public.post_likes 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can create their own likes" 
ON public.post_likes 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" 
ON public.post_likes 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);