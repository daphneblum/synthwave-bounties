import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hobbyhub_flicker_enabled';
const FlickerContext = createContext(null);

export function FlickerProvider({ children }) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [enabled, setEnabled] = useState(() => {
    if (prefersReducedMotion) return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : false; 
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
  }, [enabled]);

  const toggle = useCallback(() => {
    if (prefersReducedMotion) return; 
    setEnabled((prev) => !prev);
  }, [prefersReducedMotion]);

  const value = {
    flickerActive: enabled && !prefersReducedMotion,
    flickerEnabled: enabled,
    toggle,
    lockedByOS: prefersReducedMotion,
  };

  return (
    <FlickerContext.Provider value={value}>{children}</FlickerContext.Provider>
  );
}

export function useFlickerPreference() {
  const ctx = useContext(FlickerContext);
  if (!ctx) {
    throw new Error('useFlickerPreference must be used within FlickerProvider');
  }
  return ctx;
}