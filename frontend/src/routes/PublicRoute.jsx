import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context/auth";

const PublicRoute = () => {
    const {isAuthenticated } = useAuth();
    return isAuthenticated? <Navigate to = '/admin/dashboard' replace />: <Outlet />;
};

export default PublicRoute;