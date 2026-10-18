import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageSEO from '@/components/PageSEO';
import { Eye, EyeOff, Heart, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';

// The reset link from the email opens this page with a recovery token in the URL;
// supabase-js exchanges it for a temporary session, then the user sets a new password.
const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkState, setLinkState] = useState<'checking' | 'ready' | 'invalid'>('checking');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updatePassword } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1) || window.location.search);
    if (params.get('error_description')) {
      setLinkState('invalid');
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (session && event === 'SIGNED_IN')) {
        setLinkState('ready');
      }
    });

    // Token may already have been processed before this component mounted
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setLinkState('ready');
    });

    const timeout = setTimeout(() => {
      setLinkState((state) => (state === 'checking' ? 'invalid' : state));
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast({ title: 'Password too short', description: 'Password must be at least 8 characters long.', variant: 'destructive' });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords don't match", description: 'Please type the same password twice.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);

    if (error) {
      toast({
        title: 'Could not update password',
        description: error.message.includes('different from the old')
          ? 'The new password must be different from the old one.'
          : 'The reset link may have expired. Please request a new one.',
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Password updated', description: 'You are now logged in with your new password.' });
    navigate('/dashboard');
  };

  return (
    <Layout>
      <PageSEO
        title="Set New Password | Pride Social Network"
        description="Set a new password for your Pride Social Network account."
        path="/reset-password"
        noIndex
      />

      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4 gradient-hero">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-pride shadow-soft">
              <Heart className="h-7 w-7 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-display text-2xl font-bold">Pride Social</span>
          </Link>

          <Card variant="elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Set a new password</CardTitle>
              <CardDescription>
                {linkState === 'invalid'
                  ? 'This reset link is invalid or has expired'
                  : 'Choose a new password for your account'}
              </CardDescription>
            </CardHeader>

            {linkState === 'checking' && (
              <CardContent className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </CardContent>
            )}

            {linkState === 'invalid' && (
              <CardFooter>
                <Button asChild variant="pride" size="lg" className="w-full">
                  <Link to="/forgot-password">Request a new link</Link>
                </Button>
              </CardFooter>
            )}

            {linkState === 'ready' && (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Repeat new password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm"
                        type={showPassword ? 'text' : 'password'}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="pl-10"
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button type="submit" variant="pride" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Saving...' : 'Save new password'}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
