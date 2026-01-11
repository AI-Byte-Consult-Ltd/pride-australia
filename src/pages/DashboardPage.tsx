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
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PostWithProfile {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author_name: string;
  author_username: string | null;
  like_count: number;
  user_has_liked: boolean;
}

interface Profile {
  pride_coins: number;
  display_name: string | null;
  username: string | null;
}

const MAX_POST_LENGTH = 5000;

const DashboardPage = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [likingPostId, setLikingPostId] = useState<string | null>(null);
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
      // First fetch posts
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

      // Get unique user IDs
      const userIds = [...new Set(postsData.map(p => p.user_id))];
      const postIds = postsData.map(p => p.id);

      // Fetch profiles for these users
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, username')
        .in('user_id', userIds);

      // Fetch like counts for all posts
      const { data: likesData } = await supabase
        .from('post_likes')
        .select('post_id')
        .in('post_id', postIds);

      // Fetch user's likes
      const { data: userLikesData } = await supabase
        .from('post_likes')
        .select('post_id')
        .eq('user_id', user.id)
        .in('post_id', postIds);

      // Create maps
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

      const userLikedSet = new Set(userLikesData?.map(l => l.post_id) || []);

      // Combine posts with author names and likes
      const postsWithProfiles: PostWithProfile[] = postsData.map(post => {
        const profile = profileMap.get(post.user_id);
        return {
          ...post,
          author_name: profile?.display_name || 'Anonymous',
          author_username: profile?.username || null,
          like_count: likeCountMap.get(post.id) || 0,
          user_has_liked: userLikedSet.has(post.id)
        };
      });

      setPosts(postsWithProfiles);
      setIsLoadingPosts(false);
    };

    fetchPosts();

    // Subscribe to realtime updates for posts
    const postsChannel = supabase
      .channel('posts-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts'
        },
        async (payload) => {
          const newPostData = payload.new as { id: string; content: string; created_at: string; user_id: string };
          
          // Fetch the author's profile
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
            user_has_liked: false
          };
          
          setPosts(prev => [newPost, ...prev]);
        }
      )
      .subscribe();

    // Subscribe to realtime updates for likes
    const likesChannel = supabase
      .channel('likes-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes'
        },
        (payload) => {
          const postId = (payload.new as { post_id?: string })?.post_id || (payload.old as { post_id?: string })?.post_id;
          const likeUserId = (payload.new as { user_id?: string })?.user_id || (payload.old as { user_id?: string })?.user_id;
          
          if (!postId) return;
          
          setPosts(prev => prev.map(post => {
            if (post.id !== postId) return post;
            
            if (payload.eventType === 'INSERT') {
              return {
                ...post,
                like_count: post.like_count + 1,
                user_has_liked: likeUserId === user.id ? true : post.user_has_liked
              };
            } else if (payload.eventType === 'DELETE') {
              return {
                ...post,
                like_count: Math.max(0, post.like_count - 1),
                user_has_liked: likeUserId === user.id ? false : post.user_has_liked
              };
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

  // Fetch user profile for pride coins with realtime updates
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('pride_coins, display_name, username')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setUserProfile(data);
      }
    };

    fetchProfile();

    // Subscribe to realtime profile updates for current user
    const profileChannel = supabase
      .channel('profile-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const updated = payload.new as { pride_coins: number; display_name: string | null; username: string | null };
          setUserProfile({
            pride_coins: updated.pride_coins,
            display_name: updated.display_name,
            username: updated.username
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileChannel);
    };
  }, [user]);

  // Handle like/unlike
  const handleLike = async (postId: string, hasLiked: boolean) => {
    if (!user || likingPostId) return;
    
    setLikingPostId(postId);
    
    try {
      if (hasLiked) {
        // Remove like
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Add like
        await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLikingPostId(null);
    }
  };

  const handlePost = async () => {
    if (!postContent.trim() || !user) return;

    if (postContent.length > MAX_POST_LENGTH) {
      toast({
        title: "Post too long",
        description: `Posts must be ${MAX_POST_LENGTH.toLocaleString()} characters or less.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsPosting(true);
    
    const { error } = await supabase
      .from('posts')
      .insert({
        content: postContent.trim(),
        user_id: user.id
      });

    if (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } else {
      setPostContent('');
      toast({
        title: "Posted!",
        description: "Your post has been shared with the community.",
      });
    }
    
    setIsPosting(false);
  };

  const handleImageUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Image posting functionality will be available on June 1st, 2026. Currently, only text posting is supported.",
    });
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render if not logged in (will redirect)
  if (!user) {
    return null;
  }

  // Get user display name from metadata or email
  const displayName = userProfile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
  const userInitial = displayName[0].toUpperCase();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
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
        <meta name="description" content="Your Pride Social Network dashboard. Post updates, explore the feed, and connect with the community." />
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
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="gradient-pride text-primary-foreground">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <p className="font-semibold truncate">{displayName}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <nav className="space-y-1">
                      <Link 
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
                      >
                        <Home className="h-5 w-5" />
                        Feed
                      </Link>
                      <Link 
                        to="/marketplace"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        Marketplace
                      </Link>
                      <Link 
                        to="/dashboard/stickers"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Sparkles className="h-5 w-5" />
                        Stickers
                      </Link>
                      <Link 
                        to="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
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
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="gradient-pride text-primary-foreground">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="What's on your mind?"
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          maxLength={MAX_POST_LENGTH}
                          className="min-h-[80px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
                        />
                        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-muted-foreground hover:text-primary"
                                onClick={handleImageUpload}
                              >
                                <Image className="h-5 w-5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                <Sparkles className="h-5 w-5" />
                              </Button>
                            </div>
                            <span className={`text-xs ${postContent.length > MAX_POST_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {postContent.length.toLocaleString()}/{MAX_POST_LENGTH.toLocaleString()}
                            </span>
                          </div>
                          <Button
                            variant="pride" 
                            size="sm" 
                            onClick={handlePost}
                            disabled={!postContent.trim() || isPosting}
                            className="gap-2"
                          >
                            {isPosting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Feed Tabs */}
                <Tabs defaultValue="for-you">
                  <TabsList className="w-full justify-start bg-card border-b rounded-none h-auto p-0">
                    <TabsTrigger 
                      value="for-you" 
                      className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                      For You
                    </TabsTrigger>
                    <TabsTrigger 
                      value="following"
                      className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                      Following
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="for-you" className="mt-4 space-y-4">
                    {isLoadingPosts ? (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                        </CardContent>
                      </Card>
                    ) : posts.length === 0 ? (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <p className="text-muted-foreground">
                            No posts yet. Be the first to share something!
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      posts.map((post) => (
                        <Card key={post.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {post.author_name[0].toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">
                                    {post.author_name}
                                  </span>
                                  {post.author_username && (
                                    <span className="text-muted-foreground text-sm">
                                      {post.author_username}
                                    </span>
                                  )}
                                  <span className="text-muted-foreground text-sm">
                                    · {formatTimeAgo(post.created_at)}
                                  </span>
                                </div>
                                <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
                                <div className="flex items-center gap-6">
                                  <button 
                                    onClick={() => handleLike(post.id, post.user_has_liked)}
                                    disabled={likingPostId === post.id}
                                    className={`flex items-center gap-2 transition-colors ${
                                      post.user_has_liked 
                                        ? 'text-pride-pink' 
                                        : 'text-muted-foreground hover:text-pride-pink'
                                    }`}
                                  >
                                    <Heart className={`h-4 w-4 ${post.user_has_liked ? 'fill-current' : ''}`} />
                                    <span className="text-sm">{post.like_count}</span>
                                  </button>
                                  <button className="flex items-center gap-2 text-muted-foreground hover:text-pride-blue transition-colors">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-sm">0</span>
                                  </button>
                                  <button className="flex items-center gap-2 text-muted-foreground hover:text-pride-green transition-colors">
                                    <Repeat2 className="h-4 w-4" />
                                    <span className="text-sm">0</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="following" className="mt-4">
                    <Card>
                      <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">
                          Follow other members to see their posts here.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </main>

              {/* Right Sidebar */}
              <aside className="hidden lg:block space-y-6">
                {/* User Stats */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Your Pride Coins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center">
                        <Coins className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-2xl font-display font-bold">
                          {userProfile?.pride_coins ?? 0}
                        </p>
                        <p className="text-sm text-muted-foreground">coins</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <Link to="/support">Get More Coins</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Trending */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Trending</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="group cursor-pointer">
                      <p className="text-sm text-muted-foreground">Pride Month</p>
                      <p className="font-medium group-hover:text-primary transition-colors">#LoveIsLove</p>
                    </div>
                    <div className="group cursor-pointer">
                      <p className="text-sm text-muted-foreground">Community</p>
                      <p className="font-medium group-hover:text-primary transition-colors">#PrideSocial</p>
                    </div>
                    <div className="group cursor-pointer">
                      <p className="text-sm text-muted-foreground">Events</p>
                      <p className="font-medium group-hover:text-primary transition-colors">#PrideParade2026</p>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DashboardPage;