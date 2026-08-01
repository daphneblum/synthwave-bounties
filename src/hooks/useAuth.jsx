import { createContext, useContext, useState, useCallback } from "react";
// import { mockUsers } from '../data/mockData';
import { claimUsername as claimUsernameQuery } from "../lib/supabaseQueries";

const STORAGE_KEY = 'hobbyhub_user';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    });

    const claimUsername = useCallback(async(username) => {
        const result = await claimUsernameQuery(username);
        if (result.error) return { error: result.error };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));
        setUser(result.user);
        return { user: result.user };
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

