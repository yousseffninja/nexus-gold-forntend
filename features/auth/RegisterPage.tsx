"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useSignUp } from "@/features/auth/hooks";
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
    Grid,
} from "@mui/material";
import { PersonOutlined as PersonOutlineIcon } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BoltIcon from "@mui/icons-material/Bolt";
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
        <>
            <div className="max-w-sm mx-auto w-full">
                <div className="mb-8">
                    <Typography variant="h4" sx={{
                        fontWeight: 800, mb: 1, color: "white",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    }}>
                        {t("createAccount")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("registerSubtitle")}
                    </Typography>
                </div>

                {apiError && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                        {apiError}
                    </Alert>
                )}

                <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label={t("firstName")}
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                disabled={signUp.isPending}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label={t("lastName")}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                disabled={signUp.isPending}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="displayName"
                                name="displayName"
                                label={t("displayName")}
                                value={formik.values.displayName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                                helperText={formik.touched.displayName && formik.errors.displayName}
                                disabled={signUp.isPending}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
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
                                disabled={signUp.isPending}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label={t("password")}
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                disabled={signUp.isPending}
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
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={signUp.isPending}
                        size="large"
                        endIcon={!signUp.isPending && <BoltIcon />}
                        sx={{ mt: 3, mb: 3, py: 1.5, fontSize: 16 }}
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
                            <Link href="/login"
                                  className="text-primary hover:text-purple-300 font-bold transition-colors">
                                {t("signIn")}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </div>
        </>
    );
}