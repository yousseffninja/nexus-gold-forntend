"use client";

import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

function createEmotionCache(direction: "ltr" | "rtl") {
    return createCache({
        key: direction === "rtl" ? "muirtl" : "muiltr",
        stylisPlugins:
            direction === "rtl" ? [prefixer, stylisRTLPlugin] : [prefixer],
        prepend: true,
    });
}

function buildTheme(direction: "ltr" | "rtl") {
    return createTheme({
        direction,
        palette: {
            mode: "dark",
            primary: {
                main: "#7c3aed",
                light: "#a78bfa",
                dark: "#4c1d95",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#a78bfa",
                contrastText: "#ffffff",
            },
            background: {
                default: "#0b1326",
                paper: "#131b2e",
            },
            text: {
                primary: "#ffffff",
                secondary: "#94a3b8",
            },
            error: {
                main: "#ef4444",
            },
            success: {
                main: "#22c55e",
            },
        },
        typography: {
            fontFamily: "system-ui, sans-serif",
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        textTransform: "none",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                    },
                    contained: {
                        background:
                            "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
                        color: "#ffffff",
                        boxShadow: "0 0 15px rgba(124, 58, 237, 0.3)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #6d28d9 0%, #3b1578 100%)",
                            boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)",
                        },
                        "&:active": {
                            transform: "scale(0.95)",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 12,
                            backgroundColor: "#060e20",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#7c3aed",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#7c3aed",
                                boxShadow: "0 0 0 1px #7c3aed",
                            },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#7c3aed",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#31394d",
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "#131b2e",
                        border: "1px solid #31394d",
                        borderRadius: 12,
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: { borderRadius: 12 },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: "#0b1326",
                        borderInlineEnd: "1px solid #31394d",
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(11, 19, 38, 0.9)",
                        borderBottom: "1px solid #31394d",
                    },
                },
            },
        },
    });
}

interface MuiThemeProviderProps {
    direction: "ltr" | "rtl";
    children: React.ReactNode;
}

export function MuiThemeProvider({
                                     direction,
                                     children,
                                 }: MuiThemeProviderProps) {
    const cache = useMemo(() => createEmotionCache(direction), [direction]);
    const theme = useMemo(() => buildTheme(direction), [direction]);

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}