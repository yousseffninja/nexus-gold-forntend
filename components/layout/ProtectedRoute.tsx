"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { CircularProgress, Box } from "@mui/material";
import type { UserRole } from "@/types/api";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    fallback?: React.ReactNode;
}

export function ProtectedRoute({
                                   children,
                                   requiredRole,
                                   fallback,
                               }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, hasRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.default",
                }}
            >
                <CircularProgress sx={{ color: "primary.main" }} size={40} />
            </Box>
        );
    }

    if (!isAuthenticated) return null;

    if (requiredRole && !hasRole(requiredRole)) {
        return fallback ? <>{fallback}</> : null;
    }

    return <>{children}</>;
}