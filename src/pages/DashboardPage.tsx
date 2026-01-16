import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
}

interface Profile {
  pride_coins: number;
  display_name: string | null;
  username: string | null;
}

const MAX_POST_LENGTH = 5000;

// Function to render content with clickable links
const renderContentWithLinks = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 hover:underline break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

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

  // Fetch posts with author names and likes
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
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

      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setIsLoadingPosts(false);
        return;
      }

      const userIds = [...new Set(postsData.map(p => p.user_id))];
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

      const userLikedSet = new Set(userLikesData?.map(l => l.post_id) || []);

      const postsWithProfiles: PostWithProfile[] = postsData.map(post => {
        const profile = profileMap.get(post.user_id);
        return {
          ...post,
          author_name: profile?.display_name || 'Anonymous',
          author_username: profile?.username || null,
          like_count: likeCountMap.get(post.id) || 0,
          user_has_liked: userLikedSet.has(post.id),
          reply_count: replyCountMap.get(post.id) || 0
        };
      });

      setPosts(postsWithProfiles);
      setIsLoadingPosts(false);
    };

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
            reply_count: 0
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
          
          setPosts(prev => prev.map(post => {
            if (post.id !== postId) return post;
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

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(likesChannel);
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

    const { error } = await supabase
      .from('post_replies')
      .insert({ post_id: replyingToPost.id, user_id: user.id, content: replyContent.trim() });

    if (error) {
      toast({ title: "Error", description: "Failed to post reply.", variant: "destructive" });
    } else {
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

  const handlePost = async () => {
    if (!postContent.trim() || !user) return;
    if (postContent.length > MAX_POST_LENGTH) {
      toast({ title: "Post too long", description: `Posts must be ${MAX_POST_LENGTH.toLocaleString()} characters or less.`, variant: "destructive" });
      return;
    }
    setIsPosting(true);
    const { error } = await supabase.from('posts').insert({ content: postContent.trim(), user_id: user.id });
    if (error) {
      toast({ title: "Error", description: "Failed to create post.", variant: "destructive" });
    } else {
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
                        <Textarea placeholder="What's on your mind?" value={postContent} onChange={(e) => setPostContent(e.target.value)} maxLength={MAX_POST_LENGTH} className="min-h-[80px] resize-none border-0 focus-visible:ring-0 p-0 text-base" />
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
                            <div className="flex gap-4">
                              <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{post.author_name[0].toUpperCase()}</AvatarFallback></Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{post.author_name}</span>
                                  {post.author_username && <RainbowUsername username={post.author_username} />}
                                  <span className="text-muted-foreground text-sm">· {formatTimeAgo(post.created_at)}</span>
                                </div>
                                <p className="text-foreground mb-4 whitespace-pre-wrap">{renderContentWithLinks(post.content)}</p>
                                <div className="flex items-center gap-6">
                                  <button onClick={() => handleLike(post.id, post.user_has_liked)} disabled={likingPostId === post.id} className={`flex items-center gap-2 transition-colors ${post.user_has_liked ? 'text-pride-pink' : 'text-muted-foreground hover:text-pride-pink'}`}>
                                    <Heart className={`h-4 w-4 ${post.user_has_liked ? 'fill-current' : ''}`} /><span className="text-sm">{post.like_count}</span>
                                  </button>
                                  <button onClick={() => openReplyThread(post)} className="flex items-center gap-2 text-muted-foreground hover:text-pride-blue transition-colors">
                                    <MessageCircle className="h-4 w-4" /><span className="text-sm">{post.reply_count}</span>
                                  </button>
                                  <button className="flex items-center gap-2 text-muted-foreground hover:text-pride-green transition-colors"><Repeat2 className="h-4 w-4" /><span className="text-sm">0</span></button>
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
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{renderContentWithLinks(replyingToPost.content)}</p>
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
                          <p className="text-sm whitespace-pre-wrap">{renderContentWithLinks(reply.content)}</p>
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
                  <Textarea placeholder="Write a reply..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} className="min-h-[60px] resize-none" maxLength={MAX_POST_LENGTH} />
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
