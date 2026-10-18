import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/PageSEO';
import { Heart, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await requestPasswordReset(email.trim());

    // Same message whether or not the email is registered, so the form
    // can't be used to find out who has an account.
    if (error && error.message.toLowerCase().includes('rate limit')) {
      toast({
        title: 'Too many requests',
        description: 'Please wait a few minutes before requesting another email.',
        variant: 'destructive',
      });
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <PageSEO
        title="Reset Password | Pride Social Network"
        description="Reset the password of your Pride Social Network account."
        path="/forgot-password"
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
              <CardTitle className="text-2xl">Forgot your password?</CardTitle>
              <CardDescription>
                {sent
                  ? 'Check your inbox'
                  : "Enter your email and we'll send you a link to set a new password"}
              </CardDescription>
            </CardHeader>

            {sent ? (
              <CardContent className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  If an account exists for <span className="font-medium text-foreground">{email}</span>, you'll
                  receive an email with a reset link in a few minutes. Don't forget to check your spam folder.
                </p>
                <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                  Send again
                </Button>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
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
                </CardContent>

                <CardFooter>
                  <Button type="submit" variant="pride" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send reset link'}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link to="/login" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to log in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
