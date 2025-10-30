import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store"; // ⚠️ öz store yoluna görə dəyiş
import { type ReactElement } from "react";

export interface ProtectedRouteProps {
    roles: string[]; // İcazə verilən rollar (məs: ["admin", "superadmin"])
    children?: ReactElement | ReactElement[];
}

export const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
    const user = useSelector((state: RootState) => state.user);

    // Əgər login olmayıbsa, login səhifəsinə yönləndir
    if (!user.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Əgər rolu icazə verilmiş rolların içində deyilsə
    if (!roles.includes(user.role ?? "")) {
        return <Navigate to="/" replace />;
    }

    // Əgər bu route-un içində nested route-lar varsa (Outlet istifadə olunur)
    return children ? <>{children}</> : <Outlet />;
};
