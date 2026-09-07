import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, userApi } from "@/lib/api/endpoints";
import { useAuth } from "@/lib/auth/AuthContext";

export function useSignIn() {
    const { login } = useAuth();
    return useMutation({
        mutationFn: authApi.signIn,
        onSuccess: (data) => {
            if (data.accessToken) {
                login(data.accessToken, data.refreshToken);
            }
        },
    });
}

export function useSignUp() {
    return useMutation({ mutationFn: authApi.signUp });
}

export function useSendVerificationCode() {
    return useMutation({ mutationFn: authApi.sendVerificationCode });
}

export function useVerifyEmail() {
    return useMutation({ mutationFn: authApi.verifyEmail });
}

export function useForgotPassword() {
    return useMutation({ mutationFn: authApi.forgotPassword });
}

export function useResetPassword() {
    return useMutation({ mutationFn: authApi.resetPassword });
}

export function useVerifyResetPassword() {
    return useMutation({ mutationFn: authApi.verifyResetPassword });
}

export function useChangePassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userApi.changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });
}