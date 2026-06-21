"use client";

import { VerifyEmailPage } from "@/features/auth/VerifyEmailPage";
import {AuthLayout} from "@/components/layout/AuthLayout";

export default function Page() {
    return (
        <AuthLayout>
            <VerifyEmailPage />
        </AuthLayout>
    );
}