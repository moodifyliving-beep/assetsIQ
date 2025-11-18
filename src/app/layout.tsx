import { ReactNode } from 'react';
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/contexts/language-context";

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-[#101010] text-foreground font-base antialiased overflow-x-hidden dark",
                    base.variable,
                    heading.variable,
                )}
            >
                <ClerkProvider>
                    <LanguageProvider>
                        <Toaster richColors theme="dark" position="bottom-center" />
                        {children}
                    </LanguageProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
