"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useSendVerificationCode, useVerifyEmail } from "@/features/auth/hooks";
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
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function VerifyEmailPage() {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const router = useRouter();
    const sendCode = useSendVerificationCode();
    const verifyEmail = useVerifyEmail();
    const [codeSent, setCodeSent] = useState(false);
    const [email, setEmail] = useState("");

    const emailSchema = Yup.object({
        email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
    });

    const verifySchema = Yup.object({
        code: Yup.string().required(tv("codeRequired")),
    });

    const emailFormik = useFormik({
        initialValues: { email: "" },
        validationSchema: emailSchema,
        onSubmit: async (values) => {
            await sendCode.mutateAsync({ email: values.email });
            setEmail(values.email);
            setCodeSent(true);
        },
    });

    const verifyFormik = useFormik({
        initialValues: { code: "" },
        validationSchema: verifySchema,
        onSubmit: async (values) => {
            await verifyEmail.mutateAsync({ email, code: values.code });
            router.push("/login");
        },
    });

    const apiError =
        (sendCode.error as AxiosError<ApiResponse>)?.response?.data?.message ??
        (verifyEmail.error as AxiosError<ApiResponse>)?.response?.data?.message ??
        null;

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
                        <VerifiedOutlinedIcon
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
                            {t("verifyEmailTitle")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t("verifyEmailDesc")}
                        </Typography>
                    </Box>

                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {apiError}
                        </Alert>
                    )}
                    {sendCode.isSuccess && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            {t("codeSent")}
                        </Alert>
                    )}

                    {!codeSent ? (
                        <Box
                            component="form"
                            onSubmit={emailFormik.handleSubmit}
                            noValidate
                        >
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label={t("email")}
                                type="email"
                                value={emailFormik.values.email}
                                onChange={emailFormik.handleChange}
                                onBlur={emailFormik.handleBlur}
                                error={
                                    emailFormik.touched.email &&
                                    Boolean(emailFormik.errors.email)
                                }
                                helperText={
                                    emailFormik.touched.email && emailFormik.errors.email
                                }
                                disabled={sendCode.isPending}
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
                                sx={{ mb: 3 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={sendCode.isPending}
                                size="large"
                                sx={{ py: 1.5 }}
                            >
                                {sendCode.isPending ? (
                                    <CircularProgress size={22} sx={{ color: "inherit" }} />
                                ) : (
                                    t("sendCode")
                                )}
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            component="form"
                            onSubmit={verifyFormik.handleSubmit}
                            noValidate
                        >
                            <TextField
                                fullWidth
                                id="code"
                                name="code"
                                label={t("verificationCode")}
                                value={verifyFormik.values.code}
                                onChange={verifyFormik.handleChange}
                                onBlur={verifyFormik.handleBlur}
                                error={
                                    verifyFormik.touched.code &&
                                    Boolean(verifyFormik.errors.code)
                                }
                                helperText={
                                    verifyFormik.touched.code && verifyFormik.errors.code
                                }
                                disabled={verifyEmail.isPending}
                                sx={{ mb: 3 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={verifyEmail.isPending}
                                size="large"
                                sx={{ py: 1.5 }}
                            >
                                {verifyEmail.isPending ? (
                                    <CircularProgress size={22} sx={{ color: "inherit" }} />
                                ) : (
                                    t("verifyEmail")
                                )}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </AuthLayout>
    );
}