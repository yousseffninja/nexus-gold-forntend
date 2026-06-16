"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/AuthContext";
import { useUserDashboard } from "@/features/dashboard/hooks";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import {
    Typography,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Grid
} from "@mui/material";
// Import Grid2 instead of the deprecated v1 Grid
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DiamondIcon from "@mui/icons-material/Diamond";

function StatCard({
                      icon,
                      label,
                      value,
                  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <Card
            elevation={0}
            sx={{
                background:
                    "linear-gradient(145deg, rgba(26,26,26,0.95) 0%, rgba(15,15,15,0.98) 100%)",
                border: "1px solid rgba(212,149,14,0.12)",
                transition: "border-color 0.2s, box-shadow 0.2s",
                "&:hover": {
                    borderColor: "rgba(212,149,14,0.35)",
                    boxShadow:
                        "0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(212,149,14,0.1)",
                },
            }}
        >
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(212,149,14,0.12)",
                            color: "primary.main",
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                        >
                            {label}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
                        >
                            {value}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export function DashboardPage() {
    const t = useTranslations("dashboard");
    const tc = useTranslations("common");
    const { user } = useAuth();
    const { data, isLoading, error } = useUserDashboard();

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Box>
                    {/* Header */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: "Georgia, serif",
                                fontWeight: 700,
                                background:
                                    "linear-gradient(135deg, #b8760a, #f5de94, #d4950e)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                mb: 1,
                            }}
                        >
                            {t("welcome")}
                        </Typography>
                        <Typography color="text.secondary">
                            {t("subtitle")} — {user?.email}
                        </Typography>
                    </Box>

                    {/* Stats Layout Updated to Grid2 */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard
                                icon={<TrendingUpIcon />}
                                label="Portfolio Growth"
                                value="+12.4%"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard
                                icon={<AccountBalanceIcon />}
                                label="Total Value"
                                value="$84,230"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard
                                icon={<DiamondIcon />}
                                label="Gold Holdings"
                                value="12.5 oz"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DashboardLayout>
        </ProtectedRoute>
    );
}