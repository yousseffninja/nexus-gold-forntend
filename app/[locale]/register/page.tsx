import { RegisterPage } from "@/features/auth/RegisterPage";
import {AuthLayout} from "@/components/layout/AuthLayout";
export default function Page() {
    return (
        <AuthLayout>
            <RegisterPage />
        </AuthLayout>
    );
}