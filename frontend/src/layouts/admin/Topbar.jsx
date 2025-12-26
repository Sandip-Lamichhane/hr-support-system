import { Menu, Search, Bell, User } from "lucide-react";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
            <div className="flex items-center justify-between h-full px-4">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-sky-50 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-lg hidden sm:block">
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-xl mx-4 hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    <button className="relative p-2 hover:bg-sky-50 rounded-lg">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="w-px h-6 bg-gray-200 mx-2"></div>

                    <button className="flex items-center gap-2 p-2 hover:bg-sky-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="hidden lg:block text-sm font-medium text-gray-700">
                            Admin
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;