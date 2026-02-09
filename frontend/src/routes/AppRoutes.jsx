import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/website/Layout";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../layouts/admin/AdminLayout";
import AdminDashboard from "../features/dashboard/AdminDashboard";
import UserManagement from "../features/users/pages/UserManagement";
import Tickets from "../features/tickets/pages/Tickets";
import ProtectedRoute from "./ProtectedRoute";
import Department from "../features/settings/Department";
import Category from "../features/settings/Category";
import PublicRoute from "./PublicRoute";
import EmployeeLayout from "../layouts/employee/EmployeeLayout";
import EmployeeDashboard from "../features/dashboard/EmployeeDashboard";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Website */}
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>

            {/* Auth */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "administrator"]} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="settings/department" element={<Department />} />
                    <Route path="settings/category" element={<Category />} />
                </Route>
            </Route>

            {/* Protected Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/employee" element={<EmployeeLayout />}>
                    <Route path="dashboard" element={<EmployeeDashboard />} />

                </Route>
            </Route>

        </Routes>
    );
}