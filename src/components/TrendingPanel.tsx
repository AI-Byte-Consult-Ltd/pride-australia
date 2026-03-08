import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Loader2, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TrendingTag {
  hashtag: string;
  post_count: number;
}

interface TrendingPanelProps {
  userId: string;
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

const DEFAULT_TAGS = [
  { hashtag: '#PrideSocial', post_count: 0 },
  { hashtag: '#LGBTQIA', post_count: 0 },
  { hashtag: '#QueerCommunity', post_count: 0 },
];

export const TrendingPanel = ({ userId, activeTag, onTagClick }: TrendingPanelProps) => {
  const [trending, setTrending] = useState<TrendingTag[]>([]);
  const [subscriptions, setSubscriptions] = useState<Set<string>>(new Set());
  const [togglingTag, setTogglingTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrending = useCallback(async () => {
    const { data } = await supabase.rpc('get_trending_hashtags', { _limit: 7 });
    const tags = (data as TrendingTag[] | null) || [];

    // Merge with defaults if we have fewer than 5
    if (tags.length < 5) {
      const existing = new Set(tags.map((t) => t.hashtag.toLowerCase()));
      for (const def of DEFAULT_TAGS) {
        if (!existing.has(def.hashtag.toLowerCase()) && tags.length < 7) {
          tags.push(def);
        }
      }
    }
    setTrending(tags);
    setIsLoading(false);
  }, []);

  const fetchSubscriptions = useCallback(async () => {
    const { data } = await supabase
      .from('hashtag_subscriptions')
      .select('hashtag')
      .eq('user_id', userId);
    setSubscriptions(new Set((data || []).map((s) => s.hashtag.toLowerCase())));
  }, [userId]);

  useEffect(() => {
    fetchTrending();
    fetchSubscriptions();
  }, [fetchTrending, fetchSubscriptions]);

  const toggleSubscription = async (hashtag: string) => {
    const key = hashtag.toLowerCase();
    setTogglingTag(key);

    if (subscriptions.has(key)) {
      await supabase
        .from('hashtag_subscriptions')
        .delete()
        .eq('user_id', userId)
        .eq('hashtag', key);
      setSubscriptions((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      toast({ title: 'Unsubscribed', description: `You won't get notifications for ${hashtag}` });
    } else {
      await supabase
        .from('hashtag_subscriptions')
        .insert({ user_id: userId, hashtag: key });
      setSubscriptions((prev) => new Set(prev).add(key));
      toast({ title: 'Subscribed!', description: `You'll get notified for new posts with ${hashtag}` });
    }
    setTogglingTag(null);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Trending
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : trending.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">No trending topics yet. Start posting with #hashtags!</p>
        ) : (
          trending.map((t) => {
            const isActive = activeTag === t.hashtag.toLowerCase();
            const isSubscribed = subscriptions.has(t.hashtag.toLowerCase());
            return (
              <div
                key={t.hashtag}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                  isActive ? 'bg-primary/10' : 'hover:bg-muted'
                }`}
              >
                <div
                  className="flex-1 min-w-0"
                  onClick={() => onTagClick(isActive ? null : t.hashtag.toLowerCase())}
                >
                  <p className={`font-medium text-sm truncate transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}>
                    {t.hashtag}
                  </p>
                  {t.post_count > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {t.post_count} {t.post_count === 1 ? 'post' : 'posts'}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubscription(t.hashtag);
                  }}
                  disabled={togglingTag === t.hashtag.toLowerCase()}
                  title={isSubscribed ? 'Unsubscribe' : 'Subscribe for notifications'}
                >
                  {togglingTag === t.hashtag.toLowerCase() ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : isSubscribed ? (
                    <BellOff className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Bell className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            );
          })
        )}
        {activeTag && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-xs"
            onClick={() => onTagClick(null)}
          >
            Clear filter
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingPanel;
