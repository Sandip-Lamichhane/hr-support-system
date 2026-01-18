import React, { useState } from 'react';
import { Search, Plus, Download } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import UserStats from '../components/UserStats';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import { EMPTY_FORM, STATUS_FILTER_OPTIONS } from '../constants/UserForm';

const UserManagement = () => {
    // Custom hook for user management
    const {
        users,
        departments,
        loading,
        error,
        submitting,
        fetchUsers,
        createUser,
        updateUser
    } = useUsers();

    // Local UI state
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({ ...EMPTY_FORM });

    // Filter users based on search and status
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === 'all' ||
            user.status?.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    // Modal handlers
    const openCreateModal = () => {
        setIsEditMode(false);
        setEditingUserId(null);
        setShowPassword(false);
        setFormData({ ...EMPTY_FORM });
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setIsEditMode(true);
        setEditingUserId(user.id);
        setShowPassword(false);
        setFormData({
            ...EMPTY_FORM,
            name: user.name,
            email: user.email,
            department_id: String(user.department_id),
            role: user.role,
            status: user.status,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ ...EMPTY_FORM });
        setIsEditMode(false);
        setEditingUserId(null);
        setShowPassword(false);
    };

    const handleSubmit = async () => {
        const success = isEditMode
            ? await updateUser(editingUserId, formData)
            : await createUser(formData);

        if (success) {
            closeModal();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Selection handlers
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
                    <h3 className="text-red-800 font-semibold mb-2">Error Loading Users</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchUsers}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                        Try Again
                    </button>
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

            {/* Stats */}
            <UserStats users={users} />

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
                            {STATUS_FILTER_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button
                            onClick={openCreateModal}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                {/* Selection Actions */}
                {selectedUsers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {selectedUsers.length} user(s) selected
                        </span>
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
                <UserTable
                    users={filteredUsers}
                    departments={departments}
                    selectedUsers={selectedUsers}
                    onToggleSelection={toggleUserSelection}
                    onToggleSelectAll={toggleSelectAll}
                    onEdit={openEditModal}
                    onDelete={(user) => console.log('Delete user:', user)}
                />
            </div>

            {/* User Modal */}
            <UserModal
                show={showModal}
                isEditMode={isEditMode}
                formData={formData}
                departments={departments}
                showPassword={showPassword}
                submitting={submitting}
                onClose={closeModal}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
            />
        </div>
    );
};

export default UserManagement;