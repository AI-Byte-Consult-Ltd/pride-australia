-- Create post_replies table for threaded replies
CREATE TABLE public.post_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.post_replies ENABLE ROW LEVEL SECURITY;

-- Everyone can read replies
CREATE POLICY "Anyone can read replies"
ON public.post_replies
FOR SELECT
TO authenticated
USING (true);

-- Users can create their own replies
CREATE POLICY "Users can create their own replies"
ON public.post_replies
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own replies
CREATE POLICY "Users can update their own replies"
ON public.post_replies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own replies
CREATE POLICY "Users can delete their own replies"
ON public.post_replies
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_post_replies_post_id ON public.post_replies(post_id);
CREATE INDEX idx_post_replies_user_id ON public.post_replies(user_id);
CREATE INDEX idx_post_replies_created_at ON public.post_replies(created_at DESC);

-- Enable realtime for replies
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_replies;