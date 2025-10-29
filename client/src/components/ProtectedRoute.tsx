import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
    allowedRoles: string[];
    redirectTo?: string;
}

const ProtectedRoute = ({ allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) => {
    const user = useSelector((state: any) => state.user);

    if (!user) {
        toast.error("Please log in first!");
        return <Navigate to={redirectTo} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        toast.error("Access Denied 🚫");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
