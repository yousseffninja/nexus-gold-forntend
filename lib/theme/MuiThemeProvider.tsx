"use client";

import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { useServerInsertedHTML } from "next/navigation";

function createEmotionCache(direction: "ltr" | "rtl") {
    return createCache({
        key: direction === "rtl" ? "muirtl" : "muiltr",
        stylisPlugins:
            direction === "rtl" ? [prefixer, stylisRTLPlugin] : [prefixer],
    });
}

function buildTheme(direction: "ltr" | "rtl") {
    return createTheme({
        direction,
        palette: {
            mode: "dark",
            primary: {
                main: "#d4950e",
                light: "#f5de94",
                dark: "#94560c",
                contrastText: "#0a0a0a",
            },
            secondary: {
                main: "#f5de94",
                contrastText: "#0a0a0a",
            },
            background: {
                default: "#0a0a0a",
                paper: "#1a1a1a",
            },
            text: {
                primary: "#f4f4f4",
                secondary: "#a3a3a3",
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
                        borderRadius: 4,
                        textTransform: "none",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                    },
                    contained: {
                        "&.MuiButton-containedPrimary": {
                            background:
                                "linear-gradient(135deg, #b8760a 0%, #d4950e 50%, #e9b430 100%)",
                            color: "#0a0a0a",
                            boxShadow: "0 4px 15px rgba(212, 149, 14, 0.4)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #94560c 0%, #b8760a 50%, #d4950e 100%)",
                                boxShadow: "0 6px 20px rgba(212, 149, 14, 0.6)",
                            },
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 4,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#d4950e",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#d4950e",
                            },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#d4950e",
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundImage:
                            "linear-gradient(145deg, rgba(26,26,26,0.95) 0%, rgba(10,10,10,0.98) 100%)",
                        border: "1px solid rgba(212, 149, 14, 0.15)",
                        borderRadius: 12,
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: { borderRadius: 8 },
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
    const [cache] = useState(() => createEmotionCache(direction));
    const theme = useMemo(() => buildTheme(direction), [direction]);

    useServerInsertedHTML(() => {
        const inserted = [];
        for (const [key, value] of Object.entries(cache.inserted)) {
            if (value) {
                inserted.push(
                    <style
                        key={key}
                        data-emotion={`${cache.key}-${key}`}
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                );
            }
        }
        return <>{inserted}</>;
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}