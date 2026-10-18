import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    dateOfBirth?: string,
    referralCode?: string
  ) => Promise<{ error: Error | null }>;
  requestPasswordReset: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Creative username generator
 * - More variety (plants, stars, planets, myth, art, cinema vibes)
 * - Avoids real actors’ names (privacy/impersonation risk) but includes archetypes like "CineMuse"
 * - Optional styles: Prefix/Suffix variants, separators, roman numerals, emoji (kept off by default)
 */
const generateCreativeUsername = (): string => {
  const adjectives = [
    // Core vibe
    'Radiant', 'Brave', 'Cosmic', 'Dazzling', 'Euphoric', 'Fierce', 'Glowing',
    'Harmonious', 'Infinite', 'Jubilant', 'Kindred', 'Luminous', 'Majestic',
    'Noble', 'Opulent', 'Proud', 'Quirky', 'Resilient', 'Sparkling', 'Triumphant',
    'Unified', 'Vibrant', 'Wonderlit', 'Youthful', 'Zealous', 'Authentic', 'Bold',
    'Creative', 'Divine', 'Elegant', 'Fabulous', 'Graceful', 'Hopeful', 'Inspiring',
    'Joyful', 'Kaleidoscopic', 'Loving', 'Magical', 'Playful', 'Fearless', 'Serene',
    'Electric', 'Dreamy', 'Golden', 'Neon', 'Velvet', 'Satin', 'Mystic', 'Ethereal',
    'Starlit', 'Moonlit', 'Sun-kissed', 'Oceanic', 'Wild', 'Gentle', 'Curious',
    'Galactic', 'Prismatic', 'Auroral', 'Celestial', 'Evergreen', 'Blooming', 'Dewy',
    'Sapphire', 'Emerald', 'Ruby', 'Opal', 'Crystal', 'Diamond', 'Silver', 'Ivory',
  ];

  const naturePlants = [
    'Lavender', 'Olive', 'Rose', 'Tulip', 'Lotus', 'Orchid', 'Iris', 'Lily', 'Dahlia',
    'Peony', 'Jasmine', 'Violet', 'Clover', 'Fern', 'Maple', 'Willow', 'Cedar',
    'Sequoia', 'Bamboo', 'Aloe', 'Sage', 'Basil', 'Mint', 'Juniper', 'Cypress',
    'Marigold', 'Sunflower', 'Magnolia', 'Hibiscus', 'Poppy', 'Acacia',
  ];

  const cosmos = [
    'Nova', 'Comet', 'Nebula', 'Quasar', 'Pulsar', 'Aurora', 'Stardust', 'Zenith',
    'Eclipse', 'Orbit', 'Galaxy', 'Cosmos', 'Meteor', 'Asteroid', 'Supernova',
    'Polaris', 'Andromeda', 'Lyra', 'Orion', 'Vega', 'Sirius', 'Altair',
  ];

  const planets = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune',
    'Pluto', 'Europa', 'Titan', 'Io', 'Callisto', 'Ganymede',
  ];

  const mythFantasy = [
    'Phoenix', 'Unicorn', 'Dragon', 'Griffin', 'Mermaid', 'Sphinx', 'Pegasus',
    'Muse', 'Oracle', 'Wanderer', 'Guardian', 'Voyager', 'Nomad', 'Alchemist',
    'Enchanter', 'Dreamweaver', 'Starweaver',
  ];

  const artCinema = [
    'CineMuse', 'StageLight', 'CurtainCall', 'FilmReel', 'Spotlight', 'Encore',
    'Verse', 'Sonnet', 'Ballad', 'Canvas', 'Palette', 'Sketch', 'Monologue',
    'Symphony', 'Nocturne', 'Chorus', 'Harmony', 'Rhythm',
  ];

  const community = [
    'Pride', 'Unity', 'Harmony', 'Freedom', 'Joy', 'Peace', 'Hope', 'Kindness',
    'Courage', 'Bloom', 'Spark', 'Light', 'Flame', 'Wave', 'Heart', 'Soul', 'Spirit',
    'Dream', 'Pulse', 'Glow',
  ];

  // Mix pools to create more combinations
  const nounPools = [naturePlants, cosmos, planets, mythFantasy, artCinema, community];
  const nouns = nounPools[Math.floor(Math.random() * nounPools.length)];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  // Style variants
  const number = Math.floor(Math.random() * 9999) + 1;
  const shortNumber = Math.floor(Math.random() * 99) + 1;
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][Math.floor(Math.random() * 10)];

  const separators = ['', '', '', '', '_']; // bias to no separator
  const sep = separators[Math.floor(Math.random() * separators.length)];

  // Choose a pattern (weighted)
  const patterns = [
    () => `@${adjective}${noun}${number}`,
    () => `@${adjective}${sep}${noun}${shortNumber}`,
    () => `@${noun}${sep}${adjective}${shortNumber}`,
    () => `@${adjective}${noun}${roman}`,
    () => `@${noun}${number}`,
    () => `@${adjective}${noun}`,
  ];

  const pick = patterns[Math.floor(Math.random() * patterns.length)];

  // Usernames may only contain letters, digits and "_" (e.g. "Sun-kissed" -> "Sunkissed")
  const clean = (s: string) => '@' + s.slice(1).replace(/[^A-Za-z0-9_]/g, '').slice(0, 29);

  return clean(pick());
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Give accounts without a username a generated one. The server only sets it
      // when the profile has none, so an existing username is never overwritten.
      // Date of birth is stored by the signup trigger on the server.
      if (event === 'SIGNED_IN' && session?.user) {
        setTimeout(() => {
          void supabase.rpc('ensure_username', { _candidate: generateCreativeUsername() });
        }, 100);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    dateOfBirth?: string,
    referralCode?: string
  ) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
          date_of_birth: dateOfBirth,
          // Processed by the server once the email is confirmed
          referral_code: referralCode || undefined,
        },
      },
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, requestPasswordReset, updatePassword }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
