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
    dateOfBirth?: string
  ) => Promise<{ error: Error | null }>;
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

  const separators = ['', '', '', '', '-', '_']; // bias to no separator
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

  // Remove spaces/hyphens that might appear in adjectives like "Sun-kissed"
  const clean = (s: string) => s.replace(/\s+/g, '').replace(/–/g, '-');

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

      // Update profile with date_of_birth and username if it was passed during signup
      if (event === 'SIGNED_IN' && session?.user) {
        const dateOfBirth = session.user.user_metadata?.date_of_birth;
        const isNewUser = session.user.user_metadata?.is_new_user;

        if (dateOfBirth || isNewUser) {
          // Use setTimeout to avoid blocking the auth state change
          setTimeout(async () => {
            const updates: { date_of_birth?: string; username?: string } = {};

            if (dateOfBirth) {
              updates.date_of_birth = dateOfBirth;
            }

            // Generate username for new users
            if (isNewUser) {
              let username = generateCreativeUsername();
              let attempts = 0;

              // Try to find a unique username
              while (attempts < 7) {
                const { data: existing } = await supabase
                  .from('profiles')
                  .select('username')
                  .eq('username', username)
                  .maybeSingle();

                if (!existing) {
                  updates.username = username;
                  break;
                }

                username = generateCreativeUsername();
                attempts++;
              }

              if (!updates.username) {
                // Fallback with timestamp
                updates.username = `@Pride${Date.now()}`;
              }
            }

            if (Object.keys(updates).length > 0) {
              await supabase.from('profiles').update(updates).eq('user_id', session.user.id);
            }
          }, 100);
        }
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

  const signUp = async (email: string, password: string, displayName: string, dateOfBirth?: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
          date_of_birth: dateOfBirth,
          is_new_user: true,
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

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
