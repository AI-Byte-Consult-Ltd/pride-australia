import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MentionInput, renderContentWithMentionsAndLinks } from '@/components/MentionInput';
import { 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Settings, 
  Image, 
  Send,
  Heart,
  MessageCircle,
  Repeat2,
  Coins,
  Loader2,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { createMentionNotifications } from '@/hooks/useNotifications';

interface PostReply {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author_name: string;
  author_username: string | null;
}

interface PostWithProfile {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author_name: string;
  author_username: string | null;
  like_count: number;
  user_has_liked: boolean;
  reply_count: number;
  echo_count: number;
  user_has_echoed: boolean;
  is_echo?: boolean;
  echoed_by_name?: string;
  echoed_by_username?: string | null;
  original_post_id?: string;
}

interface Profile {
  pride_coins: number;
  display_name: string | null;
  username: string | null;
}

const MAX_POST_LENGTH = 5000;

// Rainbow username component
const RainbowUsername = ({ username }: { username: string }) => {
  const rainbowColors = [
    'text-red-500',
    'text-orange-500', 
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-purple-500',
  ];
  
  return (
    <span className="text-sm font-medium">
      {username.split('').map((char, index) => (
        <span key={index} className={rainbowColors[index % rainbowColors.length]}>
          {char}
        </span>
      ))}
    </span>
  );
};

const DashboardPage = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [likingPostId, setLikingPostId] = useState<string | null>(null);
  const [echoingPostId, setEchoingPostId] = useState<string | null>(null);
  const [replyingToPost, setReplyingToPost] = useState<PostWithProfile | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replies, setReplies] = useState<PostReply[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Fetch posts with author names and likes (including echoes in feed like Twitter retweets)
  const fetchPosts = useCallback(async () => {
    if (!user) return;
    
    // Fetch original posts
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('id, content, created_at, user_id')
      .order('created_at', { ascending: false })
      .limit(50);

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      setIsLoadingPosts(false);
      return;
    }

    // Fetch all echoes to show in feed (like retweets)
    const { data: allEchoesData } = await supabase
      .from('post_echoes')
      .select('id, post_id, user_id, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!postsData || postsData.length === 0) {
      setPosts([]);
      setIsLoadingPosts(false);
      return;
    }

    // Collect all user IDs (post authors + echo authors)
    const postUserIds = postsData.map(p => p.user_id);
    const echoUserIds = allEchoesData?.map(e => e.user_id) || [];
    const userIds = [...new Set([...postUserIds, ...echoUserIds])];
    const postIds = postsData.map(p => p.id);

    const { data: profilesData } = await supabase
      .from('profiles')
      .select('user_id, display_name, username')
      .in('user_id', userIds);

    const { data: likesData } = await supabase
      .from('post_likes')
      .select('post_id')
      .in('post_id', postIds);

    const { data: userLikesData } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);

    // Fetch reply counts
    const { data: repliesData } = await supabase
      .from('post_replies')
      .select('post_id')
      .in('post_id', postIds);

    // Fetch echo counts for each post
    const { data: echoCountsData } = await supabase
      .from('post_echoes')
      .select('post_id')
      .in('post_id', postIds);

    // Fetch user's echoes
    const { data: userEchoesData } = await supabase
      .from('post_echoes')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);

    const profileMap = new Map<string, { display_name: string; username: string | null }>();
    profilesData?.forEach(p => {
      profileMap.set(p.user_id, { 
        display_name: p.display_name || 'Anonymous',
        username: p.username
      });
    });

    const likeCountMap = new Map<string, number>();
    likesData?.forEach(l => {
      likeCountMap.set(l.post_id, (likeCountMap.get(l.post_id) || 0) + 1);
    });

    const replyCountMap = new Map<string, number>();
    repliesData?.forEach(r => {
      replyCountMap.set(r.post_id, (replyCountMap.get(r.post_id) || 0) + 1);
    });

    const echoCountMap = new Map<string, number>();
    echoCountsData?.forEach(e => {
      echoCountMap.set(e.post_id, (echoCountMap.get(e.post_id) || 0) + 1);
    });

    const userLikedSet = new Set(userLikesData?.map(l => l.post_id) || []);
    const userEchoedSet = new Set(userEchoesData?.map(e => e.post_id) || []);

    // Create a map of posts for quick lookup
    const postsMap = new Map<string, typeof postsData[0]>();
    postsData.forEach(p => postsMap.set(p.id, p));

    // Build feed items: original posts + echoed posts (like Twitter retweets)
    type FeedItem = { type: 'post' | 'echo'; timestamp: string; post: typeof postsData[0]; echoedBy?: { name: string; username: string | null } };
    const feedItems: FeedItem[] = [];

    // Add original posts
    postsData.forEach(post => {
      feedItems.push({ type: 'post', timestamp: post.created_at, post });
    });

    // Add echoes as separate feed items (showing the original post with "Echoed by" header)
    allEchoesData?.forEach(echo => {
      const originalPost = postsMap.get(echo.post_id);
      if (originalPost) {
        const echoerProfile = profileMap.get(echo.user_id);
        feedItems.push({
          type: 'echo',
          timestamp: echo.created_at,
          post: originalPost,
          echoedBy: {
            name: echoerProfile?.display_name || 'Anonymous',
            username: echoerProfile?.username || null
          }
        });
      }
    });

    // Sort by timestamp (newest first)
    feedItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Convert to PostWithProfile format
    const postsWithProfiles: PostWithProfile[] = feedItems.map((item, index) => {
      const post = item.post;
      const profile = profileMap.get(post.user_id);
      return {
        id: item.type === 'echo' ? `echo-${post.id}-${index}` : post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        author_name: profile?.display_name || 'Anonymous',
        author_username: profile?.username || null,
        like_count: likeCountMap.get(post.id) || 0,
        user_has_liked: userLikedSet.has(post.id),
        reply_count: replyCountMap.get(post.id) || 0,
        echo_count: echoCountMap.get(post.id) || 0,
        user_has_echoed: userEchoedSet.has(post.id),
        is_echo: item.type === 'echo',
        echoed_by_name: item.echoedBy?.name,
        echoed_by_username: item.echoedBy?.username,
        original_post_id: post.id
      };
    });

    setPosts(postsWithProfiles);
    setIsLoadingPosts(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchPosts();

    const postsChannel = supabase
      .channel('posts-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' },
        async (payload) => {
          const newPostData = payload.new as { id: string; content: string; created_at: string; user_id: string };
          const { data: profileData } = await supabase
            .from('profiles')
            .select('display_name, username')
            .eq('user_id', newPostData.user_id)
            .maybeSingle();
          
          const newPost: PostWithProfile = {
            ...newPostData,
            author_name: profileData?.display_name || 'Anonymous',
            author_username: profileData?.username || null,
            like_count: 0,
            user_has_liked: false,
            reply_count: 0,
            echo_count: 0,
            user_has_echoed: false
          };
          setPosts(prev => [newPost, ...prev]);
        }
      )
      .subscribe();

    const likesChannel = supabase
      .channel('likes-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_likes' },
        (payload) => {
          const postId = (payload.new as { post_id?: string })?.post_id || (payload.old as { post_id?: string })?.post_id;
          const likeUserId = (payload.new as { user_id?: string })?.user_id;
          if (!postId) return;
          
          // Update both original posts and echoes (which have original_post_id)
          setPosts(prev => prev.map(post => {
            const actualPostId = post.original_post_id || post.id;
            if (actualPostId !== postId) return post;
            if (payload.eventType === 'INSERT') {
              return { ...post, like_count: post.like_count + 1, user_has_liked: likeUserId === user.id ? true : post.user_has_liked };
            } else if (payload.eventType === 'DELETE') {
              return { ...post, like_count: Math.max(0, post.like_count - 1), user_has_liked: likeUserId === user.id ? false : post.user_has_liked };
            }
            return post;
          }));
        }
      )
      .subscribe();

    const echoesChannel = supabase
      .channel('echoes-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_echoes' },
        (payload) => {
          const postId = (payload.new as { post_id?: string })?.post_id || (payload.old as { post_id?: string })?.post_id;
          const echoUserId = (payload.new as { user_id?: string })?.user_id;
          if (!postId) return;
          
          // Update echo counts for both original posts and echoes
          setPosts(prev => prev.map(post => {
            const actualPostId = post.original_post_id || post.id;
            if (actualPostId !== postId) return post;
            if (payload.eventType === 'INSERT') {
              return { ...post, echo_count: post.echo_count + 1, user_has_echoed: echoUserId === user.id ? true : post.user_has_echoed };
            } else if (payload.eventType === 'DELETE') {
              return { ...post, echo_count: Math.max(0, post.echo_count - 1), user_has_echoed: echoUserId === user.id ? false : post.user_has_echoed };
            }
            return post;
          }));

          // Refetch the feed when echoes change to show/hide echoed posts
          if (payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
            fetchPosts();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(likesChannel);
      supabase.removeChannel(echoesChannel);
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('pride_coins, display_name, username')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) setUserProfile(data);
    };

    fetchProfile();

    const profileChannel = supabase
      .channel('profile-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `user_id=eq.${user.id}` },
        (payload) => {
          const updated = payload.new as { pride_coins: number; display_name: string | null; username: string | null };
          setUserProfile({ pride_coins: updated.pride_coins, display_name: updated.display_name, username: updated.username });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(profileChannel); };
  }, [user]);

  // Fetch replies when opening reply thread
  const openReplyThread = async (post: PostWithProfile) => {
    setReplyingToPost(post);
    setIsLoadingReplies(true);
    
    const { data: repliesData } = await supabase
      .from('post_replies')
      .select('id, content, created_at, user_id')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });

    if (repliesData && repliesData.length > 0) {
      const userIds = [...new Set(repliesData.map(r => r.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, username')
        .in('user_id', userIds);

      const profileMap = new Map<string, { display_name: string; username: string | null }>();
      profilesData?.forEach(p => {
        profileMap.set(p.user_id, { display_name: p.display_name || 'Anonymous', username: p.username });
      });

      const repliesWithProfiles: PostReply[] = repliesData.map(reply => ({
        ...reply,
        author_name: profileMap.get(reply.user_id)?.display_name || 'Anonymous',
        author_username: profileMap.get(reply.user_id)?.username || null
      }));
      setReplies(repliesWithProfiles);
    } else {
      setReplies([]);
    }
    setIsLoadingReplies(false);
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !user || !replyingToPost) return;
    setIsSubmittingReply(true);

    const { data, error } = await supabase
      .from('post_replies')
      .insert({ post_id: replyingToPost.id, user_id: user.id, content: replyContent.trim() })
      .select('id')
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to post reply.", variant: "destructive" });
    } else {
      // Create notifications for mentions
      if (data) {
        await createMentionNotifications(user.id, replyContent.trim(), replyingToPost.id, data.id);
      }
      setReplyContent('');
      toast({ title: "Reply posted!", description: "Your reply has been added." });
      // Refresh replies
      openReplyThread(replyingToPost);
      // Update reply count
      setPosts(prev => prev.map(p => p.id === replyingToPost.id ? { ...p, reply_count: p.reply_count + 1 } : p));
    }
    setIsSubmittingReply(false);
  };

  const handleLike = async (postId: string, hasLiked: boolean) => {
    if (!user || likingPostId) return;
    setLikingPostId(postId);
    try {
      if (hasLiked) {
        await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id);
      } else {
        await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update like.", variant: "destructive" });
    } finally {
      setLikingPostId(null);
    }
  };

  const handleEcho = async (postId: string, hasEchoed: boolean) => {
    if (!user || echoingPostId) return;
    // Use original post ID for echoes (strip the echo- prefix if present)
    const actualPostId = postId.startsWith('echo-') ? postId.split('-')[1] : postId;
    setEchoingPostId(postId);
    try {
      if (hasEchoed) {
        await supabase.from('post_echoes').delete().eq('post_id', actualPostId).eq('user_id', user.id);
        toast({ title: "Echo removed", description: "Your echo has been removed." });
      } else {
        await supabase.from('post_echoes').insert({ post_id: actualPostId, user_id: user.id });
        toast({ title: "Echoed!", description: "You amplified this voice." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update echo.", variant: "destructive" });
    } finally {
      setEchoingPostId(null);
    }
  };

  const handlePost = async () => {
    if (!postContent.trim() || !user) return;
    if (postContent.length > MAX_POST_LENGTH) {
      toast({ title: "Post too long", description: `Posts must be ${MAX_POST_LENGTH.toLocaleString()} characters or less.`, variant: "destructive" });
      return;
    }
    setIsPosting(true);
    const { data, error } = await supabase
      .from('posts')
      .insert({ content: postContent.trim(), user_id: user.id })
      .select('id')
      .single();
    
    if (error) {
      toast({ title: "Error", description: "Failed to create post.", variant: "destructive" });
    } else {
      // Create notifications for mentions
      if (data) {
        await createMentionNotifications(user.id, postContent.trim(), data.id);
      }
      setPostContent('');
      toast({ title: "Posted!", description: "Your post has been shared." });
    }
    setIsPosting(false);
  };

  const handleImageUpload = () => {
    toast({ title: "Coming Soon", description: "Image posting will be available on June 1st, 2026." });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!user) return null;

  const displayName = userProfile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
  const userInitial = displayName[0].toUpperCase();

  const formatTimeAgo = (dateString: string) => {
    const diffMs = new Date().getTime() - new Date(dateString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Pride Social Network</title>
        <meta name="description" content="Your Pride Social Network dashboard." />
      </Helmet>

      <Layout hideFooter>
        <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
          <div className="container py-6">
            <div className="grid lg:grid-cols-[240px_1fr_300px] gap-6">
              {/* Sidebar */}
              <aside className="hidden lg:block">
                <Card className="sticky top-20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                      <Avatar className="h-10 w-10"><AvatarFallback className="gradient-pride text-primary-foreground">{userInitial}</AvatarFallback></Avatar>
                      <div className="overflow-hidden">
                        <p className="font-semibold truncate">{displayName}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <nav className="space-y-1">
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"><Home className="h-5 w-5" />Feed</Link>
                      <Link to="/marketplace" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ShoppingBag className="h-5 w-5" />Marketplace</Link>
                      <Link to="/dashboard/stickers" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Sparkles className="h-5 w-5" />Stickers</Link>
                      <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Settings className="h-5 w-5" />Settings</Link>
                    </nav>
                  </CardContent>
                </Card>
              </aside>

              {/* Main Content */}
              <main className="space-y-6">
                {/* Compose Post */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10"><AvatarFallback className="gradient-pride text-primary-foreground">{userInitial}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <MentionInput value={postContent} onChange={setPostContent} placeholder="What's on your mind? Use @ to mention users" maxLength={MAX_POST_LENGTH} />
                        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={handleImageUpload}><Image className="h-5 w-5" /></Button>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Sparkles className="h-5 w-5" /></Button>
                            </div>
                            <span className={`text-xs ${postContent.length > MAX_POST_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>{postContent.length.toLocaleString()}/{MAX_POST_LENGTH.toLocaleString()}</span>
                          </div>
                          <Button variant="pride" size="sm" onClick={handlePost} disabled={!postContent.trim() || isPosting} className="gap-2">
                            {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Feed */}
                <Tabs defaultValue="for-you">
                  <TabsList className="w-full justify-start bg-card border-b rounded-none h-auto p-0">
                    <TabsTrigger value="for-you" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3">For You</TabsTrigger>
                    <TabsTrigger value="following" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3">Following</TabsTrigger>
                  </TabsList>
                  <TabsContent value="for-you" className="mt-4 space-y-4">
                    {isLoadingPosts ? (
                      <Card><CardContent className="p-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></CardContent></Card>
                    ) : posts.length === 0 ? (
                      <Card><CardContent className="p-12 text-center"><p className="text-muted-foreground">No posts yet. Be the first to share!</p></CardContent></Card>
                    ) : (
                      posts.map((post) => (
                        <Card key={post.id}>
                          <CardContent className="p-4">
                            {/* Echo Header - like Twitter retweet header */}
                            {post.is_echo && post.echoed_by_name && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 -mt-1">
                                <Repeat2 className="h-4 w-4" />
                                <span>{post.echoed_by_name} echoed</span>
                              </div>
                            )}
                            <div className="flex gap-4">
                              <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{post.author_name[0].toUpperCase()}</AvatarFallback></Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{post.author_name}</span>
                                  {post.author_username && <RainbowUsername username={post.author_username} />}
                                  <span className="text-muted-foreground text-sm">· {formatTimeAgo(post.created_at)}</span>
                                </div>
                                <p className="text-foreground mb-4 whitespace-pre-wrap">{renderContentWithMentionsAndLinks(post.content)}</p>
                                <div className="flex items-center gap-6">
                                  <button onClick={() => handleLike(post.original_post_id || post.id, post.user_has_liked)} disabled={likingPostId === post.id || likingPostId === post.original_post_id} className={`flex items-center gap-2 transition-colors ${post.user_has_liked ? 'text-pride-pink' : 'text-muted-foreground hover:text-pride-pink'}`}>
                                    <Heart className={`h-4 w-4 ${post.user_has_liked ? 'fill-current' : ''}`} /><span className="text-sm">{post.like_count}</span>
                                  </button>
                                  <button onClick={() => openReplyThread({ ...post, id: post.original_post_id || post.id })} className="flex items-center gap-2 text-muted-foreground hover:text-pride-blue transition-colors">
                                    <MessageCircle className="h-4 w-4" /><span className="text-sm">{post.reply_count}</span>
                                  </button>
                                  <button 
                                    onClick={() => handleEcho(post.original_post_id || post.id, post.user_has_echoed)} 
                                    disabled={echoingPostId === post.id || echoingPostId === post.original_post_id} 
                                    className={`flex items-center gap-2 transition-colors ${post.user_has_echoed ? 'text-pride-green' : 'text-muted-foreground hover:text-pride-green'}`}
                                    title="Echo - Amplify this voice"
                                  >
                                    <Repeat2 className={`h-4 w-4 ${post.user_has_echoed ? 'text-pride-green' : ''}`} />
                                    <span className="text-sm">{post.echo_count}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  <TabsContent value="following" className="mt-4"><Card><CardContent className="p-12 text-center"><p className="text-muted-foreground">Follow other members to see their posts here.</p></CardContent></Card></TabsContent>
                </Tabs>
              </main>

              {/* Right Sidebar */}
              <aside className="hidden lg:block space-y-6">
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-base">Your PRIDE Units</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center"><Coins className="h-6 w-6 text-primary-foreground" /></div>
                      <div><p className="text-2xl font-display font-bold">{userProfile?.pride_coins ?? 0}</p><p className="text-sm text-muted-foreground">units</p></div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild><Link to="/support">Get More Units</Link></Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-base">Trending</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="group cursor-pointer"><p className="text-sm text-muted-foreground">Pride Month</p><p className="font-medium group-hover:text-primary transition-colors">#LoveIsLove</p></div>
                    <div className="group cursor-pointer"><p className="text-sm text-muted-foreground">Community</p><p className="font-medium group-hover:text-primary transition-colors">#PrideSocial</p></div>
                    <div className="group cursor-pointer"><p className="text-sm text-muted-foreground">Events</p><p className="font-medium group-hover:text-primary transition-colors">#PrideParade2026</p></div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>

        {/* Reply Modal */}
        {replyingToPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
              <CardHeader className="flex-row items-center justify-between border-b pb-4">
                <CardTitle className="text-lg">Reply to {replyingToPost.author_name}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => { setReplyingToPost(null); setReplies([]); setReplyContent(''); }}><X className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Original Post */}
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">{replyingToPost.author_name}</span>
                    {replyingToPost.author_username && <RainbowUsername username={replyingToPost.author_username} />}
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{renderContentWithMentionsAndLinks(replyingToPost.content)}</p>
                </div>
                {/* Replies */}
                {isLoadingReplies ? (
                  <div className="text-center py-4"><Loader2 className="h-5 w-5 animate-spin mx-auto" /></div>
                ) : replies.length > 0 ? (
                  <div className="space-y-3">
                    {replies.map(reply => (
                      <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-primary/20">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs">{reply.author_name[0].toUpperCase()}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{reply.author_name}</span>
                            {reply.author_username && <RainbowUsername username={reply.author_username} />}
                            <span className="text-xs text-muted-foreground">· {formatTimeAgo(reply.created_at)}</span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{renderContentWithMentionsAndLinks(reply.content)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-4">No replies yet. Be the first!</p>
                )}
              </CardContent>
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <MentionInput value={replyContent} onChange={setReplyContent} placeholder="Write a reply... Use @ to mention users" maxLength={MAX_POST_LENGTH} minHeight="60px" className="border rounded-md p-2" />
                  <Button variant="pride" size="sm" onClick={handleSubmitReply} disabled={!replyContent.trim() || isSubmittingReply}>
                    {isSubmittingReply ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Layout>
    </>
  );
};

export default DashboardPage;
