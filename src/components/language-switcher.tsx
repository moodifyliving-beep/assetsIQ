"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, type Locale } from "@/i18n/request";
import { Globe } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const languageNames: Record<Locale, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
    pt: "Português",
    hi: "हिन्दी",
    ru: "Русский",
};

const languageFlags: Record<Locale, string> = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ar: "🇸🇦",
    pt: "🇵🇹",
    hi: "🇮🇳",
    ru: "🇷🇺",
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const currentLocale = (params?.locale as Locale) || "en";

    const switchLocale = (newLocale: Locale) => {
        startTransition(() => {
            // Remove the current locale from the pathname
            const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
            // If path is just "/", keep it as is, otherwise ensure it starts with "/"
            const cleanPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
            // Navigate to the new locale
            router.push(`/${newLocale}${cleanPath}`);
            router.refresh();
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                    disabled={isPending}
                >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">
                        {languageFlags[currentLocale]} {languageNames[currentLocale]}
                    </span>
                    <span className="sm:hidden">
                        {languageFlags[currentLocale]}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => switchLocale(locale)}
                        className={`cursor-pointer ${
                            currentLocale === locale ? "bg-accent" : ""
                        }`}
                    >
                        <span className="mr-2">{languageFlags[locale]}</span>
                        <span>{languageNames[locale]}</span>
                        {currentLocale === locale && (
                            <span className="ml-auto">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

