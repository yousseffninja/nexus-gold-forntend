"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
    IconButton,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Avatar,
    Box,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const NAV_ITEMS = [
    { labelKey: "marketplace", href: "/home",     icon: <StorefrontOutlinedIcon fontSize="small" /> },
    { labelKey: "boosting",    href: "/boosting",  icon: <RocketLaunchOutlinedIcon fontSize="small" /> },
    { labelKey: "content",     href: "/content",   icon: <ArticleOutlinedIcon fontSize="small" /> },
    { labelKey: "help",        href: "/help",      icon: <HelpOutlineOutlinedIcon fontSize="small" /> },
];

function Logo() {
    return (
        <Link href="/home" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 22, color: "rgb(187, 167, 229)" }}>
                NexusGold
            </span>
        </Link>
    );
}

function SearchBar({ placeholder }: { placeholder: string }) {
    return (
        <Box sx={{
            display: "flex", alignItems: "center", gap: 0.75,
            bgcolor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2, px: 1.5, py: 0.5,
            width: { md: 180, lg: 240 },
            transition: "border-color 0.2s",
            "&:focus-within": { borderColor: "#7c3aed" },
        }}>
            <SearchIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }} />
            <input
                placeholder={placeholder}
                suppressHydrationWarning
                style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "white",
                    fontSize: 13,
                    flex: 1,
                    width: "100%",
                    fontFamily: "inherit",
                }}
            />
        </Box>
    );
}

function MobileSidebar({ open, onClose, cleanPath }: { open: boolean; onClose: () => void; cleanPath: string }) {
    const t = useTranslations("nav");

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: 240,
                        bgcolor: "rgb(34, 42, 61)",
                        borderRight: "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        flexDirection: "column",
                    },
                },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 2 }}>
                <Box>
                    <Logo />
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", mt: 0.25, display: "block" }}>
                        Premium Marketplace
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mx: 2 }} />

            <List sx={{ flex: 1, pt: 1 }}>
                {NAV_ITEMS.map(({ labelKey, href, icon }) => {
                    const isActive = cleanPath === href || cleanPath.startsWith(href + "/");
                    return (
                        <ListItem key={href} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={href}
                                onClick={onClose}
                                selected={isActive}
                                sx={{
                                    mx: 1, borderRadius: 2, mb: 0.5,
                                    "&.Mui-selected": {
                                        bgcolor: "rgba(124,58,237,0.2)",
                                        "& .MuiListItemIcon-root": { color: "#a78bfa" },
                                    },
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 36, color: isActive ? "#a78bfa" : "rgba(255,255,255,0.4)" }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={t(labelKey)}
                                    slotProps={{
                                        primary: {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: isActive ? 600 : 400,
                                                color: isActive ? "white" : "rgba(255,255,255,0.6)",
                                            },
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mx: 2 }} />

            <Box sx={{ p: 2 }}>
                <Button fullWidth variant="contained" sx={{ borderRadius: 2, py: 1, fontSize: 13, fontWeight: 700 }}>
                    Sell on NexusGold
                </Button>
            </Box>
        </Drawer>
    );
}

export function MarketplaceHeader() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const locale = useLocale();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const prefix = `/${locale}`;
    const cleanPath = pathname.startsWith(prefix)
        ? pathname.slice(prefix.length) || "/home"
        : pathname;

    return (
        <>
            <header style={{
                position: "sticky", top: 0, zIndex: 100,
                background: "rgb(23, 31, 51)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
                <Box sx={{
                    maxWidth: 1280, mx: "auto",
                    px: { xs: 2, md: 3 },
                    height: { xs: 52, md: 52 },
                    display: "flex", alignItems: "center", gap: 1.5,
                }}>

                    {/* Mobile hamburger */}
                    <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { md: "none" }, color: "white", p: 0.5 }}>
                        <MenuIcon fontSize="small" />
                    </IconButton>

                    <Logo />

                    {/* Desktop nav */}
                    <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", ml: 1.5 }}>
                        {NAV_ITEMS.map(({ labelKey, href }) => {
                            const isActive = cleanPath === href || cleanPath.startsWith(href + "/");
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    style={{
                                        fontSize: 13,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? "rgb(187, 167, 229)" : "rgba(255,255,255,0.55)",
                                        textDecoration: "none",
                                        padding: "16px 10px",
                                        borderBottom: isActive ? "2px solid rgb(187, 167, 229)" : "2px solid transparent",
                                        transition: "color 0.2s, border-color 0.2s",
                                        display: "inline-block",
                                    }}
                                >
                                    {t(labelKey)}
                                </Link>
                            );
                        })}
                    </Box>

                    {/* Search mobile — full bar */}
                    <Box sx={{ display: { xs: "flex", md: "none" }, flex: 1, mx: 1 }}>
                        <Box sx={{
                            display: "flex", alignItems: "center", gap: 0.75,
                            bgcolor: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 2, px: 1.5, py: 0.5,
                            width: "100%",
                            "&:focus-within": { borderColor: "#7c3aed" },
                        }}>
                            <SearchIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }} />
                            <input
                                placeholder="Search Marketplace..."
                                suppressHydrationWarning
                                style={{
                                    background: "none", border: "none", outline: "none",
                                    color: "white", fontSize: 13, flex: 1, width: "100%",
                                    fontFamily: "inherit",
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: { xs: "none", md: "flex" } }} />

                    {/* Search desktop */}
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <SearchBar placeholder="Search games, items..." />
                    </Box>

                    {/* Notifications */}
                    <IconButton sx={{ color: "rgba(255,255,255,0.5)", p: 0.75, "&:hover": { color: "white" } }}>
                        <Badge badgeContent={0} color="error">
                            <NotificationsNoneOutlinedIcon fontSize="small" />
                        </Badge>
                    </IconButton>

                    {/* Avatar */}
                    <IconButton component={Link} href="/profile" sx={{ p: 0.25 }}>
                        <Avatar sx={{
                            width: 28, height: 28,
                            background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                            fontSize: 12, fontWeight: 700,
                        }}>
                            U
                        </Avatar>
                    </IconButton>

                    {/* Sell button desktop */}
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            borderRadius: 2,
                            px: 2, py: 0.6,
                            fontSize: 12,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            minHeight: 32,
                        }}
                    >
                        Sell on NexusGold
                    </Button>
                </Box>
            </header>

            <MobileSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} cleanPath={cleanPath} />
        </>
    );
}