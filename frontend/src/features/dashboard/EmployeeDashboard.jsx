import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, User, Bell, LogOut, ChevronRight, Zap } from 'lucide-react';

export default function EmployeeDashboard() {



    // Mock data
    const employee = {
        name: 'Sarah Johnson',
        position: 'Senior Product Designer',
        department: 'Design',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        email: 'sarah.johnson@company.com',
        joinDate: 'Jan 15, 2021'
    };

    const leaveBalance = {
        available: 12,
        used: 8,
        pending: 2,
        total: 22
    };

    const attendance = {
        present: 18,
        absent: 1,
        leave: 2,
        workFromHome: 5
    };

    const upcomingTasks = [
        { id: 1, title: 'Q1 Performance Review', dueDate: 'Feb 15', priority: 'high' },
        { id: 2, title: 'Project Kickoff Meeting', dueDate: 'Feb 10', priority: 'medium' },
        { id: 3, title: 'Update Portfolio', dueDate: 'Feb 28', priority: 'low' }
    ];

    const recentDocuments = [
        { id: 1, title: 'Company Handbook', date: 'Jan 5', type: 'PDF' },
        { id: 2, title: 'Health Insurance Plan', date: 'Dec 28', type: 'PDF' },
        { id: 3, title: 'Code of Conduct', date: 'Dec 15', type: 'Document' }
    ];

    const announcements = [
        { id: 1, title: 'New Office Hours Policy', date: '2 days ago' },
        { id: 2, title: 'Employee Wellness Program Updates', date: '1 week ago' }
    ];

    const quickStats = [
        { label: 'Leave Balance', value: `${leaveBalance.available}/${leaveBalance.total}`, icon: Calendar, color: 'from-blue-500 to-blue-600' },
        { label: 'This Month Attendance', value: `${attendance.present}/${attendance.present + attendance.absent}`, icon: Clock, color: 'from-emerald-500 to-emerald-600' },
        { label: 'Pending Requests', value: leaveBalance.pending, icon: FileText, color: 'from-purple-500 to-purple-600' }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Profile Section */}
                <div className="mb-8 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <img
                                src={employee.profileImage}
                                alt={employee.name}
                                className="w-24 h-24 rounded-xl object-cover shadow-md"
                            />
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
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                Edit Profile
                            </button>
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
                    {/* Left Column - Tasks and Leave */}
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
                                {upcomingTasks.map((task) => (
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
                                ))}
                            </div>
                        </div>

                        {/* Leave Request */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Leave Balance</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-sm font-medium text-slate-700">Available Days</span>
                                        <span className="text-2xl font-bold text-slate-900">{leaveBalance.available} days</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${(leaveBalance.available / leaveBalance.total) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Used: {leaveBalance.used} days | Pending: {leaveBalance.pending} days</p>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                                    Request Leave
                                </button>
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