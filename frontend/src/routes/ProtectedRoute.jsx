import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../utils/context/auth";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    return !isAuthenticated ? <Navigate to='/login' replace /> : <Outlet />;
};

export default ProtectedRoute;