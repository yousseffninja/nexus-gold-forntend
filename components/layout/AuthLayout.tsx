import { useTranslations } from "next-intl";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations("layout");
  const tc = useTranslations("common");
  return (
    <div className="min-h-screen flex bg-surface-low">
      {/* Left Side - Background Section */}
      <div
        className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col  p-10"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="url(#pg)"
              strokeWidth="1.5"
              fill="rgba(124,58,237,0.15)"
            />

            <text
              x="24"
              y="30"
              textAnchor="middle"
              fill="url(#pg)"
              fontSize="18"
              fontFamily="system-ui"
              fontWeight="bold"
            >
              N
            </text>

            <defs>
              <linearGradient
                id="pg"
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
            className="text-white text-2xl font-bold tracking-wide"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            {tc("nexusGold")}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 h-full w-full flex flex-col justify-center items-center">
          <h2
            className="text-white text-5xl font-bold mb-2"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            {tc("nexusGold")}
          </h2>

          <p className="text-purple-300 text-2x mb-4">
            {t("eliteGamingHub")}
          </p>

          <div className="flex items-center gap-2 bg-black/25 p-2 rounded-full stroke-green-700 stroke-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">
              {t("liveMarketplaceActive")}
            </span>
          </div>

        </div>
        <p className="text-white/40 text-xs mt-6">{t("est2026")}</p>
      </div>

      {/* Right Side - Auth Content */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between bg-surface-low px-8 py-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}