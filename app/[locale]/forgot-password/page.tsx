import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage";
import {AuthLayout} from "@/components/layout/AuthLayout";

export default function Page() {
    return (
        <AuthLayout>
            <ForgotPasswordPage />
        </AuthLayout>
);
}