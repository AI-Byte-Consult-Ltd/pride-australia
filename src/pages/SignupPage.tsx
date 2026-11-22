import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageSEO from '@/components/PageSEO';
import { Eye, EyeOff, Heart, Mail, Lock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Birthday state - Australian style DD/MM/YYYY
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref');
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  const { t } = useTranslation();
  const monthNames = t('auth.months', { returnObjects: true }) as string[];

  // Generate days, months, years for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    { value: '01', label: monthNames[0] },
    { value: '02', label: monthNames[1] },
    { value: '03', label: monthNames[2] },
    { value: '04', label: monthNames[3] },
    { value: '05', label: monthNames[4] },
    { value: '06', label: monthNames[5] },
    { value: '07', label: monthNames[6] },
    { value: '08', label: monthNames[7] },
    { value: '09', label: monthNames[8] },
    { value: '10', label: monthNames[9] },
    { value: '11', label: monthNames[10] },
    { value: '12', label: monthNames[11] },
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - 18 - i).toString());

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateBirthday = (): string | null => {
    if (!birthDay || !birthMonth || !birthYear) {
      return t('auth.dobRequired');
    }
    
    const day = parseInt(birthDay, 10);
    const month = parseInt(birthMonth, 10);
    const year = parseInt(birthYear, 10);
    
    // Create date and validate
    const birthDate = new Date(year, month - 1, day);
    
    // Check if date is valid
    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1) {
      return t('auth.invalidDate');
    }
    
    // Check minimum age (18 years)
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    
    if (actualAge < 18) {
      return t('auth.tooYoung');
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate name
    if (name.trim().length < 2) {
      toast({
        title: t('auth.invalidName'),
        description: t('auth.invalidNameDesc'),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate birthday
    const birthdayError = validateBirthday();
    if (birthdayError) {
      toast({
        title: t('auth.invalidDob'),
        description: birthdayError,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Basic password validation
    if (password.length < 8) {
      toast({
        title: t('auth.passwordTooShort'),
        description: t('auth.passwordTooShortDesc'),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Format birthday as ISO date string (YYYY-MM-DD)
    const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;

    const { error } = await signUp(email, password, name, dateOfBirth, referralCode || undefined);

    if (error) {
      let message = t('auth.signupFailed');
      if (error.message.includes('already registered')) {
        message = t('auth.alreadyRegistered');
      } else if (error.message.includes('invalid')) {
        message = t('auth.invalidEmail');
      }
      toast({
        title: t('auth.signupFailed'),
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t('auth.accountCreated'),
        description: t('auth.welcomeMsg'),
      });

      // The referral (if any) is credited by the server once the email is confirmed
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <PageSEO
        title={t('auth.signupTitle')}
        description={t('auth.signupDesc')}
        path="/signup"
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

          {referralCode && (
            <div className="text-center mb-4 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
              🎉 You've been invited! Sign up to join the community.
            </div>
          )}

          <Card variant="elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Join the community</CardTitle>
              <CardDescription>Create your free account to get started</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('auth.displayName')} <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')} <span className="text-destructive">*</span></Label>
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

                {/* Birthday - Australian style DD/MM/YYYY */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {t('auth.dateOfBirth')} <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Select value={birthDay} onValueChange={setBirthDay}>
                      <SelectTrigger aria-label={t('auth.day')}>
                        <SelectValue placeholder={t('auth.day')} />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={birthMonth} onValueChange={setBirthMonth}>
                      <SelectTrigger aria-label={t('auth.month')}>
                        <SelectValue placeholder={t('auth.month')} />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={birthYear} onValueChange={setBirthYear}>
                      <SelectTrigger aria-label={t('auth.year')}>
                        <SelectValue placeholder={t('auth.year')} />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('auth.ageRequirement')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')} <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      minLength={8}
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
                  <p className="text-xs text-muted-foreground">{t('auth.passwordMinLength')}</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" variant="pride" size="lg" className="w-full" disabled={loading}>
                  {loading ? t('auth.creatingAccount') : t('auth.createAccount')}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    {t('nav.login')}
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {t('auth.bySigningUp')}{' '}
            <Link to="/terms" className="underline">{t('auth.termsLink')}</Link>
            {' '}{t('auth.andText')}{' '}
            <Link to="/privacy" className="underline">{t('auth.privacyLink')}</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;