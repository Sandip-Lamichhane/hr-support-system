import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context/auth";

// `allowedRoles` is an optional prop (array of lowercase role strings)
const ProtectedRoute = ({ allowedRoles } = {}) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (allowedRoles && allowedRoles.length > 0) {
        const role = (user?.role || "").toString().toLowerCase();
        if (!allowedRoles.map(r => r.toString().toLowerCase()).includes(role)) {
            // If user is authenticated but not authorized for this route,
            // redirect to their appropriate dashboard.
            if (role === 'admin' || role === 'administrator') return <Navigate to="/admin/dashboard" replace />;
            return <Navigate to="/employee/dashboard" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;