"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useSendVerificationCode, useVerifyEmail } from "@/features/auth/hooks";
import {
    Button,
    Alert,
    CircularProgress,
    Typography,
    Box,
    TextField,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export function VerifyEmailPage() {
    const t = useTranslations("auth");
    const router = useRouter();
    const sendCode = useSendVerificationCode();
    const verifyEmail = useVerifyEmail();
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const hasSentCodeRef = useRef(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("verifyEmail");
        if (storedEmail && !hasSentCodeRef.current) {
            setEmail(storedEmail);
            sendCode.mutate({ email: storedEmail });
            hasSentCodeRef.current = true;
        }
    }, [sendCode]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(0, 1);
        }
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const newCode = [...code];
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);
        const nextEmptyIndex = newCode.findIndex((c) => c === "");
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async () => {
        const fullCode = code.join("");
        if (!email || fullCode.length !== 6) {
            return;
        }
        await verifyEmail.mutateAsync({ email, code: fullCode });
        localStorage.removeItem("verifyEmail");
        router.push("/login");
    };

    const apiError =
        (sendCode.error as AxiosError<ApiResponse>)?.response?.data?.message ??
        (verifyEmail.error as AxiosError<ApiResponse>)?.response?.data?.message ??
        null;

    if (!email) {
        return (
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                    No email found. Please sign up first.
                </Alert>
            </div>
        );
    }

    return (
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
                    {t("verifyEmailTitle")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("verifyEmailDesc")}
                </Typography>
            </div>

            {apiError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                    {apiError}
                </Alert>
            )}

            <Box>
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 2, display: "block" }}>
                    {t("verificationCode")}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                    {code.map((digit, index) => (
                        <TextField
                            key={index}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            variant="outlined"
                            slotProps={{
                                htmlInput: {
                                    maxLength: 1,
                                    style: {
                                        textAlign: "center",
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        padding: "12px",
                                    },
                                },
                            }}
                            sx={{
                                width: 50,
                                height: 60,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                            disabled={verifyEmail.isPending}
                        />
                    ))}
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={verifyEmail.isPending}
                    size="large"
                    endIcon={!verifyEmail.isPending && <BoltIcon />}
                    onClick={handleSubmit}
                    sx={{ mb: 3, py: 1.5, fontSize: 16 }}
                >
                    {verifyEmail.isPending ? (
                        <CircularProgress size={22} sx={{ color: "inherit" }} />
                    ) : (
                        t("verifyEmail")
                    )}
                </Button>
            </Box>
        </div>
    );
}