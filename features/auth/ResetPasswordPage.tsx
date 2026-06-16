"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useResetPassword } from "@/features/auth/hooks";
import { AuthLayout } from "@/components/layout/AuthLayout";
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
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyIcon from "@mui/icons-material/Key";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function ResetPasswordPage() {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const ts = useTranslations("settings");
    const router = useRouter();
    const resetPassword = useResetPassword();

    const schema = Yup.object({
        email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
        code: Yup.string().required(tv("codeRequired")),
        newPassword: Yup.string()
            .min(8, tv("passwordMin"))
            .required(tv("required")),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], tv("passwordMatch"))
            .required(tv("required")),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            code: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: async ({ email, code, newPassword }) => {
            await resetPassword.mutateAsync({ email, code, newPassword });
            router.push("/login");
        },
    });

    const apiError =
        (resetPassword.error as AxiosError<ApiResponse>)?.response?.data
            ?.message ?? null;

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
                        <KeyIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
                        <Typography
                            variant="h5"
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
                            {t("resetPasswordTitle")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t("resetPasswordDesc")}
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
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            disabled={resetPassword.isPending}
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
                            id="code"
                            name="code"
                            label={t("verificationCode")}
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                            disabled={resetPassword.isPending}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            id="newPassword"
                            name="newPassword"
                            label={t("newPassword")}
                            type="password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.newPassword &&
                                Boolean(formik.errors.newPassword)
                            }
                            helperText={
                                formik.touched.newPassword && formik.errors.newPassword
                            }
                            disabled={resetPassword.isPending}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon
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
                            id="confirmPassword"
                            name="confirmPassword"
                            label={ts("confirmPassword")}
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            }
                            disabled={resetPassword.isPending}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon
                                                sx={{ color: "text.secondary", fontSize: 20 }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={resetPassword.isPending}
                            size="large"
                            sx={{ py: 1.5 }}
                        >
                            {resetPassword.isPending ? (
                                <CircularProgress size={22} sx={{ color: "inherit" }} />
                            ) : (
                                t("resetPassword")
                            )}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}