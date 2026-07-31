import { createContext, useContext, useState, useCallback } from "react";
import { mockUsers } from '../data/mockData';

const STORAGE_KEY = 'hobbyhub_user';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    });

    const claimUsername = useCallback((username) => {
        const trimmed = username.trim();
        if (!trimmed) return { error: 'USERNAME CANNOT BE BLANK' };
        
        let existing = mockUsers.find(
            (u) => u.username.toLowerCase() === trimmed.toLowerCase()
        );

        if (!existing) {
            existing = {
                id: `u${mockUsers.length + 1}`,
                username: trimmed,
                created_at: new Date().toISOString(),
            };
            mockUsers.push(existing);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        setUser(existing);
        return { user: existing };
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, claimUsername, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

