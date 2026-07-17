import { LoginPage } from "@/features/auth/LoginPage";
import {AuthLayout} from "@/components/layout/AuthLayout";
export default function Page() {
    return (
        <AuthLayout>
            <LoginPage />
        </AuthLayout>
    );
}