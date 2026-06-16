"use client";

import { useTranslations } from "next-intl";

interface LogoProps {
    size?: "sm" | "md" | "lg";
}

export function NexusGoldLogo({ size = "md" }: LogoProps) {
    const t = useTranslations("common");
    const sizes = {
        sm: { icon: 24, text: "text-lg" },
        md: { icon: 32, text: "text-2xl" },
        lg: { icon: 48, text: "text-4xl" },
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
                <polygon
                    points="24,4 44,14 44,34 24,44 4,34 4,14"
                    fill="none"
                    stroke="url(#goldGrad)"
                    strokeWidth="2"
                />
                <text
                    x="24"
                    y="29"
                    textAnchor="middle"
                    fill="url(#goldGrad)"
                    fontSize="16"
                    fontFamily="Georgia, serif"
                    fontWeight="bold"
                >
                    N
                </text>
                <defs>
                    <linearGradient
                        id="goldGrad"
                        x1="0"
                        y1="0"
                        x2="48"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#b8760a" />
                        <stop offset="50%" stopColor="#f5de94" />
                        <stop offset="100%" stopColor="#d4950e" />
                    </linearGradient>
                </defs>
            </svg>
            <span
                className={`gold-shimmer font-bold ${text} tracking-widest uppercase`}
                style={{ fontFamily: "Georgia, serif" }}
            >
        {t("nexusGold")}
      </span>
        </div>
    );
}