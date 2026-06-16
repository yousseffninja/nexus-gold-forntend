"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useSignIn } from "@/features/auth/hooks";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Link } from "@/lib/i18n/navigation";
import {
    TextField,
    Button,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Box,
    InputAdornment,
    IconButton,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function LoginPage() {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const signIn = useSignIn();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) router.push("/dashboard");
    }, [isAuthenticated, router]);

    const schema = Yup.object({
        email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
        password: Yup.string().required(tv("required")),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await signIn.mutateAsync(values);
            } catch (error) {
                console.error("Login error:", error);
            }
        },
    });

    const apiError = signIn.error
        ? ((signIn.error as AxiosError<ApiResponse>).response?.data?.message ??
            "An error occurred.")
        : null;

    return (
        <AuthLayout>
            <Card
                elevation={0}
                sx={{
                    background:
                        "linear-gradient(145deg, rgba(26,26,26,0.97) 0%, rgba(10,10,10,0.99) 100%)",
                    border: "1px solid rgba(212,149,14,0.2)",
                    boxShadow:
                        "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,149,14,0.08)",
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
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
                            {t("welcomeBack")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t("loginSubtitle")}
                        </Typography>
                    </Box>

                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {apiError}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label={t("email")}
                            type="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            disabled={signIn.isPending}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon
                                                sx={{ color: "text.secondary", fontSize: 20 }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label={t("password")}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            disabled={signIn.isPending}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon
                                                sx={{ color: "text.secondary", fontSize: 20 }}
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((s) => !s)}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{ mb: 1 }}
                        />

                        <Box sx={{ textAlign: "end", mb: 3 }}>
                            <Link
                                href="/forgot-password"
                                className="text-gold-500 hover:text-gold-300 text-sm transition-colors"
                            >
                                {t("forgotPassword")}
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={signIn.isPending}
                            size="large"
                            sx={{ mb: 3, py: 1.5 }}
                        >
                            {signIn.isPending ? (
                                <CircularProgress size={22} sx={{ color: "inherit" }} />
                            ) : (
                                t("signIn")
                            )}
                        </Button>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                {t("noAccount")}{" "}
                                <Link
                                    href="/register"
                                    className="text-gold-500 hover:text-gold-300 font-semibold transition-colors"
                                >
                                    {t("signUp")}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}