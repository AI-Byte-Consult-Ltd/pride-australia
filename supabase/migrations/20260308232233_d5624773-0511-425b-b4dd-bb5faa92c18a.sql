ALTER TABLE public.posts DROP CONSTRAINT posts_content_length;
ALTER TABLE public.posts ADD CONSTRAINT posts_content_length CHECK (length(content) <= 5000);