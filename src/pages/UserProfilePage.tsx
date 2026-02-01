
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MentionInput, renderContentWithMentionsAndLinks } from '@/components/MentionInput';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Heart, MessageCircle, Repeat2, Send, Loader2, X } from 'lucide-react';

// Типы поста и ответа
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
  /**
   * Optional text added by the echoing user when quoting a post. When present,
   * this should be displayed above the original post content. This value is
   * null for regular posts or echoes without a comment.
   */
  echo_message?: string | null;
}

interface Profile {
  user_id: string;
  display_name: string | null;
  username: string | null;
  bio: string | null;
  pride_coins: number;
}

// Компонент для радужного отображения никнейма
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

const MAX_POST_LENGTH = 5000;

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Состояния для взаимодействий (лайки, эхо, ответы)
  const [likingPostId, setLikingPostId] = useState<string | null>(null);
  const [echoingPostId, setEchoingPostId] = useState<string | null>(null);
  const [replyingToPost, setReplyingToPost] = useState<PostWithProfile | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replies, setReplies] = useState<PostReply[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  // Состояния для цитирования (quote echo)
  const [quotingPost, setQuotingPost] = useState<PostWithProfile | null>(null);
  const [quoteContent, setQuoteContent] = useState('');
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  // Перенаправление неавторизованного пользователя на логин
  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [loading, user, navigate]);

  // Определяем, чей профиль открыт
  const isOwnProfile = profile && user && profile.user_id === user.id;

  // Загрузка профиля и постов
  const fetchProfileAndPosts = useCallback(async () => {
    if (!username || !user) return;

    setIsLoadingProfile(true);
    setIsLoadingPosts(true);

    // Получаем профиль по никнейму
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, display_name, username, bio, pride_coins')
      .eq('username', username)
      .maybeSingle();

    if (profileError || !profileData) {
      setProfile(null);
      setIsLoadingProfile(false);
      setPosts([]);
      setIsLoadingPosts(false);
      return;
    }

    setProfile(profileData as Profile);
    setIsLoadingProfile(false);

    // Получаем посты пользователя
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('id, content, created_at, user_id')
      .eq('user_id', profileData.user_id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (postsError || !postsData) {
      setPosts([]);
      setIsLoadingPosts(false);
      return;
    }

    if (postsData.length === 0) {
      setPosts([]);
      setIsLoadingPosts(false);
      return;
    }

    const postIds = postsData.map((p) => p.id);

    // Загружаем лайки, ответы и эхо
    const { data: likesData } = await supabase.from('post_likes').select('post_id').in('post_id', postIds);
    const { data: userLikesData } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);
    const { data: repliesData } = await supabase.from('post_replies').select('post_id').in('post_id', postIds);
    const { data: echoCountsData } = await supabase.from('post_echoes').select('post_id').in('post_id', postIds);
    const { data: userEchoesData } = await supabase
      .from('post_echoes')
      .select('post_id')
      .eq('user_id', user.id)
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
    setIsLoadingPosts(false);
  }, [username, user]);

  useEffect(() => {
    if (!user) return;
    fetchProfileAndPosts();
  }, [user, fetchProfileAndPosts]);

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

  // Удаление эхо (без комментария)
  const handleRemoveEcho = async (postId: string) => {
    if (!user || echoingPostId) return;
    setEchoingPostId(postId);
    try {
      await supabase.from('post_echoes').delete().eq('post_id', postId).eq('user_id', user.id);
      toast({ title: 'Echo removed', description: 'Your echo has been removed.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to remove echo.', variant: 'destructive' });
    } finally {
      setEchoingPostId(null);
    }
  };

  // Открыть модальное окно цитирования
  const openQuoteModal = (post: PostWithProfile) => {
    setQuotingPost(post);
    setQuoteContent('');
  };

  // Закрыть модальное окно цитирования
  const closeQuoteModal = () => {
    setQuotingPost(null);
    setQuoteContent('');
  };

  // Отправка цитирующего эхо
  const handleSubmitQuote = async () => {
    if (!quoteContent.trim() || !user || !quotingPost) return;
    setIsSubmittingQuote(true);
    try {
      await supabase.from('post_echoes').insert({
        post_id: quotingPost.id,
        user_id: user.id,
        message: quoteContent.trim(),
      });
      toast({ title: 'Echoed!', description: 'You added a comment.' });
      closeQuoteModal();
      fetchProfileAndPosts();
    } catch {
      toast({ title: 'Error', description: 'Failed to add echo.', variant: 'destructive' });
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Открытие ветки ответов
  const openReplyThread = async (post: PostWithProfile) => {
    setReplyingToPost(post);
    setIsLoadingReplies(true);
    const { data: repliesData } = await supabase
      .from('post_replies')
      .select('id, content, created_at, user_id')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    if (repliesData && repliesData.length > 0) {
      const userIds = [...new Set(repliesData.map((r) => r.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, username')
        .in('user_id', userIds);
      const profileMap = new Map<string, { display_name: string; username: string | null }>();
      profilesData?.forEach((p) =>
        profileMap.set(p.user_id, { display_name: p.display_name || 'Anonymous', username: p.username })
      );
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
    setIsSubmittingReply(true);
    try {
      await supabase
        .from('post_replies')
        .insert({ post_id: replyingToPost.id, user_id: user.id, content: replyContent.trim() })
        .select('id')
        .single();
      setReplyContent('');
      toast({ title: 'Reply posted!', description: 'Your reply has been added.' });
      await openReplyThread(replyingToPost);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === replyingToPost.id ? { ...p, reply_count: p.reply_count + 1 } : p
        )
      );
    } catch {
      toast({ title: 'Error', description: 'Failed to post reply.', variant: 'destructive' });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Состояния для создания нового поста (только на своём профиле)
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const handlePost = async () => {
    if (!postContent.trim() || !user) return;
    if (postContent.length > MAX_POST_LENGTH) {
      toast({
        title: 'Post too long',
        description: `Posts must be ${MAX_POST_LENGTH.toLocaleString()} characters or less.`,
        variant: 'destructive',
      });
      return;
    }
    setIsPosting(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ content: postContent.trim(), user_id: user.id })
        .select('id')
        .single();
      if (error) throw error;
      setPostContent('');
      toast({ title: 'Posted!', description: 'Your post has been shared.' });
      fetchProfileAndPosts();
    } catch {
      toast({ title: 'Error', description: 'Failed to create post.', variant: 'destructive' });
    } finally {
      setIsPosting(false);
    }
  };

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Если профиль не найден
  if (!profile) {
    return (
      <Layout hideFooter>
        <div className="container py-6">
          <p className="text-muted-foreground">User not found.</p>
        </div>
      </Layout>
    );
  }

  const displayName = profile.display_name || profile.username || 'User';
  const userInitial = displayName[0].toUpperCase();

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
        <div className="container py-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Заголовок профиля */}
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarFallback className="gradient-pride text-primary-foreground text-2xl">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-display font-bold">{displayName}</h1>
                {profile.username && (
                  <p className="mt-1">
                    <RainbowUsername username={profile.username} />
                  </p>
                )}
                {profile.bio && (
                  <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Компонент создания поста (только для своего профиля) */}
            {isOwnProfile && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="gradient-pride text-primary-foreground">{userInitial}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <MentionInput
                        value={postContent}
                        onChange={setPostContent}
                        placeholder="What's on your mind? Use @ to mention users"
                        maxLength={MAX_POST_LENGTH}
                      />
                      <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                        <span
                          className={`text-xs ${
                            postContent.length > MAX_POST_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground'
                          }`}
                        >
                          {postContent.length.toLocaleString()}/{MAX_POST_LENGTH.toLocaleString()}
                        </span>
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
            )}

            {/* Список постов */}
            <div className="space-y-4">
              {isLoadingPosts ? (
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
                            <Link to={`/users/${encodeURIComponent(post.author_username || '')}`} className="font-semibold hover:underline">
                              {post.author_name}
                            </Link>
                            {post.author_username && (
                              <Link to={`/users/${encodeURIComponent(post.author_username)}`} className="hover:underline">
                                <RainbowUsername username={post.author_username} />
                              </Link>
                            )}
                            <span className="text-muted-foreground text-sm">· {formatTimeAgo(post.created_at)}</span>
                          </div>
                          {/* Отображаем цитату, если пост является эхо с комментарием */}
                          {post.echo_message && (
                            <p className="text-foreground mb-2 whitespace-pre-wrap">
                              {renderContentWithMentionsAndLinks(post.echo_message)}
                            </p>
                          )}
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
                              onClick={() => {
                                if (post.user_has_echoed) {
                                  handleRemoveEcho(post.id);
                                } else {
                                  openQuoteModal(post);
                                }
                              }}
                              disabled={echoingPostId === post.id}
                              className={`flex items-center gap-2 transition-colors ${
                                post.user_has_echoed
                                  ? 'text-pride-green'
                                  : 'text-muted-foreground hover:text-pride-green'
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
        </div>

        {/* Модальное окно ответов */}
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
                    <Link to={`/users/${encodeURIComponent(replyingToPost.author_username || '')}`} className="font-semibold text-sm hover:underline">
                      {replyingToPost.author_name}
                    </Link>
                    {replyingToPost.author_username && (
                      <Link to={`/users/${encodeURIComponent(replyingToPost.author_username)}`}>
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
                              to={`/users/${encodeURIComponent(reply.author_username || '')}`}
                              className="font-semibold text-sm hover:underline"
                            >
                              {reply.author_name}
                            </Link>
                            {reply.author_username && (
                              <Link to={`/users/${encodeURIComponent(reply.author_username)}`}>
                                <RainbowUsername username={reply.author_username} />
                              </Link>
                            )}
                            <span className="text-xs text-muted-foreground">· {formatTimeAgo(reply.created_at)}</span>
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

        {/* Модальное окно цитирования (quote echo) */}
        {quotingPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-6">
            <Card className="w-full max-w-3xl h-[85vh] overflow-hidden flex flex-col">
              <CardHeader className="flex-row items-center justify-between border-b pb-4">
                <CardTitle className="text-lg">Echo with comment</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeQuoteModal}
                  aria-label="Close quote modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Оригинальный пост, который будет цитироваться */}
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">{quotingPost.author_name}</span>
                    {quotingPost.author_username && <RainbowUsername username={quotingPost.author_username} />}
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {renderContentWithMentionsAndLinks(quotingPost.content)}
                  </p>
                </div>
                {/* Поле ввода для комментария пользователя */}
                <div>
                  <MentionInput
                    value={quoteContent}
                    onChange={setQuoteContent}
                    placeholder="Add a comment to this echo... Use @ to mention users"
                    maxLength={MAX_POST_LENGTH}
                    minHeight="140px"
                    className="border rounded-md p-3"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    You can mention other users with @
                  </p>
                </div>
              </CardContent>
              <div className="border-t p-4 sm:p-6 bg-background flex justify-end">
                <Button
                  variant="pride"
                  size="sm"
                  onClick={handleSubmitQuote}
                  disabled={!quoteContent.trim() || isSubmittingQuote}
                  className="gap-2"
                  aria-label="Submit echo"
                >
                  {isSubmittingQuote ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Echo
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Вспомогательная функция для форматирования времени
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

export default UserProfilePage;
