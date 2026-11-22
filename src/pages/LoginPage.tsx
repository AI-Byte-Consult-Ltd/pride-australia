import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageSEO from '@/components/PageSEO';
import { Eye, EyeOff, Heart, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();
  const { t } = useTranslation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      let message = t('auth.loginFailed');
      if (error.message.includes('Invalid login credentials')) {
        message = t('auth.invalidCredentials');
      } else if (error.message.includes('Email not confirmed')) {
        message = t('auth.emailNotConfirmed');
      }
      toast({
        title: t('auth.loginFailed'),
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t('auth.welcomeBack'),
        description: t('auth.welcomeBackMsg'),
      });
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <PageSEO
        title={t('auth.loginTitle')}
        description={t('auth.loginDesc')}
        path="/login"
        noIndex
      />

      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4 gradient-hero">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-pride shadow-soft">
              <Heart className="h-7 w-7 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-display text-2xl font-bold">Pride Social</span>
          </Link>

          <Card variant="elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('auth.welcomeBack')}</CardTitle>
              <CardDescription>{t('auth.loginSubtitle')}</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      {t('auth.forgotPassword')}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" variant="pride" size="lg" className="w-full" disabled={loading}>
                  {loading ? t('auth.loggingIn') : t('nav.login')}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.noAccount')}{' '}
                  <Link to="/signup" className="text-primary font-medium hover:underline">
                    {t('nav.signup')}
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {t('auth.agreeTerms')}{' '}
            <Link to="/terms" className="underline">{t('auth.termsLink')}</Link>
            {' '}{t('auth.andText')}{' '}
            <Link to="/privacy" className="underline">{t('auth.privacyLink')}</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;