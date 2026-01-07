-- Add length constraint to posts content column
ALTER TABLE public.posts 
ADD CONSTRAINT posts_content_length 
CHECK (length(content) > 0 AND length(content) <= 5000);