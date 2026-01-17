-- Create table for post echoes (reposts)
CREATE TABLE public.post_echoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.post_echoes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Echoes are viewable by authenticated users"
ON public.post_echoes
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own echoes"
ON public.post_echoes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own echoes"
ON public.post_echoes
FOR DELETE
USING (auth.uid() = user_id);

-- Add index for faster queries
CREATE INDEX idx_post_echoes_post_id ON public.post_echoes(post_id);
CREATE INDEX idx_post_echoes_user_id ON public.post_echoes(user_id);

-- Enable realtime for echoes
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_echoes;