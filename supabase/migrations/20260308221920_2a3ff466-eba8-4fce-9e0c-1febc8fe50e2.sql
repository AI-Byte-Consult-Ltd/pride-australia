
-- Table for hashtag subscriptions
CREATE TABLE public.hashtag_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  hashtag text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, hashtag)
);

ALTER TABLE public.hashtag_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
  ON public.hashtag_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can subscribe to hashtags"
  ON public.hashtag_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsubscribe from hashtags"
  ON public.hashtag_subscriptions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function: get trending hashtags from posts in last 48h
CREATE OR REPLACE FUNCTION public.get_trending_hashtags(_limit integer DEFAULT 10)
RETURNS TABLE(hashtag text, post_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH extracted AS (
    SELECT (regexp_matches(content, '#([A-Za-z0-9_]+)', 'g'))[1] AS tag
    FROM posts
    WHERE created_at > now() - interval '48 hours'
  )
  SELECT '#' || lower(tag) AS hashtag, count(*) AS post_count
  FROM extracted
  GROUP BY lower(tag)
  ORDER BY count(*) DESC
  LIMIT _limit;
$$;

-- Function: notify hashtag subscribers when a new post with a hashtag is created
CREATE OR REPLACE FUNCTION public.notify_hashtag_subscribers()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tag text;
  sub record;
BEGIN
  -- Extract all hashtags from the new post
  FOR tag IN
    SELECT (regexp_matches(NEW.content, '#([A-Za-z0-9_]+)', 'g'))[1]
  LOOP
    -- Find subscribers (excluding the post author)
    FOR sub IN
      SELECT user_id FROM hashtag_subscriptions
      WHERE lower(hashtag) = '#' || lower(tag)
        AND user_id <> NEW.user_id
    LOOP
      INSERT INTO notifications (recipient_id, sender_id, type, post_id, content)
      VALUES (sub.user_id, NEW.user_id, 'hashtag', NEW.id, '#' || tag);
    END LOOP;
  END LOOP;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_hashtag_subscribers
  AFTER INSERT ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_hashtag_subscribers();
