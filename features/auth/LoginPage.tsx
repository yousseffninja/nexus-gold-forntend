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
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    Divider,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BoltIcon from "@mui/icons-material/Bolt";
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
        if (isAuthenticated) router.push("/home");
    }, [isAuthenticated, router]);

    const schema = Yup.object({
        email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
        password: Yup.string().required(tv("required")),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                await signIn.mutateAsync({
                    ...values,
                    email: values.email.toLowerCase(),
                });
            } catch (error) {
                // Error is handled by signIn.error state
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        formik.validateForm().then((errors) => {
            if (Object.keys(errors).length === 0) {
                formik.submitForm();
            }
        });
    };

    const apiError = signIn.error
        ? ((signIn.error as AxiosError<ApiResponse>).response?.data?.message ??
            "An error occurred.")
        : null;

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                {/* Mobile logo */}
                <div className="flex lg:hidden items-center gap-2">
                    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="22" stroke="url(#pg2)" strokeWidth="1.5" fill="rgba(124,58,237,0.15)" />
                        <text x="24" y="30" textAnchor="middle" fill="url(#pg2)" fontSize="18" fontFamily="system-ui" fontWeight="bold">N</text>
                        <defs>
                            <linearGradient id="pg2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#a78bfa" />
                                <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="text-white font-bold">NexusGold</span>
                </div>
                <div className="hidden lg:block" />
            </div>

            {/* Form area */}
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <div className="mb-8">
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            mb: 1,
                            color: "white",
                            fontFamily: "'Space Grotesk', system-ui, sans-serif"
                    }}
                    >
                        {t("welcomeBackGamer")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("loginSubtitleGamer")}
                    </Typography>
                </div>

                {apiError && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                        {apiError}
                    </Alert>
                )}

                <Box>
                    <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block" }}>
                        {t("email")}
                    </Typography>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        placeholder="commander@nexusgold.gg"
                        type="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(e as unknown as React.MouseEvent);
                            }
                        }}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        disabled={signIn.isPending}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                            }
                        }}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block" }}>
                        {t("securePassword")}
                    </Typography>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(e as unknown as React.MouseEvent);
                            }
                        }}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        disabled={signIn.isPending}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                        sx={{ mb: 1 }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    sx={{
                                    color: "text.secondary",
                                    "&.Mui-checked": { color: "primary.main" },
                                    }}
                                />
                            }
                            label={<Typography variant="caption" color="text.secondary">{t("rememberMe")}</Typography>}
                        />
                        <Link href="/forgot-password"
                              className="text-on-variant hover:text-primary text-xs transition-colors">
                            {t("forgotPassword")}
                        </Link>
                    </Box>

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        disabled={signIn.isPending}
                        size="large"
                        endIcon={!signIn.isPending && <BoltIcon />}
                        onClick={handleSubmit}
                        sx={{ mb: 3, py: 1.5, fontSize: 16 }}
                    >
                        {signIn.isPending ? (
                            <CircularProgress size={22} sx={{ color: "inherit" }} />
                        ) : (
                            t("signIn")
                        )}
                    </Button>

                    {/* Social connect */}
                    <Box sx={{ mb: 3 }}>
                        <Divider sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: 2, fontSize: 10 }}>
                                {t("socialConnect")}
                            </Typography>
                        </Divider>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    borderColor: "surface.bright",
                                    color: "text.secondary",
                                    borderRadius: 3,
                                    py: 1.2,
                                    "&:hover": { borderColor: "primary.main", color: "white" },
                                }}
                            >
                                🎮 {t("steam")}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    borderColor: "surface.bright",
                                    color: "text.secondary",
                                    borderRadius: 3,
                                    py: 1.2,
                                    "&:hover": { borderColor: "primary.main", color: "white" },
                                }}
                            >
                                🎧 {t("discord")}
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            {t("newToNexusGold")}{" "}
                            <Link href="/register"
                                  className="text-primary hover:text-purple-300 font-bold transition-colors">
                                {t("createAccount")}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <div className="flex justify-center gap-4 mb-2">
                    <span className="text-on-variant text-xs cursor-pointer hover:text-white transition-colors">{t("privacyPolicy")}</span>
                    <span className="text-on-variant text-xs cursor-pointer hover:text-white transition-colors">{t("termsOfService")}</span>
                    <span className="text-on-variant text-xs cursor-pointer hover:text-white transition-colors">{t("cookiePolicy")}</span>
                </div>
                <p className="text-on-variant text-xs">
                    {t("copyright")}
                </p>
            </div>
        </>
    );
}