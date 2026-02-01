// src/pages/UserProfilePage.tsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MentionInput, renderContentWithMentionsAndLinks } from '@/components/MentionInput';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { createMentionNotifications } from '@/hooks/useNotifications';
import { Heart, MessageCircle, Repeat2, Send, Loader2, X } from 'lucide-react';

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
  user_id: string;
  display_name: string | null;
  username: string | null;
  bio: string | null;
  pride_coins: number;
}

const MAX_POST_LENGTH = 5000;

// Радужное отображение никнейма
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

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [likingPostId, setLikingPostId] = useState<string | null>(null);
  const [echoingPostId, setEchoingPostId] = useState<string | null>(null);
  const [postContent, setPostContent] = useState('');

  const [replyingToPost, setReplyingToPost] = useState<PostWithProfile | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState<PostReply[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Перенаправление на страницу логина, если пользователь не авторизован
  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [loading, user, navigate]);

  // Загрузка профиля и постов при смене никнейма
  useEffect(() => {
    if (username) {
      fetchProfileAndPosts();
    }
  }, [username, user]);

  // Получение профиля и постов одного пользователя
  const fetchProfileAndPosts = useCallback(async () => {
    setIsLoading(true);
    setProfile(null);
    setPosts([]);
    // Получаем профиль по никнейму
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, display_name, username, bio, pride_coins')
      .eq('username', username)
      .maybeSingle();
    if (profileError || !profileData) {
      setIsLoading(false);
      return;
    }
    setProfile(profileData as Profile);
    // Получаем посты пользователя
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('id, content, created_at, user_id')
      .eq('user_id', profileData.user_id)
      .order('created_at', { ascending: false })
      .limit(50);
    if (postsError || !postsData) {
      setIsLoading(false);
      return;
    }
    const postIds = postsData.map((p) => p.id);
    // Дополнительные данные: лайки, эхо, ответы
    const { data: likesData } = await supabase.from('post_likes').select('post_id').in('post_id', postIds);
    const { data: userLikesData } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', user?.id || '')
      .in('post_id', postIds);
    const { data: repliesData } = await supabase.from('post_replies').select('post_id').in('post_id', postIds);
    const { data: echoCountsData } = await supabase.from('post_echoes').select('post_id').in('post_id', postIds);
    const { data: userEchoesData } = await supabase
      .from('post_echoes')
      .select('post_id')
      .eq('user_id', user?.id || '')
      .in('post_id', postIds);
    const likeCountMap = new Map<string, number>();
    likesData?.forEach((l) => likeCountMap.set(l.post_id, (likeCountMap.get(l.post_id) || 0) + 1));
    const replyCountMap = new Map<string, number>();
    repliesData?.forEach((r) => replyCountMap.set(r.post_id, (replyCountMap.get(r.post_id) || 0) + 1));
    const echoCountMap = new Map<string, number>();
    echoCountsData?.forEach((e) => echoCountMap.set(e.post_id, (echoCountMap.get(e.post_id) || 0) + 1));
    const userLikedSet = new Set(userLikesData?.map((l) => l.post_id) || []);
    const userEchoedSet = new Set(userEchoesData?.map((e) => e.post_id) || []);
    const postsWithProfiles: PostWithProfile[] = postsData.map((post) => ({
      id: post.id,
      content: post.content,
      created_at: post.created_at,
      user_id: post.user_id,
      author_name: profileData.display_name || 'Anonymous',
      author_username: profileData.username || null,
      like_count: likeCountMap.get(post.id) || 0,
      user_has_liked: userLikedSet.has(post.id),
      reply_count: replyCountMap.get(post.id) || 0,
      echo_count: echoCountMap.get(post.id) || 0,
      user_has_echoed: userEchoedSet.has(post.id),
    }));
    setPosts(postsWithProfiles);
    setIsLoading(false);
  }, [username, user]);

  // Отображение времени в формате «2h», «3d» и т. д.
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

  // Создание нового поста
  const handlePost = async () => {
    if (!postContent.trim() || !user || !profile) return;
    if (postContent.length > MAX_POST_LENGTH) {
      toast({
        title: 'Post too long',
        description: `Posts must be ${MAX_POST_LENGTH.toLocaleString()} characters or less.`,
        variant: 'destructive',
      });
      return;
    }
    setIsPosting(true);
    const { data, error } = await supabase
      .from('posts')
      .insert({ content: postContent.trim(), user_id: user.id })
      .select('id')
      .single();
    if (error) {
      toast({ title: 'Error', description: 'Failed to create post.', variant: 'destructive' });
      setIsPosting(false);
      return;
    }
    if (data) {
      await createMentionNotifications(user.id, postContent.trim(), data.id);
    }
    setPostContent('');
    toast({ title: 'Posted!', description: 'Your post has been shared.' });
    setIsPosting(false);
    await fetchProfileAndPosts();
  };

  // Лайк/анлайк
  const handleLike = async (postId: string, hasLiked: boolean) => {
    if (!user || likingPostId) return;
    setLikingPostId(postId);
    try {
      if (hasLiked) {
        await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id);
      } else {
        await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to update like.', variant: 'destructive' });
    } finally {
      setLikingPostId(null);
    }
  };

  // Echo/Remove echo
  const handleEcho = async (postId: string, hasEchoed: boolean) => {
    if (!user || echoingPostId) return;
    setEchoingPostId(postId);
    try {
      if (hasEchoed) {
        await supabase.from('post_echoes').delete().eq('post_id', postId).eq('user_id', user.id);
        toast({ title: 'Echo removed', description: 'Your echo has been removed.' });
      } else {
        await supabase.from('post_echoes').insert({ post_id: postId, user_id: user.id });
        toast({ title: 'Echoed!', description: 'You amplified this voice.' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to update echo.', variant: 'destructive' });
    } finally {
      setEchoingPostId(null);
    }
  };

  // Загрузка ответов на пост и открытие модального окна
  const openReplyThread = async (post: PostWithProfile) => {
    setReplyingToPost(post);
    setIsLoadingReplies(true);
    const postId = post.original_post_id || post.id;
    const { data: repliesData } = await supabase
      .from('post_replies')
      .select('id, content, created_at, user_id')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (repliesData && repliesData.length > 0) {
      const userIds = [...new Set(repliesData.map((r) => r.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, username')
        .in('user_id', userIds);
      const profileMap = new Map<string, { display_name: string; username: string | null }>();
      profilesData?.forEach((p) => profileMap.set(p.user_id, { display_name: p.display_name || 'Anonymous', username: p.username }));
      const repliesWithProfiles: PostReply[] = repliesData.map((reply) => ({
        ...reply,
        author_name: profileMap.get(reply.user_id)?.display_name || 'Anonymous',
        author_username: profileMap.get(reply.user_id)?.username || null,
      }));
      setReplies(repliesWithProfiles);
    } else {
      setReplies([]);
    }
    setIsLoadingReplies(false);
  };

  // Отправка ответа
  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !user || !replyingToPost) return;
    const postId = replyingToPost.original_post_id || replyingToPost.id;
    setIsSubmittingReply(true);
    const { data, error } = await supabase
      .from('post_replies')
      .insert({ post_id: postId, user_id: user.id, content: replyContent.trim() })
      .select('id')
      .single();
    if (error) {
      toast({ title: 'Error', description: 'Failed to post reply.', variant: 'destructive' });
      setIsSubmittingReply(false);
      return;
    }
    if (data) {
      await createMentionNotifications(user.id, replyContent.trim(), postId, data.id);
    }
    setReplyContent('');
    toast({ title: 'Reply posted!', description: 'Your reply has been added.' });
    await openReplyThread({ ...replyingToPost, id: postId });
    setPosts((prev) =>
      prev.map((p) => {
        const actualId = p.original_post_id || p.id;
        return actualId === postId ? { ...p, reply_count: p.reply_count + 1 } : p;
      }),
    );
    setIsSubmittingReply(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!profile) {
    return (
      <Layout hideFooter>
        <div className="container py-6">
          <p className="text-muted-foreground">User not found.</p>
        </div>
      </Layout>
    );
  }
  const isOwnProfile = user && profile.user_id === user.id;
  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
        <div className="container py-6">
          {/* шапка профиля */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="gradient-pride text-primary-foreground">
                  {(profile.display_name || 'U')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">{profile.display_name || 'Anonymous'}</h1>
                {profile.username && <RainbowUsername username={profile.username} />}
                {profile.bio && <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-muted-foreground text-sm">PRIDE Coins: {profile.pride_coins}</span>
            </div>
          </div>
          {isOwnProfile && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="gradient-pride text-primary-foreground">
                      {(profile.display_name || 'U')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <MentionInput
                      value={postContent}
                      onChange={setPostContent}
                      placeholder="Write something... Use @ to mention users"
                      maxLength={MAX_POST_LENGTH}
                    />
                    <div className="flex items-center justify-end pt-4 border-t border-border mt-4">
                      <Button
                        variant="pride"
                        size="sm"
                        onClick={handlePost}
                        disabled={!postContent.trim() || isPosting}
                        className="gap-2"
                      >
                        {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {isLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              </CardContent>
            </Card>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No posts yet.</p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {post.author_name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link to={`/users/${post.author_username}`} className="font-semibold hover:underline">
                          {post.author_name}
                        </Link>
                        {post.author_username && (
                          <Link to={`/users/${post.author_username}`}> <RainbowUsername username={post.author_username} /> </Link>
                        )}
                        <span className="text-muted-foreground text-sm">· {formatTimeAgo(post.created_at)}</span>
                      </div>
                      <p className="text-foreground mb-4 whitespace-pre-wrap">
                        {renderContentWithMentionsAndLinks(post.content)}
                      </p>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post.id, post.user_has_liked)}
                          disabled={likingPostId === post.id}
                          className={`flex items-center gap-2 transition-colors ${
                            post.user_has_liked ? 'text-pride-pink' : 'text-muted-foreground hover:text-pride-pink'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.user_has_liked ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.like_count}</span>
                        </button>
                        <button
                          onClick={() => openReplyThread(post)}
                          className="flex items-center gap-2 text-muted-foreground hover:text-pride-blue transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.reply_count}</span>
                        </button>
                        <button
                          onClick={() => handleEcho(post.id, post.user_has_echoed)}
                          disabled={echoingPostId === post.id}
                          className={`flex items-center gap-2 transition-colors ${
                            post.user_has_echoed ? 'text-pride-green' : 'text-muted-foreground hover:text-pride-green'
                          }`}
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
        </div>
      </div>
      {replyingToPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-6">
          <Card className="w-full max-w-3xl h-[85vh] overflow-hidden flex flex-col">
            <CardHeader className="flex-row items-center justify-between border-b pb-4">
              <CardTitle className="text-lg">Reply to {replyingToPost.author_name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setReplyingToPost(null);
                  setReplies([]);
                  setReplyContent('');
                }}
                aria-label="Close reply modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Оригинальный пост */}
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2 mb-2">
                  <Link to={`/users/${replyingToPost.author_username}`} className="font-semibold text-sm hover:underline">
                    {replyingToPost.author_name}
                  </Link>
                  {replyingToPost.author_username && (
                    <Link to={`/users/${replyingToPost.author_username}`}>
                      <RainbowUsername username={replyingToPost.author_username} />
                    </Link>
                  )}
                  <span className="text-xs text-muted-foreground">· {formatTimeAgo(replyingToPost.created_at)}</span>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {renderContentWithMentionsAndLinks(replyingToPost.content)}
                </p>
              </div>
              {/* Список ответов */}
              {isLoadingReplies ? (
                <div className="text-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                </div>
              ) : replies.length > 0 ? (
                <div className="space-y-3">
                  {replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-primary/20">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {reply.author_name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            to={`/users/${reply.author_username}`}
                            className="font-semibold text-sm hover:underline"
                          >
                            {reply.author_name}
                          </Link>
                          {reply.author_username && (
                            <Link to={`/users/${reply.author_username}`}>
                              <RainbowUsername username={reply.author_username} />
                            </Link>
                          )}
                          <span className="text-xs text-muted-foreground">
                            · {formatTimeAgo(reply.created_at)}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                          {renderContentWithMentionsAndLinks(reply.content)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-sm py-4">
                  No replies yet. Be the first!
                </p>
              )}
            </CardContent>
            <div className="border-t p-4 sm:p-6 bg-background">
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <MentionInput
                    value={replyContent}
                    onChange={setReplyContent}
                    placeholder="Write a reply... Use @ to mention users"
                    maxLength={MAX_POST_LENGTH}
                    minHeight="160px"
                    className="border rounded-md p-3"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: keep it friendly. Mentions (@) will notify users.
                  </p>
                </div>
                <Button
                  variant="pride"
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim() || isSubmittingReply}
                  className="h-10 px-4 mt-1"
                  aria-label="Send reply"
                >
                  {isSubmittingReply ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default UserProfilePage;
