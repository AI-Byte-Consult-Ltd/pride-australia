
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJurisdiction } from '@/contexts/JurisdictionContext';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationBell } from '@/components/NotificationBell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type JurisdictionCode = 'eu' | 'world' | 'australia';

const JURISDICTIONS = [
  { code: 'eu', label: 'European Union', emoji: '🇪🇺' },
  { code: 'world', label: 'World', emoji: '🌍' },
  { code: 'australia', label: 'Australia', emoji: '🇦🇺' },
] as const;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { jurisdiction, setJurisdiction } = useJurisdiction();
  const { user, signOut, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Community Map', href: '/community-map' },
    { name: 'Support', href: '/support' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const currentJurisdiction =
    JURISDICTIONS.find((j) => j.code === jurisdiction) ?? JURISDICTIONS[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-pride">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display text-xl font-bold">Pride Social</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Jurisdiction */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <span>{currentJurisdiction.emoji}</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {JURISDICTIONS.map((j) => (
                <DropdownMenuItem
                  key={j.code}
                  onClick={() => setJurisdiction(j.code)}
                >
                  {j.emoji} {j.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop auth */}
          {!loading && (
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <NotificationBell />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <User className="h-4 w-4" />
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-destructive"
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Mobile burger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-3 border-t">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm mb-2"
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" className="w-full mb-2" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
