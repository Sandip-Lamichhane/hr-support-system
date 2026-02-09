import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context/auth";

const PublicRoute = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Outlet />;

    const role = (user?.role || "").toString().toLowerCase();

    if (role === "admin" || role === "administrator") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/employee/dashboard" replace />;
};

export default PublicRoute;