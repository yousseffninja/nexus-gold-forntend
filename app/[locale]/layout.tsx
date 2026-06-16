import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { MuiThemeProvider } from "@/lib/theme/MuiThemeProvider";
import { ReactQueryProvider } from "@/lib/api/ReactQueryProvider";
import { AuthProvider } from "@/lib/auth/AuthContext";
// 1. Import the AppRouterCacheProvider
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "../globals.css";

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: LocaleLayoutProps) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "ar")) {
        notFound();
    }

    const messages = await getMessages();
    const direction = locale === "ar" ? "rtl" : "ltr";

    return (
        <html lang={locale} dir={direction}>
        <body>
        {/* 2. Wrap everything with the Cache Provider, passing a direction-based key */}
        <AppRouterCacheProvider options={{ key: `mui${direction}` }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <MuiThemeProvider direction={direction}>
                    <ReactQueryProvider>
                        <AuthProvider>{children}</AuthProvider>
                    </ReactQueryProvider>
                </MuiThemeProvider>
            </NextIntlClientProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}