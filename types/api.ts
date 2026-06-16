// ─── Generic API Response ──────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

// ─── Auth ──────────────────────────────────────────────────────────────────
export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    displayName: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    token: string;
}

export interface RefreshTokenResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
}

export interface SendVerificationCodeRequest {
    email: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// ─── User / JWT ────────────────────────────────────────────────────────────
export type UserRole = "ADMIN" | "SELLER" | "USER";

export interface JwtPayload {
    sub: string;
    email?: string;
    roles?: UserRole[];
    role?: UserRole;
    exp: number;
    iat: number;
}

export interface AuthUser {
    email: string;
    roles: UserRole[];
}