"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { NexusGoldLogo } from "@/components/ui/NexusGoldLogo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link } from "@/lib/i18n/navigation";
import {
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    Divider,
    Avatar,
    Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const DRAWER_WIDTH = 240;

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const t = useTranslations("nav");
    const { user, logout, hasRole } = useAuth();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const navItems = [
        { label: t("dashboard"), icon: <DashboardIcon />, href: "/dashboard" },
        ...(hasRole("ADMIN")
            ? [{ label: t("admin"), icon: <AdminPanelSettingsIcon />, href: "/admin" }]
            : []),
        {
            label: t("changePassword"),
            icon: <LockIcon />,
            href: "/settings/change-password",
        },
    ];

    const drawerContent = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                borderInlineEnd: "1px solid rgba(212,149,14,0.15)",
            }}
        >
            <Box sx={{ p: 3, borderBottom: "1px solid rgba(212,149,14,0.1)" }}>
                <NexusGoldLogo size="sm" />
            </Box>

            <List sx={{ flex: 1, pt: 2 }}>
                {navItems.map((item) => (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            sx={{
                                mx: 1,
                                borderRadius: 1,
                                "&:hover": {
                                    bgcolor: "rgba(212,149,14,0.08)",
                                    "& .MuiListItemIcon-root": { color: "primary.main" },
                                    "& .MuiListItemText-primary": { color: "primary.main" },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "text.secondary", minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                sx={{
                                    "& .MuiListItemText-primary": {
                                        fontSize: 14,
                                        fontWeight: 500,
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ borderColor: "rgba(212,149,14,0.1)" }} />
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 1,
                        "&:hover": {
                            bgcolor: "rgba(239,68,68,0.08)",
                            "& .MuiListItemIcon-root": { color: "error.main" },
                            "& .MuiListItemText-primary": { color: "error.main" },
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: "text.secondary", minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("logout")}
                        sx={{
                            "& .MuiListItemText-primary": {
                                fontSize: 14,
                                fontWeight: 500,
                            },
                        }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            {/* Sidebar desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        border: "none",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Sidebar mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Main */}
            <Box
                sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
            >
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        bgcolor: "rgba(10,10,10,0.9)",
                        backdropFilter: "blur(12px)",
                        borderBottom: "1px solid rgba(212,149,14,0.1)",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={() => setMobileOpen(true)}
                            sx={{
                                mr: 2,
                                display: { md: "none" },
                                color: "text.primary",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flex: 1 }} />
                        <LanguageSwitcher />
                        <Tooltip title={user?.email ?? ""}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    ml: 2,
                                    bgcolor: "primary.dark",
                                    color: "primary.light",
                                    fontSize: 14,
                                    fontWeight: 700,
                                }}
                            >
                                {user?.email?.[0]?.toUpperCase() ?? "U"}
                            </Avatar>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}