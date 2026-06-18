import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#7c3aed",
                    hover: "#6d28d9",
                    glow: "rgba(124, 58, 237, 0.4)",
                },
                surface: {
                    lowest: "#060e20",
                    low: "#0b1326",
                    mid: "#131b2e",
                    bright: "#31394d",
                },
                on: {
                    surface: "#ffffff",
                    variant: "#94a3b8",
                },
            },
            backgroundImage: {
                "nexus-gradient": "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
            },
            borderRadius: {
                nexus: "12px",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;