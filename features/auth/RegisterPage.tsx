"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useSignUp } from "@/features/auth/hooks";
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
    Grid,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { PersonOutlined as PersonOutlineIcon } from "@mui/icons-material";
import { EmailOutlined as EmailOutlinedIcon } from "@mui/icons-material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { BadgeOutlined as BadgeOutlinedIcon } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function RegisterPage() {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const router = useRouter();
    const signUp = useSignUp();
    const [showPassword, setShowPassword] = useState(false);

    const schema = Yup.object({
        firstName: Yup.string().required(tv("firstNameRequired")),
        lastName: Yup.string().required(tv("lastNameRequired")),
        displayName: Yup.string().required(tv("displayNameRequired")),
        email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
        password: Yup.string().min(8, tv("passwordMin")).required(tv("required")),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            displayName: "",
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            await signUp.mutateAsync(values);
            router.push("/verify-email");
        },
    });

    const apiError = signUp.error
        ? ((signUp.error as AxiosError<ApiResponse>).response?.data?.message ??
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
                            {t("createAccount")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t("registerSubtitle")}
                        </Typography>
                    </Box>

                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {apiError}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label={t("firstName")}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                    disabled={signUp.isPending}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineIcon
                                                        sx={{ color: "text.secondary", fontSize: 20 }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label={t("lastName")}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                    disabled={signUp.isPending}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineIcon
                                                        sx={{ color: "text.secondary", fontSize: 20 }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    id="displayName"
                                    name="displayName"
                                    label={t("displayName")}
                                    value={formik.values.displayName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.displayName &&
                                        Boolean(formik.errors.displayName)
                                    }
                                    helperText={
                                        formik.touched.displayName && formik.errors.displayName
                                    }
                                    disabled={signUp.isPending}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BadgeOutlinedIcon
                                                        sx={{ color: "text.secondary", fontSize: 20 }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
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
                                    disabled={signUp.isPending}
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
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label={t("password")}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password && formik.errors.password
                                    }
                                    disabled={signUp.isPending}
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
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={signUp.isPending}
                            size="large"
                            sx={{ mt: 3, mb: 3, py: 1.5 }}
                        >
                            {signUp.isPending ? (
                                <CircularProgress size={22} sx={{ color: "inherit" }} />
                            ) : (
                                t("signUp")
                            )}
                        </Button>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                {t("haveAccount")}{" "}
                                <Link
                                    href="/login"
                                    className="text-gold-500 hover:text-gold-300 font-semibold transition-colors"
                                >
                                    {t("signIn")}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}