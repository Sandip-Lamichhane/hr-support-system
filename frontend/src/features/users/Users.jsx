import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Trash2, MoreVertical, Mail, Phone, Check, X, Calendar, Users } from 'lucide-react';

const UserManagement = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('active');

    const users = [
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 234-567-8900', role: 'Admin', status: 'Active', joined: '2024-01-15', avatar: 'JS' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234-567-8901', role: 'Editor', status: 'Active', joined: '2024-02-20', avatar: 'SJ' },
        { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', phone: '+1 234-567-8902', role: 'User', status: 'Active', joined: '2024-03-10', avatar: 'MB' },
        { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', phone: '+1 234-567-8903', role: 'User', status: 'Inactive', joined: '2024-01-25', avatar: 'ED' },
        { id: 5, name: 'David Wilson', email: 'david.w@example.com', phone: '+1 234-567-8904', role: 'Editor', status: 'Active', joined: '2024-04-05', avatar: 'DW' },
        { id: 6, name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '+1 234-567-8905', role: 'User', status: 'Pending', joined: '2024-12-01', avatar: 'LA' },
        { id: 7, name: 'Robert Taylor', email: 'robert.t@example.com', phone: '+1 234-567-8906', role: 'Admin', status: 'Active', joined: '2023-11-15', avatar: 'RT' },
        { id: 8, name: 'Jennifer Martinez', email: 'jennifer.m@example.com', phone: '+1 234-567-8907', role: 'User', status: 'Active', joined: '2024-05-20', avatar: 'JM' },
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const toggleUserSelection = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-emerald-100 text-emerald-700';
            case 'inactive': return 'bg-gray-100 text-gray-700';
            case 'pending': return 'bg-amber-100 text-amber-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case 'admin': return 'bg-purple-100 text-purple-700';
            case 'editor': return 'bg-blue-100 text-blue-700';
            case 'user': return 'bg-sky-100 text-sky-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
                <p className="text-gray-500">Manage and monitor all users in your system</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Total Users</p>
                            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Active</p>
                            <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.status === 'Active').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Inactive</p>
                            <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.status === 'Inactive').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                            <X className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Pending</p>
                            <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.status === 'Pending').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all">
                            <Plus className="w-4 h-4" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>
                {selectedUsers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-sm text-gray-600">{selectedUsers.length} user(s) selected</span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all">
                                Delete Selected
                            </button>
                            <button className="px-4 py-2 text-sm bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-all">
                                Export Selected
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-400"
                                    />
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleUserSelection(user.id)}
                                            className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-400"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-4 h-4" />
                                                <span className="hidden lg:inline">{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="w-4 h-4" />
                                                <span>{user.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-600">Showing {filteredUsers.length} of {users.length} users</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-all">
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg text-sm hover:shadow-lg transition-all">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;