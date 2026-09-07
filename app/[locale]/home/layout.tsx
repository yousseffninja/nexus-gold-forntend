import { MarketplaceHeader } from "@/components/layout/Header";
import { MarketplaceFooter } from "@/components/layout/Footer";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <MarketplaceHeader />
            <main style={{ flex: 1 }}>{children}</main>
            <MarketplaceFooter />
        </div>
    );
}