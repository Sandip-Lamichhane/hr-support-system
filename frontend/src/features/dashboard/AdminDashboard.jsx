import React, { useState, useEffect } from 'react';
import { Users, Ticket, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Calendar, MessageSquare, UserCheck, Activity, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState('week');
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersRes, ticketsRes, deptsRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/tickets'),
                    api.get('/departments')
                ]);

                setUsers(usersRes.data);
                setTickets(ticketsRes.data);
                setDepartments(deptsRes.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper function to safely get status
    const getTicketStatus = (ticket) => {
        if (!ticket || !ticket.status) return '';
        return String(ticket.status).toLowerCase().trim();
    };

    // Calculate statistics
    const stats = [
        {
            label: 'Total Employees',
            value: users?.length ? users.length.toString() : '0',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'from-sky-400 to-blue-500',
            bgColor: 'bg-sky-50'
        },
        {
            label: 'Open Tickets',
            value: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'open').length.toString() : '0',
            change: '-8%',
            trend: 'down',
            icon: Ticket,
            color: 'from-amber-400 to-orange-500',
            bgColor: 'bg-amber-50'
        },
        {
            label: 'Pending Reviews',
            value: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'in progress').length.toString() : '0',
            change: '+5%',
            trend: 'up',
            icon: Clock,
            color: 'from-purple-400 to-violet-500',
            bgColor: 'bg-purple-50'
        },
        {
            label: 'Resolved Today',
            value: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'resolved').length.toString() : '0',
            change: '+15%',
            trend: 'up',
            icon: CheckCircle,
            color: 'from-emerald-400 to-green-500',
            bgColor: 'bg-emerald-50'
        },
    ];

    // Get recent tickets (last 5)
    const recentTickets = (tickets && Array.isArray(tickets)) ? tickets.slice(0, 5).map(ticket => ({
        id: ticket.ticket_number,
        employee: ticket.assignee?.name || 'Unassigned',
        issue: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        time: ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'N/A',
        avatar: (ticket.assignee?.name || 'U').substring(0, 2).toUpperCase()
    })) : [];

    // Get recently added employees (last 3)
    const recentEmployees = (users && Array.isArray(users)) ? users
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3)
        .map(user => ({
            name: user.name || 'Unknown',
            position: 'Employee',
            department: (departments && Array.isArray(departments)) ? (departments.find(d => d.id === user.department_id)?.name || 'N/A') : 'N/A',
            status: user.status || 'Active',
            joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A',
            avatar: (user.name || 'U').substring(0, 2).toUpperCase()
        })) : [];

    // Calculate department overview with ticket percentages
    const deptOverview = (departments && Array.isArray(departments)) ? (() => {
        const totalTickets = (tickets && Array.isArray(tickets)) ? tickets.length : 0;
        return departments.map(dept => {
            const deptTicketCount = (tickets && Array.isArray(tickets)) ? tickets.filter(t => t.department_id === dept.id).length : 0;
            const ticketPercentage = totalTickets > 0 ? Math.round((deptTicketCount / totalTickets) * 100) : 0;
            return {
                dept: dept.name || 'Unknown',
                employees: users && Array.isArray(users) ? users.filter(u => u.department_id === dept.id).length : 0,
                tickets: deptTicketCount,
                ticketPercentage: ticketPercentage,
                color: ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-sky-500'][departments.indexOf(dept) % 5]
            };
        });
    })() : [];

    // Ticket statistics by status
    const ticketStats = [
        { label: 'Open', icon: Ticket, color: 'bg-blue-100', iconColor: 'text-blue-600', count: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'open').length : 0 },
        { label: 'In Progress', icon: Clock, color: 'bg-purple-100', iconColor: 'text-purple-600', count: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'in progress').length : 0 },
        { label: 'Resolved', icon: CheckCircle, color: 'bg-emerald-100', iconColor: 'text-emerald-600', count: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'resolved').length : 0 },
        { label: 'Closed', icon: XCircle, color: 'bg-red-100', iconColor: 'text-red-600', count: (tickets && Array.isArray(tickets)) ? tickets.filter(t => getTicketStatus(t) === 'closed').length : 0 },
    ];

    const quickActions = [
        { label: 'Add Employee', icon: Users, color: 'bg-sky-500 hover:bg-sky-600' },
        { label: 'Review Tickets', icon: Ticket, color: 'bg-amber-500 hover:bg-amber-600' },
        { label: 'Generate Report', icon: Activity, color: 'bg-purple-500 hover:bg-purple-600' },
        { label: 'Schedule Meeting', icon: Calendar, color: 'bg-emerald-500 hover:bg-emerald-600' },
    ];

    const getPriorityColor = (priority) => {
        if (!priority) return 'bg-gray-100 text-gray-700';
        switch (priority.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-amber-100 text-amber-700';
            case 'low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-100 text-gray-700';
        switch (status.toLowerCase()) {
            case 'open': return 'bg-blue-100 text-blue-700';
            case 'in progress': return 'bg-purple-100 text-purple-700';
            case 'assigned': return 'bg-amber-100 text-amber-700';
            case 'resolved': return 'bg-emerald-100 text-emerald-700';
            case 'closed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

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
                        {ticketStats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                                            <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{stat.label}</p>
                                            <p className="text-xs text-gray-500">
                                                {stat.label === 'Open' && 'Awaiting review'}
                                                {stat.label === 'In Progress' && 'Being worked on'}
                                                {stat.label === 'Resolved' && 'Completed'}
                                                {stat.label === 'Closed' && 'Marked invalid'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-800">{stat.count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Department Overview */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Department Overview</h2>
                    <div className="space-y-4">
                        {deptOverview.slice(0, 5).map((dept, idx) => (
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
                                            style={{ width: `${deptOverview.length > 0 ? (dept.count / Math.max(...deptOverview.map(d => d.count), 1)) * 100 : 0}%` }}
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