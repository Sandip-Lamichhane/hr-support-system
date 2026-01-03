import {
    Home,
    Users,
    Settings,
    LogOut,
    Ticket,
    Building2,
    ChevronDown,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { useState } from "react";

const Sidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openMenu, setOpenMenu] = useState(null);

    const menuItems = [
        { path: "/admin/dashboard", icon: Home, label: "Dashboard", end: true },
        { path: "/admin/tickets", icon: Ticket, label: "Tickets" },
        { path: "/admin/users", icon: Users, label: "Users" },
        {
            label: "Settings",
            icon: Settings,
            children: [
                {
                    path: "/admin/settings/department",
                    icon: Building2,
                    label: "Department",
                },
            ],
        },
    ];

    const isChildActive = (children) =>
        children?.some((child) =>
            location.pathname.startsWith(child.path)
        );

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <div
            className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 shadow-lg ${sidebarOpen ? "w-64" : "w-20"
                }`}
        >
            <div className="flex flex-col h-full">
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const hasChildren = !!item.children;
                        const activeParent = hasChildren && isChildActive(item.children);

                        // =====================
                        // ITEMS WITHOUT CHILDREN
                        // =====================
                        if (!hasChildren) {
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md"
                                            : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                                        }`
                                    }
                                >
                                    <Icon className="w-5 h-5" />
                                    {sidebarOpen && (
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        }

                        // =====================
                        // ITEMS WITH CHILDREN
                        // =====================
                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() =>
                                        setOpenMenu(
                                            openMenu === item.label
                                                ? null
                                                : item.label
                                        )
                                    }
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${activeParent
                                            ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md"
                                            : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5" />
                                        {sidebarOpen && (
                                            <span className="text-sm font-medium">
                                                {item.label}
                                            </span>
                                        )}
                                    </div>

                                    {sidebarOpen && (
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${openMenu === item.label
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                        />
                                    )}
                                </button>

                                {/* SUB MENU */}
                                {openMenu === item.label && sidebarOpen && (
                                    <div className="ml-10 mt-2 space-y-1">
                                        {item.children.map((child) => {
                                            const ChildIcon = child.icon;

                                            return (
                                                <NavLink
                                                    key={child.path}
                                                    to={child.path}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${isActive
                                                            ? "bg-sky-100 text-sky-600 font-medium"
                                                            : "text-gray-500 hover:text-sky-600 hover:bg-sky-50"
                                                        }`
                                                    }
                                                >
                                                    <ChildIcon className="w-4 h-4" />
                                                    {child.label}
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* LOGOUT */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg"
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && (
                            <span className="text-sm font-medium">Logout</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;