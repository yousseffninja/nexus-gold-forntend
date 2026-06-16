"use client";

import { useTranslations } from "next-intl";
import { useAdminDashboard } from "@/features/dashboard/hooks";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import {
    Typography,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Alert,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BlockIcon from "@mui/icons-material/Block";

function AccessDeniedCard() {
    const t = useTranslations("admin");
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
                gap: 2,
            }}
        >
            <BlockIcon sx={{ fontSize: 64, color: "error.main", opacity: 0.6 }} />
            <Typography
                variant="h4"
                sx={{ fontFamily: "Georgia, serif", color: "error.main" }}
            >
                {t("accessDenied")}
            </Typography>
            <Typography color="text.secondary">{t("accessDeniedDesc")}</Typography>
        </Box>
    );
}

function AdminContent() {
    const t = useTranslations("admin");
    const tc = useTranslations("common");
    const { data, isLoading, error } = useAdminDashboard();

    return (
        <Box>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
                <AdminPanelSettingsIcon sx={{ color: "primary.main", fontSize: 36 }} />
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "Georgia, serif",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #b8760a, #f5de94, #d4950e)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {t("title")}
                </Typography>
            </Box>

            <Card
                elevation={0}
                sx={{
                    background:
                        "linear-gradient(145deg, rgba(26,26,26,0.95) 0%, rgba(15,15,15,0.98) 100%)",
                    border: "1px solid rgba(212,149,14,0.12)",
                }}
            >
                <CardContent>
                    {isLoading && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <CircularProgress size={20} sx={{ color: "primary.main" }} />
                            <Typography color="text.secondary">{tc("loading")}</Typography>
                        </Box>
                    )}
                    {error && (
                        <Alert severity="error">
                            {(
                                error as {
                                    response?: { data?: { message?: string } };
                                }
                            )?.response?.data?.message ?? tc("error")}
                        </Alert>
                    )}
                    {data && (
                        <Typography
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "rgba(212,149,14,0.05)",
                                border: "1px solid rgba(212,149,14,0.1)",
                                fontFamily: "monospace",
                                fontSize: 14,
                            }}
                        >
                            {data}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export function AdminPage() {
    return (
        <ProtectedRoute
            requiredRole="ADMIN"
            fallback={
                <DashboardLayout>
                    <AccessDeniedCard />
                </DashboardLayout>
            }
        >
            <DashboardLayout>
                <AdminContent />
            </DashboardLayout>
        </ProtectedRoute>
    );
}