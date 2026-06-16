import { jwtDecode } from "jwt-decode";
import type { AuthUser, JwtPayload, UserRole } from "@/types/api";

export function decodeToken(token: string): AuthUser | null {
    try {
        const payload = jwtDecode<JwtPayload>(token);

        if (!payload || !payload.sub) return null;

        let roles: UserRole[] = [];
        if (Array.isArray(payload.roles)) {
            roles = payload.roles;
        } else if (payload.role) {
            roles = [payload.role];
        }

        return {
            email: payload.email ?? payload.sub,
            roles,
        };
    } catch {
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    try {
        const { exp } = jwtDecode<JwtPayload>(token);
        return Date.now() >= exp * 1000;
    } catch {
        return true;
    }
}