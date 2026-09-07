"use client";
import { Link } from "@/lib/i18n/navigation";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlined";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MARKETPLACE_LINKS = [
    { label: "Games",      href: "/marketplace/games" },
    { label: "Boosting",   href: "/boosting" },
    { label: "Currency",   href: "/marketplace/currency" },
];

const COMPANY_LINKS = [
    { label: "About Us",  href: "/about" },
    { label: "Support",   href: "/support" },
    { label: "Terms",     href: "/terms" },
];

const PAYMENT_METHODS = ["VISA", "MASTERCARD", "BITCOIN"];

// ─── Reusable column ──────────────────────────────────────────────────────────
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <Typography
                variant="caption"
                sx={{
                    color: "white",
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    fontSize: 11,
                    display: "block",
                    mb: 2,
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    );
}

// ─── Footer link ──────────────────────────────────────────────────────────────
function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            style={{
                display: "block",
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
        >
            {label}
        </Link>
    );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export function MarketplaceFooter() {
    return (
        <footer
            style={{
                background: "rgb(6, 14, 32)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                marginTop: "auto",
            }}
        >
            <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 4 }, pt: 6, pb: 4 }}>

                {/* ── Top row ── */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 5, md: 8 },
                    mb: 5,
                }}>

                    {/* Brand column */}
                    <Box sx={{ maxWidth: 220, flexShrink: 0 }}>
                        {/* Logo */}
                        <Link href="/marketplace" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 12 }}>
                            <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                                <circle cx="24" cy="24" r="22" stroke="url(#fg)" strokeWidth="1.5" fill="rgba(124,58,237,0.15)" />
                                <text x="24" y="30" textAnchor="middle" fill="url(#fg)" fontSize="18" fontFamily="system-ui" fontWeight="bold">N</text>
                                <defs>
                                    <linearGradient id="fg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#a78bfa" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: "white" }}>
                                NexusGold
                            </span>
                        </Link>

                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7 }}>
                            The world&apos;s most trusted marketplace for virtual assets, currency, and high-tier accounts.
                        </Typography>
                    </Box>

                    {/* Nav columns */}
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 4, md: 8 },
                        flex: 1,
                    }}>
                        <FooterColumn title="Marketplace">
                            {MARKETPLACE_LINKS.map((l) => <FooterLink key={l.href} {...l} />)}
                        </FooterColumn>

                        <FooterColumn title="Company">
                            {COMPANY_LINKS.map((l) => <FooterLink key={l.href} {...l} />)}
                        </FooterColumn>

                        <FooterColumn title="Social">
                            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "rgba(255,255,255,0.4)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 2,
                                        width: 34, height: 34,
                                        "&:hover": { color: "white", borderColor: "#7c3aed", bgcolor: "rgba(124,58,237,0.15)" },
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <AlternateEmailIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "rgba(255,255,255,0.4)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 2,
                                        width: 34, height: 34,
                                        "&:hover": { color: "white", borderColor: "#7c3aed", bgcolor: "rgba(124,58,237,0.15)" },
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        </FooterColumn>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3 }} />

                {/* ── Bottom row ── */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                }}>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                        © 2024 NexusGold. All rights reserved.
                    </Typography>

                    {/* Payment badges */}
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                        {PAYMENT_METHODS.map((method) => (
                            <Box
                                key={method}
                                sx={{
                                    px: 1.5, py: 0.4,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 1.5,
                                    color: "rgba(255,255,255,0.35)",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: 0.5,
                                }}
                            >
                                {method}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </footer>
    );
}