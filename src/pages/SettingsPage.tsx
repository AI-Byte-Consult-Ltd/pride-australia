import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Settings,
  Loader2,
  Save,
  AtSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  display_name: string | null;
  username: string | null;
  bio: string | null;
}

const SettingsPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Fetch user profile
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, username, bio')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data);
        setUsername(data.username || '');
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [user]);

  const validateUsername = (value: string): boolean => {
    // Must start with @
    if (!value.startsWith('@')) {
      setUsernameError('Username must start with @');
      return false;
    }

    // Remove @ for validation
    const usernameWithoutAt = value.slice(1);

    // Must be at least 3 characters (after @)
    if (usernameWithoutAt.length < 3) {
      setUsernameError('Username must be at least 4 characters (including @)');
      return false;
    }

    // Max 30 characters total
    if (value.length > 30) {
      setUsernameError('Username must be 30 characters or less');
      return false;
    }

    // Only alphanumeric and underscores after @
    if (!/^[a-zA-Z0-9_]+$/.test(usernameWithoutAt)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return false;
    }

    setUsernameError('');
    return true;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure it starts with @
    if (!value.startsWith('@')) {
      value = '@' + value.replace('@', '');
    }
    
    setUsername(value);
    if (value.length > 1) {
      validateUsername(value);
    } else {
      setUsernameError('');
    }
  };

  const handleSaveUsername = async () => {
    if (!user || !validateUsername(username)) return;

    setIsSaving(true);

    // Check if username is already taken
    const { data: existing } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('username', username)
      .neq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      setUsernameError('This username is already taken');
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ username })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating username:', error);
      toast({
        title: "Error",
        description: "Failed to update username. Please try again.",
        variant: "destructive"
      });
    } else {
      setProfile(prev => prev ? { ...prev, username } : null);
      toast({
        title: "Success",
        description: "Your username has been updated.",
      });
    }

    setIsSaving(false);
  };

  // Show loading while checking auth
  if (loading || isLoading) {
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

  const displayName = profile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
  const userInitial = displayName[0].toUpperCase();

  return (
    <>
      <Helmet>
        <title>Settings | Pride Social Network</title>
        <meta name="description" content="Manage your Pride Social Network account settings." />
      </Helmet>

      <Layout hideFooter>
        <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
          <div className="container py-6">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
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
                        <p className="text-sm text-muted-foreground truncate">{profile?.username || '@username'}</p>
                      </div>
                    </div>
                    <nav className="space-y-1">
                      <Link 
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AtSign className="h-5 w-5" />
                      Username
                    </CardTitle>
                    <CardDescription>
                      Your unique username that others can use to find and mention you. 
                      It must start with @ and can contain letters, numbers, and underscores.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="flex gap-2">
                        <Input
                          id="username"
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="@YourUsername"
                          className={usernameError ? 'border-destructive' : ''}
                          maxLength={30}
                        />
                        <Button 
                          onClick={handleSaveUsername}
                          disabled={isSaving || !!usernameError || username === profile?.username}
                          className="gap-2"
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Save
                        </Button>
                      </div>
                      {usernameError && (
                        <p className="text-sm text-destructive">{usernameError}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Current: {profile?.username || 'Not set'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Your basic account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Display Name</Label>
                        <p className="text-sm text-muted-foreground">{displayName}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
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
