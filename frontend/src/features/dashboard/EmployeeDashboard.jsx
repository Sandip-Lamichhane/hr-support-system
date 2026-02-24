import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, User, Bell, LogOut, ChevronRight, Zap, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function EmployeeDashboard() {
    const [employee, setEmployee] = useState(null);
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const recentDocuments = [
        { id: 1, title: 'Company Handbook', date: 'Jan 5', type: 'PDF' },
        { id: 2, title: 'Health Insurance Plan', date: 'Dec 28', type: 'PDF' },
        { id: 3, title: 'Code of Conduct', date: 'Dec 15', type: 'Document' }
    ];

    const announcements = [
        { id: 1, title: 'New Office Hours Policy', date: '2 days ago' },
        { id: 2, title: 'Employee Wellness Program Updates', date: '1 week ago' }
    ];

    // Fetch current user and their tasks
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                
                // Fetch current user
                const userResponse = await api.get('/me');
                const userData = userResponse.data;
                
                // Get department name from user's department relationship
                const departmentName = userData.departments?.name || 'N/A';
                
                setEmployee({
                    name: userData.name,
                    position: userData.role || 'Employee',
                    department: departmentName,
                    profileImage: `https://ui-avatars.com/api/?name=${userData.name.replace(/ /g, '+')}&background=random&color=fff`,
                    email: userData.email,
                    joinDate: userData.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
                    status: userData.status
                });

                // Fetch tickets assigned to the current user
                const ticketsResponse = await api.get('/tickets', {
                    params: {
                        assigned_to: userData.id,
                        per_page: 10
                    }
                });
                
                const tickets = ticketsResponse.data.data || [];
                // Filter and format tickets for display
                const formattedTasks = tickets.slice(0, 5).map(ticket => ({
                    id: ticket.id,
                    title: ticket.title,
                    dueDate: ticket.due_date ? new Date(ticket.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date',
                    priority: ticket.priority || 'medium'
                }));
                
                setUpcomingTasks(formattedTasks);
                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
                // Set empty state on error
                setEmployee(null);
                setUpcomingTasks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const quickStats = employee ? [
        { label: 'Department', value: employee.department, icon: Calendar, color: 'from-blue-500 to-blue-600' },
        { label: 'Status', value: employee.status, icon: Clock, color: 'from-emerald-500 to-emerald-600' },
        { label: 'Open Tasks', value: upcomingTasks.length, icon: FileText, color: 'from-purple-500 to-purple-600' }
    ] : [];


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin">
                        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                    <p className="mt-4 text-slate-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !employee) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <p className="text-slate-600">{error || 'Failed to load employee data'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Profile Section */}
                <div className="mb-8 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-slate-900 mb-1">{employee.name}</h2>
                                <p className="text-lg text-blue-600 font-medium mb-2">{employee.position}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <User size={16} /> {employee.department}
                                    </span>
                                    <span>•</span>
                                    <span>{employee.email}</span>
                                    <span>•</span>
                                    <span>Joined {employee.joinDate}</span>
                                </div>
                            </div>
                            <img
                                src={employee.profileImage}
                                alt={employee.name}
                                className="w-24 h-24 rounded-xl object-cover shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {quickStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} className="text-white" />
                                </div>
                                <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tasks */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Upcoming Tasks */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-500" />
                                    Upcoming Tasks
                                </h3>
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                                    View All <ChevronRight size={16} />
                                </a>
                            </div>
                            <div className="space-y-4">
                                {upcomingTasks.length > 0 ? (
                                    upcomingTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-transparent rounded-lg border border-slate-100 hover:border-slate-200 transition-colors group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer" />
                                                <div>
                                                    <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{task.title}</p>
                                                    <p className="text-sm text-slate-500">Due: {task.dueDate}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500">
                                        <p>No tasks assigned yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Documents and Announcements */}
                    <div className="space-y-8">
                        {/* Recent Documents */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText size={24} className="text-blue-600" />
                                Documents
                            </h3>
                            <div className="space-y-3">
                                {recentDocuments.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="p-4 bg-gradient-to-r from-slate-50 to-transparent rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{doc.title}</p>
                                                <p className="text-xs text-slate-500 mt-1">{doc.date}</p>
                                            </div>
                                            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">{doc.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Bell size={24} className="text-purple-600" />
                                Announcements
                            </h3>
                            <div className="space-y-4">
                                {announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-lg border border-purple-100 hover:border-purple-300 transition-colors cursor-pointer group"
                                    >
                                        <p className="font-medium text-slate-900 group-hover:text-purple-600 transition-colors text-sm">{announcement.title}</p>
                                        <p className="text-xs text-slate-500 mt-2">{announcement.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t border-slate-200/50 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-600">
                    <p>© 2024 Employee Portal. All rights reserved.</p>
                </div>
            </footer>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}