import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string, dateOfBirth?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creative username generator
const generateCreativeUsername = (): string => {
  const adjectives = [
    'Radiant', 'Brave', 'Cosmic', 'Dazzling', 'Euphoric', 'Fierce', 'Glowing',
    'Harmonious', 'Infinite', 'Jubilant', 'Kindred', 'Luminous', 'Majestic',
    'Noble', 'Opulent', 'Proud', 'Quirky', 'Resilient', 'Sparkling', 'Triumphant',
    'Unified', 'Vibrant', 'Wonderful', 'Xtraordinary', 'Youthful', 'Zealous',
    'Authentic', 'Bold', 'Creative', 'Divine', 'Elegant', 'Fabulous', 'Graceful',
    'Hopeful', 'Inspiring', 'Joyful', 'Kaleidoscopic', 'Loving', 'Magical'
  ];
  
  const nouns = [
    'Phoenix', 'Star', 'Rainbow', 'Spirit', 'Heart', 'Soul', 'Dream',
    'Flame', 'Wave', 'Light', 'Moon', 'Sun', 'Bloom', 'Spark', 'Gem',
    'Pride', 'Unity', 'Harmony', 'Freedom', 'Joy', 'Peace', 'Hope',
    'Butterfly', 'Unicorn', 'Dragon', 'Eagle', 'Lion', 'Tiger', 'Dolphin',
    'Crystal', 'Diamond', 'Opal', 'Ruby', 'Sapphire', 'Emerald', 'Aurora'
  ];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  
  return `@${adjective}${noun}${number}`;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
              while (attempts < 5) {
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
              await supabase
                .from('profiles')
                .update(updates)
                .eq('user_id', session.user.id);
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

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
