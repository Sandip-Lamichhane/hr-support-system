import React, { useState } from 'react';
import { Users, Ticket, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Calendar, MessageSquare, UserCheck, Activity, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState('week');

    // Sample data
    const stats = [
        {
            label: 'Total Employees',
            value: '248',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'from-sky-400 to-blue-500',
            bgColor: 'bg-sky-50'
        },
        {
            label: 'Open Tickets',
            value: '34',
            change: '-8%',
            trend: 'down',
            icon: Ticket,
            color: 'from-amber-400 to-orange-500',
            bgColor: 'bg-amber-50'
        },
        {
            label: 'Pending Reviews',
            value: '17',
            change: '+5%',
            trend: 'up',
            icon: Clock,
            color: 'from-purple-400 to-violet-500',
            bgColor: 'bg-purple-50'
        },
        {
            label: 'Resolved Today',
            value: '28',
            change: '+15%',
            trend: 'up',
            icon: CheckCircle,
            color: 'from-emerald-400 to-green-500',
            bgColor: 'bg-emerald-50'
        },
    ];

    const recentTickets = [
        { id: 'TKT-1045', employee: 'Sarah Johnson', issue: 'Payroll Discrepancy', priority: 'High', status: 'Open', time: '10 mins ago', avatar: 'SJ' },
        { id: 'TKT-1044', employee: 'Michael Chen', issue: 'Leave Request Approval', priority: 'Medium', status: 'In Progress', time: '1 hour ago', avatar: 'MC' },
        { id: 'TKT-1043', employee: 'Emily Rodriguez', issue: 'Benefits Enrollment', priority: 'Low', status: 'Open', time: '2 hours ago', avatar: 'ER' },
        { id: 'TKT-1042', employee: 'James Wilson', issue: 'System Access Issue', priority: 'High', status: 'Assigned', time: '3 hours ago', avatar: 'JW' },
        { id: 'TKT-1041', employee: 'Lisa Anderson', issue: 'Document Request', priority: 'Medium', status: 'Open', time: '5 hours ago', avatar: 'LA' },
    ];

    const recentEmployees = [
        { name: 'David Martinez', position: 'Software Engineer', department: 'Engineering', status: 'Active', joinDate: '2024-12-10', avatar: 'DM' },
        { name: 'Rachel Green', position: 'HR Manager', department: 'Human Resources', status: 'Active', joinDate: '2024-12-08', avatar: 'RG' },
        { name: 'Tom Holland', position: 'Marketing Specialist', department: 'Marketing', status: 'Active', joinDate: '2024-12-05', avatar: 'TH' },
    ];

    const quickActions = [
        { label: 'Add Employee', icon: Users, color: 'bg-sky-500 hover:bg-sky-600' },
        { label: 'Review Tickets', icon: Ticket, color: 'bg-amber-500 hover:bg-amber-600' },
        { label: 'Generate Report', icon: Activity, color: 'bg-purple-500 hover:bg-purple-600' },
        { label: 'Schedule Meeting', icon: Calendar, color: 'bg-emerald-500 hover:bg-emerald-600' },
    ];

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-amber-100 text-amber-700';
            case 'low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'open': return 'bg-blue-100 text-blue-700';
            case 'in progress': return 'bg-purple-100 text-purple-700';
            case 'assigned': return 'bg-amber-100 text-amber-700';
            case 'resolved': return 'bg-emerald-100 text-emerald-700';
            case 'closed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">HR Dashboard</h1>
                        <p className="text-gray-500">Welcome back! Here's your HR overview for today.</p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, idx) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={idx}
                                className={`${action.color} text-white p-4 rounded-lg transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2`}
                            >
                                <Icon className="w-6 h-6" />
                                <span className="text-sm font-medium">{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Ticket Statistics */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Ticket Statistics</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Ticket className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Open</p>
                                    <p className="text-xs text-gray-500">Awaiting review</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">34</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">In Progress</p>
                                    <p className="text-xs text-gray-500">Being worked on</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Resolved</p>
                                    <p className="text-xs text-gray-500">This week</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">89</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Irrelevant</p>
                                    <p className="text-xs text-gray-500">Marked invalid</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">7</span>
                        </div>
                    </div>
                </div>

                {/* Department Overview */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Department Overview</h2>
                    <div className="space-y-4">
                        {[
                            { dept: 'Engineering', count: 85, tickets: 12, color: 'bg-blue-500' },
                            { dept: 'Sales', count: 52, tickets: 8, color: 'bg-emerald-500' },
                            { dept: 'Marketing', count: 38, tickets: 5, color: 'bg-purple-500' },
                            { dept: 'Human Resources', count: 24, tickets: 3, color: 'bg-amber-500' },
                            { dept: 'Operations', count: 49, tickets: 6, color: 'bg-sky-500' },
                        ].map((dept, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-800">{dept.dept}</span>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-gray-600">{dept.count} employees</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-amber-600">{dept.tickets} tickets</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`${dept.color} h-2 rounded-full transition-all`}
                                            style={{ width: `${(dept.count / 85) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Tickets */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Support Tickets</h2>
                            <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">View All</button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentTickets.map((ticket) => (
                            <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                        {ticket.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 text-sm">{ticket.employee}</p>
                                                <p className="text-sm text-gray-600 truncate">{ticket.issue}</p>
                                            </div>
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <span className="text-xs text-gray-500">{ticket.id}</span>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                            <span className="text-xs text-gray-400 ml-auto">{ticket.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Employees */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Recently Added Employees</h2>
                            <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">View All</button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentEmployees.map((employee, idx) => (
                            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                        {employee.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800">{employee.name}</p>
                                        <p className="text-sm text-gray-600">{employee.position}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">{employee.department}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">Joined {employee.joinDate}</span>
                                        </div>
                                    </div>
                                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                        {employee.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <button className="w-full py-2 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                            View All Employees
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;