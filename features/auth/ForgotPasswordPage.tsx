"use client";

import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useForgotPassword, useVerifyResetPassword, useResetPassword } from "@/features/auth/hooks";
import {
    TextField,
    Button,
    Alert,
    CircularProgress,
    Typography,
    Box,
    InputAdornment,
    IconButton,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

function getApiError(error: unknown): string | null {
    if (!error) return null;
    return (
        (error as AxiosError<ApiResponse>).response?.data?.message ??
        "An error occurred."
    );
}

// ─── Step 1 – Email ───────────────────────────────────────────────────────────
function EmailStep({ onSuccess }: { onSuccess: (email: string) => void }) {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const forgotPassword = useForgotPassword();

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email(tv("emailInvalid")).required(tv("required")),
        }),
        onSubmit: async ({ email }) => {
            await forgotPassword.mutateAsync(
                { email },
                { onSuccess: () => onSuccess(email) }
            );
        },
    });

    return (
        <>
            <div className="mb-8">
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "white", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {t("accountRecovery")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("forgotPasswordSubtitle")}
                </Typography>
            </div>

            {getApiError(forgotPassword.error) && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                    {getApiError(forgotPassword.error)}
                </Alert>
            )}

            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block", letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                    {t("registeredEmail")}
                </Typography>
                <TextField
                    fullWidth id="email" name="email"
                    placeholder="commander@nexusgold.gg"
                    type="email" autoComplete="email"
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
                                    <EmailOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{ mb: 3 }}
                />
                <Button
                    type="submit" fullWidth variant="contained"
                    disabled={forgotPassword.isPending} size="large"
                    endIcon={!forgotPassword.isPending && <ArrowForwardIcon />}
                    sx={{ mb: 3, py: 1.5, fontSize: 16 }}
                >
                    {forgotPassword.isPending
                        ? <CircularProgress size={22} sx={{ color: "inherit" }} />
                        : t("sendResetCode")}
                </Button>
                <Box sx={{ textAlign: "center" }}>
                    <Link href="/login" className="flex items-center justify-center gap-1 text-on-variant hover:text-white text-sm transition-colors">
                        <ArrowBackIcon sx={{ fontSize: 16 }} />
                        {t("returnToLogin")}
                    </Link>
                </Box>
            </Box>
        </>
    );
}

// ─── OTP 6-boxes ──────────────────────────────────────────────────────────────
function OtpInput({
    value,
    onChange,
    disabled,
}: {
    value: string[];
    onChange: (v: string[]) => void;
    disabled?: boolean;
}) {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const next = [...value];
            next[i] = "";
            onChange(next);
            if (i > 0) inputs.current[i - 1]?.focus();
        }
    };

    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const char = e.target.value.replace(/\D/g, "").slice(-1);
        const next = [...value];
        next[i] = char;
        onChange(next);
        if (char && i < 5) inputs.current[i + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = Array(6).fill("").map((_, i) => pasted[i] ?? "");
        onChange(next);
        inputs.current[Math.min(pasted.length, 5)]?.focus();
    };

    return (
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mb: 3 }}>
            {value.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => { inputs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKey(i, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    style={{
                        width: 48, height: 56, textAlign: "center",
                        fontSize: 22, fontWeight: 700, borderRadius: 12,
                        border: `2px solid ${digit ? "#7c3aed" : "rgba(255,255,255,0.15)"}`,
                        background: "rgba(255,255,255,0.05)", color: "white",
                        outline: "none", transition: "border-color 0.2s",
                        caretColor: "#a78bfa",
                        cursor: disabled ? "not-allowed" : "text",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#a78bfa"; }}
                    onBlur={(e) => { e.target.style.borderColor = digit ? "#7c3aed" : "rgba(255,255,255,0.15)"; }}
                />
            ))}
        </Box>
    );
}

// ─── Step 2 – Verify Code ─────────────────────────────────────────────────────
function VerifyStep({
    email,
    onSuccess,
}: {
    email: string;
    onSuccess: (token: string) => void;
}) {
    const t = useTranslations("auth");
    const verifyReset = useVerifyResetPassword();
    const forgotPassword = useForgotPassword();
    const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
    const [resendMsg, setResendMsg] = useState<string | null>(null);
    const code = digits.join("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6) return;
        await verifyReset.mutateAsync(
            { email, code },
            {
                onSuccess: (res) => {
                    // الـ token بييجي مباشرة على الـ root object
                    const token = (res as unknown as { passwordResetToken: string }).passwordResetToken;
                    if (token) onSuccess(token);
                },
            }
        );
    };

    const handleResend = () => {
        setResendMsg(null);
        forgotPassword.mutate(
            { email },
            { onSuccess: () => setResendMsg(t("codeSent")) }
        );
    };

    const apiError = getApiError(verifyReset.error) ?? getApiError(forgotPassword.error);

    return (
        <>
            <div className="mb-6">
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "white", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {t("verifyEmailTitle")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("verifyEmailDesc")}{" "}
                    <span className="text-purple-300 font-semibold">{email}</span>
                </Typography>
            </div>

            {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{apiError}</Alert>}
            {resendMsg && <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>{resendMsg}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 2, display: "block", letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                    {t("verificationCode")}
                </Typography>

                <OtpInput value={digits} onChange={setDigits} disabled={verifyReset.isPending} />

                {/* Resend */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                        {t("didntReceiveCode")}{" "}
                        <Box
                            component="span"
                            onClick={!forgotPassword.isPending ? handleResend : undefined}
                            sx={{
                                color: "primary.main", fontWeight: 700,
                                cursor: forgotPassword.isPending ? "default" : "pointer",
                                "&:hover": { color: "#a78bfa" },
                                transition: "color 0.2s",
                                display: "inline-flex", alignItems: "center", gap: 0.5,
                            }}
                        >
                            {forgotPassword.isPending
                                ? <CircularProgress size={10} sx={{ color: "inherit" }} />
                                : t("resendCode")}
                        </Box>
                    </Typography>
                </Box>

                <Button
                    type="submit" fullWidth variant="contained"
                    disabled={verifyReset.isPending || code.length < 6}
                    size="large"
                    endIcon={!verifyReset.isPending && <ArrowForwardIcon />}
                    sx={{ py: 1.5, fontSize: 16 }}
                >
                    {verifyReset.isPending
                        ? <CircularProgress size={22} sx={{ color: "inherit" }} />
                        : t("verifyCode")}
                </Button>
            </Box>
        </>
    );
}

// ─── Step 3 – New Password ────────────────────────────────────────────────────
function ResetStep({
    passwordResetToken,
    onSuccess,
}: {
    passwordResetToken: string;
    onSuccess: () => void;
}) {
    const t = useTranslations("auth");
    const tv = useTranslations("validation");
    const resetPassword = useResetPassword();
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const formik = useFormik({
        initialValues: { newPassword: "", confirmPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string().min(8, tv("passwordMin")).required(tv("required")),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], tv("passwordMatch"))
                .required(tv("required")),
        }),
        onSubmit: async ({ newPassword }) => {
            await resetPassword.mutateAsync(
                { passwordResetToken, newPassword },
                { onSuccess }
            );
        },
    });

    return (
        <>
            <div className="mb-8">
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "white", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {t("resetPasswordTitle")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("resetPasswordDesc")}
                </Typography>
            </div>

            {getApiError(resetPassword.error) && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
                    {getApiError(resetPassword.error)}
                </Alert>
            )}

            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                {/* New Password */}
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block", letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                    {t("newPassword")}
                </Typography>
                <TextField
                    fullWidth id="newPassword" name="newPassword"
                    placeholder="••••••••"
                    type={showPass ? "text" : "password"}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    disabled={resetPassword.isPending}
                    slotProps={{
                        input: {
                            startAdornment: (<InputAdornment position="start"><LockOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} /></InputAdornment>),
                            endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPass(s => !s)} edge="end" size="small">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>),
                        },
                    }}
                    sx={{ mb: 2 }}
                />

                {/* Confirm Password */}
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block", letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                    {t("confirmPassword")}
                </Typography>
                <TextField
                    fullWidth id="confirmPassword" name="confirmPassword"
                    placeholder="••••••••"
                    type={showConfirm ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    disabled={resetPassword.isPending}
                    slotProps={{
                        input: {
                            startAdornment: (<InputAdornment position="start"><LockOutlinedIcon sx={{ color: "text.secondary", fontSize: 18 }} /></InputAdornment>),
                            endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirm(s => !s)} edge="end" size="small">{showConfirm ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>),
                        },
                    }}
                    sx={{ mb: 3 }}
                />

                <Button
                    type="submit" fullWidth variant="contained"
                    disabled={resetPassword.isPending} size="large"
                    endIcon={!resetPassword.isPending && <ArrowForwardIcon />}
                    sx={{ py: 1.5, fontSize: 16 }}
                >
                    {resetPassword.isPending
                        ? <CircularProgress size={22} sx={{ color: "inherit" }} />
                        : t("resetPassword")}
                </Button>
            </Box>
        </>
    );
}

// ─── Step 4 – Success ─────────────────────────────────────────────────────────
function SuccessStep() {
    const t = useTranslations("auth");
    return (
        <Box sx={{ textAlign: "center" }}>
            <Box sx={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 3,
            }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "white", mb: 1, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                {t("passwordResetSuccess")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                {t("passwordResetSuccessDesc")}
            </Typography>
            <Button
                fullWidth variant="contained" size="large"
                component={Link} href="/login"
                endIcon={<ArrowForwardIcon />}
                sx={{ py: 1.5, fontSize: 16 }}
            >
                {t("signIn")}
            </Button>
        </Box>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Step = "email" | "verify" | "reset" | "success";

export function ForgotPasswordPage() {
    const t = useTranslations("auth");
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [passwordResetToken, setPasswordResetToken] = useState("");

    const stepIndex: Record<Step, number> = { email: 0, verify: 1, reset: 2, success: 3 };
    const progressSteps: Step[] = ["email", "verify", "reset"];

    return (
        <>
            {/* Mobile header */}
            <div className="flex items-center justify-between mb-8 lg:hidden">
                <div className="flex items-center gap-2">
                    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="22" stroke="url(#fp-grad)" strokeWidth="1.5" fill="rgba(124,58,237,0.15)" />
                        <text x="24" y="30" textAnchor="middle" fill="url(#fp-grad)" fontSize="18" fontFamily="system-ui" fontWeight="bold">N</text>
                        <defs>
                            <linearGradient id="fp-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#a78bfa" />
                                <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="text-white font-bold">NexusGold</span>
                </div>
                {step !== "success" && (
                    <Link href="/login" className="flex items-center gap-1 text-on-variant hover:text-white text-xs transition-colors">
                        <ArrowBackIcon sx={{ fontSize: 14 }} />
                        {t("backToLogin")}
                    </Link>
                )}
            </div>

            {/* Progress dots */}
            {step !== "success" && (
                <Box sx={{ display: "flex", gap: 1, mb: 6, justifyContent: { xs: "center", lg: "flex-start" } }}>
                    {progressSteps.map((s, i) => (
                        <Box key={s} sx={{
                            width: step === s ? 24 : 8, height: 8, borderRadius: 4,
                            background: step === s
                                ? "linear-gradient(90deg,#a78bfa,#7c3aed)"
                                : stepIndex[step] > i ? "#7c3aed" : "rgba(255,255,255,0.15)",
                            transition: "all 0.3s ease",
                        }} />
                    ))}
                </Box>
            )}

            {/* Form */}
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                {step === "email" && (
                    <EmailStep onSuccess={(em) => { setEmail(em); setStep("verify"); }} />
                )}
                {step === "verify" && (
                    <VerifyStep
                        email={email}
                        onSuccess={(token) => { setPasswordResetToken(token); setStep("reset"); }}
                    />
                )}
                {step === "reset" && (
                    <ResetStep
                        passwordResetToken={passwordResetToken}
                        onSuccess={() => setStep("success")}
                    />
                )}
                {step === "success" && <SuccessStep />}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <div className="flex justify-center gap-4 mb-2">
                    <span className="text-on-variant text-xs cursor-pointer hover:text-white transition-colors">{t("privacyPolicy")}</span>
                    <span className="text-on-variant text-xs cursor-pointer hover:text-white transition-colors">{t("termsOfService")}</span>
                    <span className="text-on-variant text-xs cursor-pointer hover:text-white transition-colors">{t("cookiePolicy")}</span>
                </div>
                <p className="text-on-variant text-xs">{t("copyright")}</p>
            </div>
        </>
    );
}