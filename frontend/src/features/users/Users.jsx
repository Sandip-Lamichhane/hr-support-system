import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api';
import {
    Search, Plus, Download, Edit, Trash2, MoreVertical,
    Mail, Phone, Check, X, Calendar, Users, Eye, EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getDepartments } from '../../services/department.service';

const UserManagement = () => {
    // STATE
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department_id: '',
        role: '',
        status: '',
    });

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch users';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    //fetch departments
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await getDepartments();
            setDepartments(res.data);
        } catch (error) {
            console.error(error);
        }
    };

        //Create Users
    const handleAddUser = async () => {
        if(!formData.name || !formData.email || !formData.password || formData.department_id){
            toast.error('Please fill all required fields.');
            return;
        }

        try{

        }
    } 

    /* =======================
       HELPERS
    ======================= */
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === 'all' ||
            user.status?.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    const toggleUserSelection = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        setSelectedUsers(
            selectedUsers.length === filteredUsers.length
                ? []
                : filteredUsers.map(u => u.id)
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddUser = () => {
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Please fill in all required fields');
            return;
        }
        // createUser();
        toast.info('Create user function is commented out');
    };

    const getStatusColor = (status = '') => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-emerald-100 text-emerald-700';
            case 'inactive': return 'bg-gray-100 text-gray-700';
            case 'pending': return 'bg-amber-100 text-amber-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRoleColor = (role = '') => {
        switch (role.toLowerCase()) {
            case 'admin': return 'bg-purple-100 text-purple-700';
            case 'user': return 'bg-sky-100 text-sky-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                        <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Users</h3>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchUsers}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                            <p className="text-2xl font-bold text-gray-800">
                                {users.filter(u => u.status?.toLowerCase() === 'active').length}
                            </p>
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
                            <p className="text-2xl font-bold text-gray-800">
                                {users.filter(u => u.status?.toLowerCase() === 'inactive').length}
                            </p>
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
                            <p className="text-2xl font-bold text-gray-800">
                                {users.filter(u => u.status?.toLowerCase() === 'pending').length}
                            </p>
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
                        <button onClick={() => setShowModal(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all">
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
                {filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-2">No users found</p>
                        <p className="text-gray-400 text-sm">
                            {searchTerm || filterStatus !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Get started by adding your first user'}
                        </p>
                    </div>
                ) : (
                    <>
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
                                                        {user.avatar || user.name?.charAt(0).toUpperCase()}
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
                                                    {user.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Phone className="w-4 h-4" />
                                                            <span>{user.phone}</span>
                                                        </div>
                                                    )}
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
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.joined || 'N/A'}</td>
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
                    </>
                )}
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Add New User</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Smith"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <select
                                    name="department"
                                    value={formData.department_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddUser}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                >
                                    Create User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;