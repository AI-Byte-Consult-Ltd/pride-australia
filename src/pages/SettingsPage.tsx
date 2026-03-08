import { useState, useEffect } from 'react';
import PageSEO from '@/components/PageSEO';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Home, 
  MapPin, 
  Settings,
  Loader2,
  Save,
  AtSign,
  Coins,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  display_name: string | null;
  username: string | null;
  bio: string | null;
  pride_coins: number;
  username_changes: number;
  display_name_changes: number;
}

const USERNAME_CHANGE_COST = 50;
const DISPLAY_NAME_CHANGE_COST = 25;

const SettingsPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isSavingDisplayName, setIsSavingDisplayName] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, username, bio, pride_coins, username_changes, display_name_changes')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data as Profile);
        setUsername(data.username || '');
        setDisplayName(data.display_name || '');
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [user]);

  const validateUsername = (value: string): boolean => {
    if (!value.startsWith('@')) { setUsernameError('Username must start with @'); return false; }
    const clean = value.slice(1);
    if (clean.length < 3) { setUsernameError('Username must be at least 4 characters (including @)'); return false; }
    if (value.length > 30) { setUsernameError('Username must be 30 characters or less'); return false; }
    if (!/^[a-zA-Z0-9_]+$/.test(clean)) { setUsernameError('Only letters, numbers, and underscores allowed'); return false; }
    setUsernameError('');
    return true;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('@')) value = '@' + value.replace('@', '');
    setUsername(value);
    if (value.length > 1) validateUsername(value);
    else setUsernameError('');
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayName(value);
    if (value.trim().length < 2) {
      setDisplayNameError('Display name must be at least 2 characters');
    } else if (value.length > 50) {
      setDisplayNameError('Display name must be 50 characters or less');
    } else {
      setDisplayNameError('');
    }
  };

  const usernameChangeCost = profile && profile.username_changes >= 1 ? USERNAME_CHANGE_COST : 0;
  const displayNameChangeCost = profile && profile.display_name_changes >= 1 ? DISPLAY_NAME_CHANGE_COST : 0;

  const handleSaveUsername = async () => {
    if (!user || !validateUsername(username) || !profile) return;
    setIsSavingUsername(true);

    // Check uniqueness
    const { data: existing } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('username', username)
      .neq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      setUsernameError('This username is already taken');
      setIsSavingUsername(false);
      return;
    }

    // Spend coins if needed
    if (usernameChangeCost > 0) {
      const { data: success } = await supabase.rpc('spend_coins_for_change', {
        _user_id: user.id,
        _change_type: 'username',
      });
      if (!success) {
        toast({ title: 'Insufficient coins', description: `You need ${usernameChangeCost} Pride Coins to change your username.`, variant: 'destructive' });
        setIsSavingUsername(false);
        return;
      }
    } else {
      // First free change — just increment counter
      await supabase.from('profiles').update({ username_changes: 1 }).eq('user_id', user.id);
    }

    const { error } = await supabase.from('profiles').update({ username }).eq('user_id', user.id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to update username.', variant: 'destructive' });
    } else {
      // Re-fetch profile to get updated coins/counters
      const { data: refreshed } = await supabase
        .from('profiles')
        .select('display_name, username, bio, pride_coins, username_changes, display_name_changes')
        .eq('user_id', user.id)
        .maybeSingle();
      if (refreshed) setProfile(refreshed as Profile);
      toast({ title: 'Success', description: usernameChangeCost > 0 ? `Username updated! ${usernameChangeCost} coins spent.` : 'Username updated!' });
    }
    setIsSavingUsername(false);
  };

  const handleSaveDisplayName = async () => {
    if (!user || !profile || displayName.trim().length < 2 || displayName.length > 50) return;
    setIsSavingDisplayName(true);

    if (displayNameChangeCost > 0) {
      const { data: success } = await supabase.rpc('spend_coins_for_change', {
        _user_id: user.id,
        _change_type: 'display_name',
      });
      if (!success) {
        toast({ title: 'Insufficient coins', description: `You need ${displayNameChangeCost} Pride Coins to change your display name.`, variant: 'destructive' });
        setIsSavingDisplayName(false);
        return;
      }
    } else {
      await supabase.from('profiles').update({ display_name_changes: 1 }).eq('user_id', user.id);
    }

    const { error } = await supabase.from('profiles').update({ display_name: displayName.trim() }).eq('user_id', user.id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to update display name.', variant: 'destructive' });
    } else {
      const { data: refreshed } = await supabase
        .from('profiles')
        .select('display_name, username, bio, pride_coins, username_changes, display_name_changes')
        .eq('user_id', user.id)
        .maybeSingle();
      if (refreshed) setProfile(refreshed as Profile);
      toast({ title: 'Success', description: displayNameChangeCost > 0 ? `Display name updated! ${displayNameChangeCost} coins spent.` : 'Display name updated!' });
    }
    setIsSavingDisplayName(false);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const currentDisplayName = profile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
  const userInitial = currentDisplayName[0].toUpperCase();

  return (
    <>
      <PageSEO title="Settings | Pride Social Network" description="Manage your Pride Social Network account settings." path="/dashboard/settings" noIndex />
      <Layout>
        <div className="bg-muted/30 pb-12">
          <div className="container py-6">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
              {/* Sidebar */}
              <aside className="hidden lg:block">
                <Card className="sticky top-20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="gradient-pride text-primary-foreground">{userInitial}</AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <p className="font-semibold truncate">{currentDisplayName}</p>
                        <p className="text-sm text-muted-foreground truncate">{profile?.username || '@username'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-accent/50">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{profile?.pride_coins ?? 0} Pride Coins</span>
                    </div>
                    <nav className="space-y-1">
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Home className="h-5 w-5" /> Feed
                      </Link>
                      <Link to="/community-map" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <MapPin className="h-5 w-5" /> Community Map
                      </Link>
                      <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
                        <Settings className="h-5 w-5" /> Settings
                      </Link>
                    </nav>
                  </CardContent>
                </Card>
              </aside>

              {/* Main Content */}
              <main className="space-y-6">
                {/* Coin Balance Card */}
                <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-transparent">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Coins className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="text-lg font-bold">{profile?.pride_coins ?? 0} Pride Coins</p>
                        <p className="text-xs text-muted-foreground">Earn coins by posting, liking, replying & echoing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Username Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AtSign className="h-5 w-5" /> Username
                    </CardTitle>
                    <CardDescription>
                      Your unique handle. {usernameChangeCost > 0 ? (
                        <span className="text-yellow-600 font-medium">Costs {usernameChangeCost} Pride Coins to change.</span>
                      ) : (
                        <span className="text-green-600 font-medium">First change is free!</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="flex gap-2">
                        <Input id="username" value={username} onChange={handleUsernameChange} placeholder="@YourUsername" className={usernameError ? 'border-destructive' : ''} maxLength={30} />
                        <Button onClick={handleSaveUsername} disabled={isSavingUsername || !!usernameError || username === profile?.username} className="gap-2">
                          {isSavingUsername ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </Button>
                      </div>
                      {usernameError && <p className="text-sm text-destructive">{usernameError}</p>}
                      <p className="text-sm text-muted-foreground">Current: {profile?.username || 'Not set'}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Display Name Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" /> Display Name
                    </CardTitle>
                    <CardDescription>
                      Your visible name. {displayNameChangeCost > 0 ? (
                        <span className="text-yellow-600 font-medium">Costs {displayNameChangeCost} Pride Coins to change.</span>
                      ) : (
                        <span className="text-green-600 font-medium">First change is free!</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <div className="flex gap-2">
                        <Input id="displayName" value={displayName} onChange={handleDisplayNameChange} placeholder="Your Name" className={displayNameError ? 'border-destructive' : ''} maxLength={50} />
                        <Button onClick={handleSaveDisplayName} disabled={isSavingDisplayName || !!displayNameError || displayName.trim() === profile?.display_name} className="gap-2">
                          {isSavingDisplayName ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </Button>
                      </div>
                      {displayNameError && <p className="text-sm text-destructive">{displayNameError}</p>}
                      <p className="text-sm text-muted-foreground">Current: {profile?.display_name || 'Not set'}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your basic account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tokenomics Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-500" /> How to Earn Pride Coins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>📝 Create a post</span><span className="font-medium text-green-600">+5 coins</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>🔁 Echo a post</span><span className="font-medium text-green-600">+3 coins</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>💬 Reply to a post</span><span className="font-medium text-green-600">+2 coins</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>❤️ Like a post</span><span className="font-medium text-green-600">+1 coin</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>📩 Receive a like</span><span className="font-medium text-green-600">+1 coin</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>📩 Receive a reply</span><span className="font-medium text-green-600">+1 coin</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>📩 Receive an echo</span><span className="font-medium text-green-600">+2 coins</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border">
                        <span>✏️ Change username (2nd+)</span><span className="font-medium text-red-500">−50 coins</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>✏️ Change display name (2nd+)</span><span className="font-medium text-red-500">−25 coins</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SettingsPage;
