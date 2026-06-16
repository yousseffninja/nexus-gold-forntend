import axios, {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8082";

// ─── Token storage helpers ─────────────────────────────────────────────────
const TOKEN_KEY = "ng_access_token";
const REFRESH_KEY = "ng_refresh_token";

export const tokenStorage = {
    getAccess: (): string | null =>
        typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
    setAccess: (token: string): void => {
        if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
    },
    getRefresh: (): string | null =>
        typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null,
    setRefresh: (token: string): void => {
        if (typeof window !== "undefined") localStorage.setItem(REFRESH_KEY, token);
    },
    clear: (): void => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_KEY);
        }
    },
};

// ─── Create axios instance ─────────────────────────────────────────────────
export const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 15_000,
});

// ─── Request interceptor ───────────────────────────────────────────────────
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenStorage.getAccess();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response interceptor — handle 401 / refresh ──────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token!);
        }
    });
    failedQueue = [];
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            const refreshToken = tokenStorage.getRefresh();

            if (!refreshToken) {
                tokenStorage.clear();
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("auth:logout"));
                }
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post<{
                    accessToken: string;
                    refreshToken: string;
                }>(`${BASE_URL}/api/v1/auth/refresh`, {
                    token: refreshToken,
                });

                tokenStorage.setAccess(data.accessToken);
                tokenStorage.setRefresh(data.refreshToken);
                apiClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
                processQueue(null, data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                tokenStorage.clear();
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("auth:logout"));
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;