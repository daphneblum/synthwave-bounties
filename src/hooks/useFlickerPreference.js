import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hobbyhub_flicker_enabled';

export function useFlickerPreference() {
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const  [enabled, setEnabled] = useState(() => {
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

    return {
        flickerActive: enabled && !prefersReducedMotion,
        flickerEnabled: enabled, toggle,
        lockedByOS: prefersReducedMotion,
    };
}