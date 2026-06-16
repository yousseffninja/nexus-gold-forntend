"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { Button, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("nav");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleSwitch = (code: string) => {
        setAnchorEl(null);
        router.replace(pathname, { locale: code });
    };

    return (
        <>
            <Button
                size="small"
                startIcon={<LanguageIcon />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    textTransform: "none",
                }}
                aria-label={t("language")}
            >
                {LANGUAGES.find((l) => l.code === locale)?.label}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: "background.paper",
                            border: "1px solid rgba(212,149,14,0.2)",
                        },
                    },
                }}
            >
                {LANGUAGES.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        selected={lang.code === locale}
                        onClick={() => handleSwitch(lang.code)}
                        sx={{
                            "&.Mui-selected": { color: "primary.main" },
                        }}
                    >
                        {lang.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}