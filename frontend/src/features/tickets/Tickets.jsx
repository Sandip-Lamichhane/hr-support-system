import React, { useState } from 'react';
import { Search, Download, Plus, Edit2, Trash2, MoreVertical, Clock, CheckCircle, AlertCircle, XCircle, Calendar, User, Filter } from 'lucide-react';

const TicketManagement = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [assignToId, setAssignToId] = useState('');

    const employees = [
        { id: 1, name: 'John Smith', role: 'Admin' },
        { id: 2, name: 'Sarah Johnson', role: 'Editor' },
        { id: 3, name: 'Michael Brown', role: 'User' },
        { id: 4, name: 'David Wilson', role: 'User' }
    ];

    const [tickets, setTickets] = useState([
        {
            id: 'TKT-001',
            title: 'Login Authentication Issue',
            description: 'Users unable to login with correct credentials',
            status: 'open',
            priority: 'high',
            assignedTo: 'John Smith',
            assignedToId: 1,
            createdBy: 'Admin',
            createdDate: '2024-12-15',
            dueDate: '2024-12-20',
            category: 'Technical'
        },
        {
            id: 'TKT-002',
            title: 'Update User Profile Feature',
            description: 'Need to add profile picture upload functionality',
            status: 'in-progress',
            priority: 'medium',
            assignedTo: 'Sarah Johnson',
            assignedToId: 2,
            createdBy: 'Admin',
            createdDate: '2024-12-14',
            dueDate: '2024-12-25',
            category: 'Feature Request'
        },
        {
            id: 'TKT-003',
            title: 'Database Performance Optimization',
            description: 'Slow query performance on reports page',
            status: 'resolved',
            priority: 'high',
            assignedTo: 'Michael Brown',
            assignedToId: 3,
            createdBy: 'Admin',
            createdDate: '2024-12-10',
            dueDate: '2024-12-15',
            category: 'Technical'
        },
        {
            id: 'TKT-004',
            title: 'Email Notification Not Working',
            description: 'Users not receiving password reset emails',
            status: 'open',
            priority: 'critical',
            assignedTo: null,
            assignedToId: null,
            createdBy: 'Admin',
            createdDate: '2024-12-16',
            dueDate: '2024-12-18',
            category: 'Bug'
        },
        {
            id: 'TKT-005',
            title: 'Add Dark Mode Support',
            description: 'Implement dark theme across the application',
            status: 'in-progress',
            priority: 'low',
            assignedTo: 'David Wilson',
            assignedToId: 4,
            createdBy: 'Admin',
            createdDate: '2024-12-12',
            dueDate: '2024-12-30',
            category: 'Feature Request'
        }
    ]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: 'Technical',
        dueDate: '',
        assignedToId: ''
    });

    const statusConfig = {
        open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: Clock },
        'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
        resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
        closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700', icon: XCircle }
    };

    const priorityConfig = {
        critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
        high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
        medium: { label: 'Medium', color: 'bg-blue-100 text-blue-700' },
        low: { label: 'Low', color: 'bg-gray-100 text-gray-700' }
    };

    const stats = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in-progress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length
    };

    const filteredTickets = tickets.filter(ticket => {
        if (activeFilter === 'all') return true;
        return ticket.status === activeFilter;
    });

    const handleCreateTicket = () => {
        if (!formData.title || !formData.description) return;

        const newTicket = {
            id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
            title: formData.title,
            description: formData.description,
            status: 'open',
            priority: formData.priority,
            assignedTo: formData.assignedToId ? employees.find(e => e.id === parseInt(formData.assignedToId))?.name : null,
            assignedToId: formData.assignedToId ? parseInt(formData.assignedToId) : null,
            createdBy: 'Admin',
            createdDate: new Date().toISOString().split('T')[0],
            dueDate: formData.dueDate,
            category: formData.category
        };

        setTickets([newTicket, ...tickets]);
        setFormData({
            title: '',
            description: '',
            priority: 'medium',
            category: 'Technical',
            dueDate: '',
            assignedToId: ''
        });
        setShowCreateModal(false);
    };

    const handleAssignTicket = () => {
        if (!selectedTicket || !assignToId) return;

        const employee = employees.find(e => e.id === parseInt(assignToId));
        setTickets(tickets.map(t =>
            t.id === selectedTicket.id
                ? { ...t, assignedTo: employee?.name, assignedToId: employee?.id, status: 'in-progress' }
                : t
        ));
        setShowAssignModal(false);
        setSelectedTicket(null);
        setAssignToId('');
    };

    const handleDeleteTicket = (ticketId) => {
        setTickets(tickets.filter(t => t.id !== ticketId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
                        <p className="text-gray-600 mt-1">Track, assign, and manage support tickets</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-600 text-sm">Total Tickets</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-600 text-sm">Open</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.open}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-600 text-sm">In Progress</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.inProgress}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-600 text-sm">Resolved</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.resolved}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search tickets..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <select
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <Plus className="w-4 h-4" />
                                Add Ticket
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket ID</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTickets.map((ticket) => {
                                    const StatusIcon = statusConfig[ticket.status].icon;
                                    return (
                                        <tr key={ticket.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-blue-600">{ticket.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{ticket.title}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[ticket.status].color}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {statusConfig[ticket.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityConfig[ticket.priority].color}`}>
                                                    {priorityConfig[ticket.priority].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {ticket.assignedTo ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                                            {ticket.assignedTo.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <span className="text-sm text-gray-900">{ticket.assignedTo}</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedTicket(ticket);
                                                            setShowAssignModal(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                    >
                                                        Assign
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4" />
                                                    {ticket.dueDate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTicket(ticket.id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Create New Ticket</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter ticket title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe the issue or request"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Technical">Technical</option>
                                        <option value="Bug">Bug</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Support">Support</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                                    <select
                                        value={formData.assignedToId}
                                        onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Unassigned</option>
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateTicket}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Create Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAssignModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Assign Ticket</h2>
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    setSelectedTicket(null);
                                    setAssignToId('');
                                }}
                                className="text-gray-400 hover:text-gray-600">

                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assign To
                                </label>
                                <select
                                    value={assignToId}
                                    onChange={(e) => setAssignToId(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.name} ({emp.role})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedTicket && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Ticket</p>
                                    <p className="font-medium text-gray-900">{selectedTicket.title}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedTicket.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    setSelectedTicket(null);
                                    setAssignToId('');
                                }}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignTicket}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Assign Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketManagement;