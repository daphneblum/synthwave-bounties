import { createContext, useContext, useState, useCallback } from "react";
import { mockUsers } from '../data/mockData';

const STORAGE_KEY = 'hobbyhub_user';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
    })
}

const claimUsername = useCallback((username) => {
    const trimmed = username.trim();
    
})