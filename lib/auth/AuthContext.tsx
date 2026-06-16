"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { tokenStorage } from "@/lib/api/ client";
import { decodeToken, isTokenExpired } from "@/lib/auth/jwt";
import type { AuthUser, UserRole } from "@/types/api";

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasRole: (role: UserRole) => boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const resolveUser = useCallback((token: string | null): AuthUser | null => {
        if (!token || isTokenExpired(token)) {
            tokenStorage.clear();
            return null;
        }
        return decodeToken(token);
    }, []);

    useEffect(() => {
        const token = tokenStorage.getAccess();
        const resolved = resolveUser(token);
        setTimeout(() => {
            setUser(resolved);
            setIsLoading(false);
        }, 0);
    }, [resolveUser]);

    useEffect(() => {
        const handler = () => {
            setUser(null);
            if (typeof window !== "undefined") {
                const locale = window.location.pathname.split("/")[1] ?? "en";
                window.location.href = `/${locale}/login`;
            }
        };
        window.addEventListener("auth:logout", handler);
        return () => window.removeEventListener("auth:logout", handler);
    }, []);

    const login = useCallback(
        (accessToken: string, refreshToken: string) => {
            tokenStorage.setAccess(accessToken);
            tokenStorage.setRefresh(refreshToken);
            const resolved = resolveUser(accessToken);
            setUser(resolved);
        },
        [resolveUser]
    );

    const logout = useCallback(() => {
        tokenStorage.clear();
        setUser(null);
    }, []);

    const hasRole = useCallback(
        (role: UserRole) => user?.roles.includes(role) ?? false,
        [user]
    );

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            isLoading,
            hasRole,
            login,
            logout,
        }),
        [user, isLoading, hasRole, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}