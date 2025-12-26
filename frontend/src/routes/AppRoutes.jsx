import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/website/Layout";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../layouts/admin/AdminLayout";
import AdminDashboard from "../features/dashboard/AdminDashboard";
import UserManagement from "../features/users/Users";
import Tickets from "../features/tickets/Tickets";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Website */}
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="users" element={<UserManagement />} />
                </Route>
            </Route>
        </Routes>
    );
}