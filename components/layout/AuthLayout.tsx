import { NexusGoldLogo } from "@/components/ui/NexusGoldLogo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-obsidian-950 relative overflow-hidden flex flex-col">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold-600 opacity-5 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-500 opacity-3 blur-[100px]" />
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1440 900"
                    preserveAspectRatio="xMidYMid slice"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="0" y1="450" x2="1440" y2="450"
                        stroke="rgba(212,149,14,0.04)" strokeWidth="1"
                    />
                    <line
                        x1="720" y1="0" x2="720" y2="900"
                        stroke="rgba(212,149,14,0.04)" strokeWidth="1"
                    />
                    <circle
                        cx="720" cy="450" r="300"
                        stroke="rgba(212,149,14,0.05)" strokeWidth="1"
                    />
                    <circle
                        cx="720" cy="450" r="500"
                        stroke="rgba(212,149,14,0.03)" strokeWidth="1"
                    />
                </svg>
            </div>

            {/* Top bar */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gold-600/10">
                <NexusGoldLogo size="sm" />
                <LanguageSwitcher />
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-md">{children}</div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-4 text-obsidian-400 text-xs border-t border-gold-600/10">
                © 2026 Nexus Gold. All rights reserved.
            </footer>
        </div>
    );
}