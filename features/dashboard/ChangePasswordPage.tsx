"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useChangePassword } from "@/features/auth/hooks";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function ChangePasswordPage() {
    const t = useTranslations("settings");
    const tv = useTranslations("validation");
    const changePassword = useChangePassword();

    const schema = Yup.object({
        currentPassword: Yup.string().required(tv("required")),
        newPassword: Yup.string()
            .min(8, tv("passwordMin"))
            .required(tv("required")),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], tv("passwordMatch"))
            .required(tv("required")),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: async ({ currentPassword, newPassword }) => {
            await changePassword.mutateAsync({ currentPassword, newPassword });
            formik.resetForm();
        },
    });

    const apiError =
        (changePassword.error as AxiosError<ApiResponse>)?.response?.data
            ?.message ?? null;

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Box sx={{ maxWidth: 500 }}>
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
                            mb: 4,
                        }}
                    >
                        {t("changePassword")}
                    </Typography>

                    <Card
                        elevation={0}
                        sx={{
                            background:
                                "linear-gradient(145deg, rgba(26,26,26,0.95) 0%, rgba(15,15,15,0.98) 100%)",
                            border: "1px solid rgba(212,149,14,0.15)",
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            {apiError && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {apiError}
                                </Alert>
                            )}
                            {changePassword.isSuccess && (
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    {t("passwordChanged")}
                                </Alert>
                            )}

                            <Box
                                component="form"
                                onSubmit={formik.handleSubmit}
                                noValidate
                            >
                                <TextField
                                    fullWidth
                                    id="currentPassword"
                                    name="currentPassword"
                                    label={t("currentPassword")}
                                    type="password"
                                    value={formik.values.currentPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.currentPassword &&
                                        Boolean(formik.errors.currentPassword)
                                    }
                                    helperText={
                                        formik.touched.currentPassword &&
                                        formik.errors.currentPassword
                                    }
                                    disabled={changePassword.isPending}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
                                                        sx={{ color: "text.secondary", fontSize: 20 }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
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
                                    disabled={changePassword.isPending}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
                                                        sx={{ color: "text.secondary", fontSize: 20 }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label={t("confirmPassword")}
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
                                    disabled={changePassword.isPending}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
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
                                    disabled={changePassword.isPending || !formik.isValid}
                                    size="large"
                                    sx={{ py: 1.5 }}
                                >
                                    {changePassword.isPending ? (
                                        <CircularProgress size={22} sx={{ color: "inherit" }} />
                                    ) : (
                                        t("changePassword")
                                    )}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </DashboardLayout>
        </ProtectedRoute>
    );
}