import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "ar"],
    defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;