import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextValue {
  showExactNumbers: boolean;
  toggleShowExactNumbers: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

/**
 * Single source of truth for app-wide settings that affect what's
 * rendered elsewhere. Currently just the calorie-visibility toggle --
 * off by default, per the product decision that fuel/variety numbers
 * stay hidden unless the user explicitly opts in from Profile > Advanced.
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [showExactNumbers, setShowExactNumbers] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        showExactNumbers,
        toggleShowExactNumbers: () => setShowExactNumbers((v) => !v),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}
