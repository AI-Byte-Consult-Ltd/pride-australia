import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Sparkles, Heart, Search, PartyPopper } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  // Fun one-liners (deterministic-ish, based on pathname length)
  const funLine = useMemo(() => {
    const lines = [
      'This page went to a Pride parade and never came back.',
      'We looked everywhere — even under the rainbow. No luck.',
      'That URL is giving “ghost mode”.',
      'This route is not in our community map (yet).',
      '404: The page is out there living its best life.',
      'We can’t find it… but we can still find joy 🌈',
    ];
    const idx = Math.abs(location.pathname.length) % lines.length;
    return lines[idx];
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 gradient-hero">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-pride-purple/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pride-pink/5 blur-3xl" />

      <div className="w-full max-w-2xl">
        <div className="text-center animate-fade-in bg-card/70 backdrop-blur border shadow-card rounded-3xl p-8 sm:p-12">
          {/* Icon */}
          <div className="mx-auto mb-6 inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-pride shadow-soft">
            <PartyPopper className="h-8 w-8 text-primary-foreground" />
          </div>

          {/* 404 */}
          <h1 className="font-display text-7xl sm:text-8xl font-bold gradient-pride-text mb-3">404</h1>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">Page Not Found</h2>

          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">{funLine}</p>

          {/* Show the path for clarity */}
          <div className="mx-auto mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span className="truncate max-w-[260px] sm:max-w-[420px]">{location.pathname}</span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="pride" size="lg" asChild className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Extra friendly footer */}
          <div className="mt-10 pt-6 border-t text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 text-pride-pink" />
              <span>
                Lost? Try the <span className="font-medium text-foreground">Dashboard</span> or <span className="font-medium text-foreground">Support</span> page.
              </span>
              <Sparkles className="h-4 w-4 text-pride-purple" />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/support">Support</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/about">About</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Small bottom note */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Tip: if you think this is a bug, send us the URL at{' '}
          <a className="text-primary hover:underline" href="mailto:info@pridesocial.org">
            info@pridesocial.org
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
