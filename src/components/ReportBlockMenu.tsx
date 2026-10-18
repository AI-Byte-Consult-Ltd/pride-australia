import { useState } from 'react';
import { MoreHorizontal, Flag, Ban, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ReportBlockMenuProps {
  targetType: 'post' | 'reply' | 'user';
  targetId: string;
  /** Author of the content (or the user themselves for targetType "user") */
  targetUserId: string;
  targetName?: string;
  onBlocked?: (userId: string) => void;
}

export const ReportBlockMenu = ({ targetType, targetId, targetUserId, targetName, onBlocked }: ReportBlockMenuProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || user.id === targetUserId) return null;

  const submitReport = async () => {
    if (!reason.trim()) return;
    setIsSubmitting(true);
    const { error } = await supabase.from('content_reports').insert({
      reporter_id: user.id,
      target_type: targetType,
      target_id: targetId,
      reason: reason.trim().slice(0, 500),
    });
    setIsSubmitting(false);
    if (error && error.code !== '23505') {
      toast({ title: 'Error', description: 'Could not send the report.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Report sent', description: 'Thank you. Our moderators will review it.' });
    setIsReportOpen(false);
    setReason('');
  };

  const blockUser = async () => {
    const { error } = await supabase.from('user_blocks').insert({ blocker_id: user.id, blocked_id: targetUserId });
    if (error && error.code !== '23505') {
      toast({ title: 'Error', description: 'Could not block this user.', variant: 'destructive' });
      return;
    }
    // Following someone you blocked makes no sense
    await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', targetUserId);
    toast({
      title: 'User blocked',
      description: `You won't see ${targetName || 'this user'} and they won't be able to interact with you.`,
    });
    onBlocked?.(targetUserId);
  };

  const targetLabel = targetType === 'user' ? 'user' : targetType;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsReportOpen(true)}>
            <Flag className="h-4 w-4 mr-2" /> Report {targetLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={blockUser} className="text-destructive focus:text-destructive">
            <Ban className="h-4 w-4 mr-2" /> Block {targetName || 'user'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report {targetLabel}</DialogTitle>
            <DialogDescription>
              Tell us what's wrong. Reports are confidential — the author won't know who reported them.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. harassment, hate speech, spam, outing someone, explicit content…"
            maxLength={500}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportOpen(false)}>Cancel</Button>
            <Button variant="pride" onClick={submitReport} disabled={!reason.trim() || isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Send report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
