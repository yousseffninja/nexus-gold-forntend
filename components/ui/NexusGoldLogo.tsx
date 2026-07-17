"use client";

import { useTranslations } from "next-intl";

interface LogoProps {
    size?: "sm" | "md" | "lg";
}

export function NexusGoldLogo({ size = "md" }: LogoProps) {
    const t = useTranslations("common");
    const sizes = {
        sm: { icon: 28, text: "text-lg" },
        md: { icon: 36, text: "text-2xl" },
        lg: { icon: 52, text: "text-4xl" },
    };
    const { icon, text } = sizes[size];

    return (
        <div className="flex items-center gap-3">
            <svg
                width={icon}
                height={icon}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="url(#purpleGrad)"
                    opacity="0.15"
                />
                <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="url(#purpleGrad)"
                    strokeWidth="1.5"
                    fill="none"
                />
                <text
                    x="24"
                    y="30"
                    textAnchor="middle"
                    fill="url(#purpleGrad)"
                    fontSize="18"
                    fontFamily="system-ui, sans-serif"
                    fontWeight="bold"
                >
                    N
                </text>
                <defs>
                    <linearGradient
                        id="purpleGrad"
                        x1="0"
                        y1="0"
                        x2="48"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                </defs>
            </svg>
            <span
                className={`nexus-gradient-text font-bold ${text} tracking-wide`}
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
        {t("nexusGold")}
      </span>
        </div>
    );
}