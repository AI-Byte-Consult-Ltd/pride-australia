import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Jurisdiction = 'AU' | 'US';

interface JurisdictionContextType {
  jurisdiction: Jurisdiction;
  setJurisdiction: (jurisdiction: Jurisdiction) => void;
  countryName: string;
  countryEmoji: string;
}

const JurisdictionContext = createContext<JurisdictionContextType | undefined>(undefined);

export const JurisdictionProvider = ({ children }: { children: ReactNode }) => {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('AU');

  const countryName = jurisdiction === 'AU' ? 'Australia' : 'United States';
  const countryEmoji = jurisdiction === 'AU' ? '🇦🇺' : '🇺🇸';

  return (
    <JurisdictionContext.Provider value={{ jurisdiction, setJurisdiction, countryName, countryEmoji }}>
      {children}
    </JurisdictionContext.Provider>
  );
};

export const useJurisdiction = () => {
  const context = useContext(JurisdictionContext);
  if (!context) {
    throw new Error('useJurisdiction must be used within a JurisdictionProvider');
  }
  return context;
};
