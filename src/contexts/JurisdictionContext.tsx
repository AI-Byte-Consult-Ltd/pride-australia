
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Jurisdiction = 'eu' | 'australia' | 'world';

type JurisdictionContextValue = {
  jurisdiction: Jurisdiction;
  countryName: string; // used in UI text
  setJurisdiction: (j: Jurisdiction) => void;
};

const JurisdictionContext = createContext<JurisdictionContextValue | undefined>(undefined);

const STORAGE_KEY = 'pride_jurisdiction';

// Labels shown in UI.
// IMPORTANT: No USA mapping exists anymore.
const LABELS: Record<Jurisdiction, string> = {
  eu: 'European Union',
  australia: 'Australia',
  world: 'World',
};

// A safe fallback if storage is empty or corrupted.
const DEFAULT_JURISDICTION: Jurisdiction = 'world';

export function JurisdictionProvider({ children }: { children: ReactNode }) {
  const [jurisdiction, setJurisdictionState] = useState<Jurisdiction>(DEFAULT_JURISDICTION);

  useEffect(() => {
    // Restore last user selection from localStorage.
    // If missing/invalid -> keep DEFAULT_JURISDICTION.
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'eu' || saved === 'australia' || saved === 'world') {
        setJurisdictionState(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setJurisdiction = (j: Jurisdiction) => {
    setJurisdictionState(j);
    try {
      localStorage.setItem(STORAGE_KEY, j);
    } catch {
      // ignore storage errors
    }
  };

  const value = useMemo<JurisdictionContextValue>(() => {
    return {
      jurisdiction,
      countryName: LABELS[jurisdiction],
      setJurisdiction,
    };
  }, [jurisdiction]);

  return <JurisdictionContext.Provider value={value}>{children}</JurisdictionContext.Provider>;
}

export function useJurisdiction() {
  const ctx = useContext(JurisdictionContext);
  if (!ctx) {
    throw new Error('useJurisdiction must be used within a JurisdictionProvider');
  }
  return ctx;
}
