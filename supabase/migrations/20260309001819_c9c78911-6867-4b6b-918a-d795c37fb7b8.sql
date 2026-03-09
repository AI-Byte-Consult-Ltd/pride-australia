-- Drop the existing constraint
ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS notifications_type_check;

-- Add the new constraint with all required types
ALTER TABLE public.notifications ADD CONSTRAINT notifications_type_check 
  CHECK (type IN ('mention_post', 'mention_reply', 'like', 'echo', 'reply', 'follow', 'hashtag'));