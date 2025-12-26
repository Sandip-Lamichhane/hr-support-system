import {
    Home,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Ticket,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();

    const menuItems = [
        { path: "/admin/dashboard", icon: Home, label: "Dashboard", end: true },
        { path: "/admin/tickets", icon: Ticket, label: "Tickets" },
        { path: "/admin/users", icon: Users, label: "Users" },
        // { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
        { path: "/admin/settings", icon: Settings, label: "Settings" },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log('Login Failed:', error);
        } finally {
            localStorage.clear();
            navigate('/login');
        }
    }

    return (
        <div
            className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 shadow-lg ${sidebarOpen ? "w-64" : "w-20"
                }`}
        >
            <div className="flex flex-col h-full">

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                {sidebarOpen && (
                                    <span className="text-sm font-medium">{item.label}</span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg rounded-lg">
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
