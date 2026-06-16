import { useQuery } from "@tanstack/react-query";
import { userApi, adminApi } from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/api/queryKeys";

export function useUserDashboard() {
    return useQuery({
        queryKey: queryKeys.dashboard.user,
        queryFn: userApi.getDashboard,
    });
}

export function useAdminDashboard() {
    return useQuery({
        queryKey: queryKeys.dashboard.admin,
        queryFn: adminApi.getDashboard,
    });
}