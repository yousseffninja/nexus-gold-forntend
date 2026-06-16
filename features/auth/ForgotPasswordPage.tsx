"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useForgotPassword } from "@/features/auth/hooks";
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
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function ForgotPasswordPage() {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const tc = useTranslations("common");
    const forgotPassword = useForgotPassword();

    const schema = Yup.object({
        email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
    });

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: schema,
        onSubmit: async (values) => {
            await forgotPassword.mutateAsync(values);
        },
    });

    const apiError =
        (forgotPassword.error as AxiosError<ApiResponse>)?.response?.data
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
                        <LockResetIcon
                            sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                        />
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
                            {t("forgotPasswordTitle")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t("forgotPasswordDesc")}
                        </Typography>
                    </Box>

                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {apiError}
                        </Alert>
                    )}
                    {forgotPassword.isSuccess && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            {forgotPassword.data?.message ?? t("codeSent")}
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
                            disabled={forgotPassword.isPending}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon
                                                sx={{ color: "text.secondary", fontSize: 20 }}
                                            />
                                        </InputAdornment>
                                    ),
                                }
                            }}

                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={forgotPassword.isPending || forgotPassword.isSuccess}
                            size="large"
                            sx={{ mb: 3, py: 1.5 }}
                        >
                            {forgotPassword.isPending ? (
                                <CircularProgress size={22} sx={{ color: "inherit" }} />
                            ) : (
                                t("sendCode")
                            )}
                        </Button>
                        <Box sx={{ textAlign: "center" }}>
                            <Link
                                href="/login"
                                className="text-gold-500 hover:text-gold-300 text-sm transition-colors"
                            >
                                ← {tc("back")}
                            </Link>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}