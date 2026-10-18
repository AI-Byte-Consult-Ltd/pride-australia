import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Copy, Check, Coins, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ReferralPanelProps {
  userId: string;
  referralCode: string | null;
}

export const ReferralPanel = ({ userId, referralCode }: ReferralPanelProps) => {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const { toast } = useToast();

  const referralLink = referralCode
    ? `${window.location.origin}/signup?ref=${referralCode}`
    : '';

  useEffect(() => {
    if (!userId) return;
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('coins_awarded')
        .eq('referrer_id', userId);
      if (!error && data) {
        setReferralCount(data.length);
        setTotalCoins(data.reduce((sum, r) => sum + r.coins_awarded, 0));
      }
    };
    fetchStats();

    const channel = supabase.channel('referrals-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'referrals', filter: `referrer_id=eq.${userId}` }, (payload) => {
        const newRow = payload.new as { coins_awarded: number };
        setReferralCount(prev => prev + 1);
        setTotalCoins(prev => prev + newRow.coins_awarded);
      })
      .subscribe();

    return () => { void supabase.removeChannel(channel); };
  }, [userId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({ title: 'Copied!', description: 'Referral link copied to clipboard.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Error', description: 'Failed to copy link.', variant: 'destructive' });
    }
  };

  if (!referralCode) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Link2 className="h-4 w-4" /> Invite Friends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Earn <span className="font-semibold text-foreground">10 Pride Coins</span> for every friend who joins!
        </p>
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="text-xs h-8"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 shrink-0"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-bold">{referralCount}</p>
              <p className="text-[10px] text-muted-foreground">Invited</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <Coins className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-bold">{totalCoins}</p>
              <p className="text-[10px] text-muted-foreground">Earned</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
