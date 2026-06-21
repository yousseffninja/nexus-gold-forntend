import apiClient from "./ client";
import type {
    ApiResponse,
    SignUpRequest,
    SignInRequest,
    SignInResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    SendVerificationCodeRequest,
    VerifyEmailRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ChangePasswordRequest,
    VerifyResetPasswordRequest,
} from "@/types/api";

export const authApi = {
    signUp: (data: SignUpRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/auth/signup", data)
            .then((r) => r.data),

    signIn: (data: SignInRequest) =>
        apiClient
            .post<SignInResponse>("/api/v1/auth/signin", data)
            .then((r) => r.data),

    refresh: (data: RefreshTokenRequest) =>
        apiClient
            .post<RefreshTokenResponse>("/api/v1/auth/refresh", data)
            .then((r) => r.data),

    sendVerificationCode: (data: SendVerificationCodeRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/auth/send-verification-code", data)
            .then((r) => r.data),

    verifyEmail: (data: VerifyEmailRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/auth/verify-email", data)
            .then((r) => r.data),

    forgotPassword: (data: ForgotPasswordRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/auth/forget-password", data)
            .then((r) => r.data),

    resetPassword: (data: ResetPasswordRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/auth/reset-password", data)
            .then((r) => r.data),


    verifyResetPassword: (data: VerifyResetPasswordRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/auth/verify-reset-code", data)
            .then((r) => r.data),
};

export const userApi = {
    getDashboard: () =>
        apiClient.get<string>("/api/v1/user/dashboard").then((r) => r.data),

    changePassword: (data: ChangePasswordRequest) =>
        apiClient
            .post<ApiResponse>("/api/v1/user/change-password", data)
            .then((r) => r.data),
};

export const adminApi = {
    getDashboard: () =>
        apiClient.get<string>("/api/v1/admin/dashboard").then((r) => r.data),
};