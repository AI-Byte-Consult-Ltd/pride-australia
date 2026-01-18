import { supabase } from '@/integrations/supabase/client';

// Extract @mentions from content and find matching user IDs
export const extractMentions = async (content: string): Promise<string[]> => {
  // Allow usernames like: john_doe, john-doe
  const mentionRegex = /@([\w-]+)/g;
  const mentions: string[] = [];
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push(match[1].toLowerCase());
  }

  const uniqueMentions = [...new Set(mentions)];
  if (uniqueMentions.length === 0) return [];

  // Look up user IDs by username (case-insensitive)
  const { data: profiles } = await supabase
    .from('profiles')
    .select('user_id, username')
    .not('username', 'is', null)
    .or(uniqueMentions.map((u) => `username.ilike.${u}`).join(','));

  return profiles?.map((p) => p.user_id) || [];
};

// Create notifications for mentioned users
export const createMentionNotifications = async (
  senderId: string,
  content: string,
  postId?: string,
  replyId?: string
): Promise<void> => {
  const mentionedUserIds = await extractMentions(content);
  
  if (mentionedUserIds.length === 0) return;

  // Filter out self-mentions
  const recipientIds = mentionedUserIds.filter(id => id !== senderId);
  
  if (recipientIds.length === 0) return;

  // Create notification for each mentioned user
  const notifications = recipientIds.map(recipientId => ({
    recipient_id: recipientId,
    sender_id: senderId,
    type: replyId ? 'mention_reply' : 'mention_post',
    post_id: postId || null,
    reply_id: replyId || null,
    content: content.slice(0, 100) // Truncate content for preview
  }));

  await supabase.from('notifications').insert(notifications);
};

// Create a notification for a specific action
export const createNotification = async (
  recipientId: string,
  senderId: string,
  type: 'like' | 'echo' | 'reply',
  postId?: string,
  content?: string,
  replyId?: string
): Promise<void> => {
  // Don't notify yourself
  if (recipientId === senderId) return;

  await supabase.from('notifications').insert({
    recipient_id: recipientId,
    sender_id: senderId,
    type,
    post_id: postId || null,
    reply_id: replyId || null,
    content: content?.slice(0, 100) || null
  });
};
