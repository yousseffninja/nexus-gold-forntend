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
                gold: {
                    50: "#fdf9ec",
                    100: "#faf0cc",
                    200: "#f5de94",
                    300: "#efc75c",
                    400: "#e9b430",
                    500: "#d4950e",
                    600: "#b8760a",
                    700: "#94560c",
                    800: "#794410",
                    900: "#663913",
                    950: "#3c1e06",
                },
                obsidian: {
                    DEFAULT: "#0a0a0a",
                    50: "#f4f4f4",
                    100: "#e8e8e8",
                    200: "#c8c8c8",
                    300: "#a3a3a3",
                    400: "#737373",
                    500: "#525252",
                    600: "#404040",
                    700: "#2a2a2a",
                    800: "#1a1a1a",
                    900: "#111111",
                    950: "#0a0a0a",
                },
            },
            animation: {
                "shimmer": "shimmer 2.5s infinite",
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
            },
            keyframes: {
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
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