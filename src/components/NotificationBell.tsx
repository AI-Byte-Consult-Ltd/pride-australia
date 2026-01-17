import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  sender_id: string;
  type: string;
  post_id: string | null;
  reply_id: string | null;
  content: string | null;
  is_read: boolean;
  created_at: string;
  sender_name?: string;
  sender_username?: string | null;
}

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (notificationsData && notificationsData.length > 0) {
        const senderIds = [...new Set(notificationsData.map(n => n.sender_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, display_name, username')
          .in('user_id', senderIds);

        const profileMap = new Map<string, { display_name: string; username: string | null }>();
        profilesData?.forEach(p => {
          profileMap.set(p.user_id, { display_name: p.display_name || 'Someone', username: p.username });
        });

        const enrichedNotifications: Notification[] = notificationsData.map(n => ({
          ...n,
          sender_name: profileMap.get(n.sender_id)?.display_name || 'Someone',
          sender_username: profileMap.get(n.sender_id)?.username || null
        }));

        setNotifications(enrichedNotifications);
        setUnreadCount(enrichedNotifications.filter(n => !n.is_read).length);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    };

    fetchNotifications();

    // Subscribe to realtime notifications
    const channel = supabase
      .channel('notifications-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `recipient_id=eq.${user.id}` },
        async (payload) => {
          const newNotification = payload.new as Notification;
          
          // Fetch sender profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('display_name, username')
            .eq('user_id', newNotification.sender_id)
            .maybeSingle();

          const enrichedNotification: Notification = {
            ...newNotification,
            sender_name: profileData?.display_name || 'Someone',
            sender_username: profileData?.username || null
          };

          setNotifications(prev => [enrichedNotification, ...prev.slice(0, 19)]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAllAsRead = async () => {
    if (!user || unreadCount === 0) return;

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('recipient_id', user.id)
      .eq('is_read', false);

    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'mention_post':
        return 'mentioned you in a post';
      case 'mention_reply':
        return 'mentioned you in a reply';
      case 'like':
        return 'liked your post';
      case 'echo':
        return 'echoed your post';
      case 'reply':
        return 'replied to your post';
      default:
        return 'sent you a notification';
    }
  };

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

  if (!user) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pride-pink text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className="font-semibold text-sm">Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
              Mark all read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id} 
              className={cn(
                "flex items-start gap-3 p-3 cursor-pointer",
                !notification.is_read && "bg-primary/5"
              )}
              onClick={() => !notification.is_read && markAsRead(notification.id)}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {notification.sender_name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{notification.sender_name}</span>
                  {' '}
                  <span className="text-muted-foreground">{getNotificationText(notification)}</span>
                </p>
                {notification.content && (
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    "{notification.content}"
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(notification.created_at)}
                </p>
              </div>
              {!notification.is_read && (
                <span className="h-2 w-2 rounded-full bg-pride-pink flex-shrink-0 mt-2" />
              )}
            </DropdownMenuItem>
          ))
        )}
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-primary justify-center">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
