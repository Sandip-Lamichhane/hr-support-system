import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getUsers } from '../../services/user.service';

const TicketManagement = () => {
    // State management
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Modal states
    const [modals, setModals] = useState({
        create: false,
        edit: false,
        assign: false,
    });

    // Data states
    const [tickets, setTickets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);

    // Form states
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category_id: '',
        department_id: '',
        due_date: '',
        assigned_to: '',
    });
    const [assignToId, setAssignToId] = useState('');


    const fetchEmployees = async () => {
        try {
            const { data } = await getUsers();
            setEmployees(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Error fetching employees!');
            console.error(error);
        }
    };

    //fetch employess
    useEffect(() => {
        fetchEmployees();
    }, []);






    // Configuration objects
    const statusConfig = {
        open: { label: 'Open', color: 'bg-blue-100 text-blue-700' },
        'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
        resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700' },
        closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700' },
    };

    const priorityConfig = {
        critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
        high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
        medium: { label: 'Medium', color: 'bg-blue-100 text-blue-700' },
        low: { label: 'Low', color: 'bg-gray-100 text-gray-700' },
    };

    // Helper functions
    const toggleModal = (modalName, state) => {
        setModals((prev) => ({ ...prev, [modalName]: state }));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            priority: 'medium',
            category_id: '',
            department_id: '',
            due_date: '',
            assigned_to: '',
        });
        setSelectedTicket(null);
        setAssignToId('');
    };

    const handleModalClose = (modalName) => {
        toggleModal(modalName, false);
        if (modalName !== 'assign') {
            resetForm();
        }
    };

    const getEmployeeName = (employeeId) => {
        const employee = employees.find((e) => e.id === employeeId);
        return employee?.name || 'Unknown';
    };

    const getEmployeeInitials = (employeeId) => {
        const name = getEmployeeName(employeeId);
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const getCategoryName = (categoryId) => {
        return categories.find((c) => c.id === categoryId)?.name || 'N/A';
    };

    const getDepartmentName = (departmentId) => {
        return departments.find((d) => d.id === departmentId)?.name || 'N/A';
    };

    // Calculate stats
    const stats = {
        total: tickets.length,
        open: tickets.filter((t) => t.status === 'open').length,
        inProgress: tickets.filter((t) => t.status === 'in-progress').length,
        resolved: tickets.filter((t) => t.status === 'resolved').length,
    };

    // Filter tickets
    const filteredTickets = tickets.filter((ticket) => {
        const matchesFilter = activeFilter === 'all' || ticket.status === activeFilter;
        const matchesSearch =
            ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.ticket_number?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Edit handler
    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket);
        setFormData({
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            category_id: ticket.category_id,
            department_id: ticket.department_id,
            due_date: ticket.due_date,
            assigned_to: ticket.assigned_to || '',
        });
        toggleModal('edit', true);
    };

    // Assign handler
    const handleAssignClick = (ticket) => {
        setSelectedTicket(ticket);
        toggleModal('assign', true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
                    <p className="text-gray-600 mt-1">Track, assign, and manage support tickets</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatCard label="Total Tickets" value={stats.total} bgColor="bg-blue-100" />
                    <StatCard label="Open" value={stats.open} bgColor="bg-blue-100" />
                    <StatCard label="In Progress" value={stats.inProgress} bgColor="bg-yellow-100" />
                    <StatCard label="Resolved" value={stats.resolved} bgColor="bg-green-100" />
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <SearchInput value={searchTerm} onChange={setSearchTerm} />
                            <StatusFilter value={activeFilter} onChange={setActiveFilter} />
                        </div>

                        <div className="flex items-center gap-3">
                            <RefreshButton loading={loading} />
                            <CreateButton onClick={() => toggleModal('create', true)} />
                        </div>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <TicketsTable
                            tickets={filteredTickets}
                            statusConfig={statusConfig}
                            priorityConfig={priorityConfig}
                            getEmployeeName={getEmployeeName}
                            getEmployeeInitials={getEmployeeInitials}
                            getCategoryName={getCategoryName}
                            getDepartmentName={getDepartmentName}
                            onEdit={handleEditClick}
                            onAssign={handleAssignClick}
                            onDelete={(id) => {
                                if (confirm('Are you sure you want to delete this ticket?')) {
                                    // Call delete API here
                                }
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            {modals.create && (
                <TicketFormModal
                    title="Create New Ticket"
                    formData={formData}
                    setFormData={setFormData}
                    categories={categories}
                    departments={departments}
                    employees={employees}
                    loading={loading}
                    onSubmit={() => {
                        // Call create API here
                        console.log('Create ticket:', formData);
                    }}
                    onClose={() => handleModalClose('create')}
                />
            )}

            {modals.edit && (
                <TicketFormModal
                    title="Edit Ticket"
                    formData={formData}
                    setFormData={setFormData}
                    categories={categories}
                    departments={departments}
                    employees={employees}
                    loading={loading}
                    selectedTicket={selectedTicket}
                    onSubmit={() => {
                        // Call update API here
                        console.log('Update ticket:', formData);
                    }}
                    onClose={() => handleModalClose('edit')}
                />
            )}

            {modals.assign && (
                <AssignModal
                    ticket={selectedTicket}
                    assignToId={assignToId}
                    setAssignToId={setAssignToId}
                    employees={employees}
                    loading={loading}
                    onSubmit={() => {
                        // Call assign API here
                        console.log('Assign ticket:', assignToId);
                    }}
                    onClose={() => {
                        handleModalClose('assign');
                        setAssignToId('');
                    }}
                />
            )}
        </div>
    );
};

// Stat Card Component
const StatCard = ({ label, value, bgColor }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`w-12 h-12 ${bgColor} rounded-lg`}></div>
        </div>
    </div>
);

// Search Input Component
const SearchInput = ({ value, onChange }) => (
    <div className="relative flex-1 max-w-md">
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
            type="text"
            placeholder="Search tickets..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

// Status Filter Component
const StatusFilter = ({ value, onChange }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
    </select>
);

// Refresh Button Component
const RefreshButton = ({ loading }) => (
    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
        <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
    </button>
);

// Create Button Component
const CreateButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Ticket
    </button>
);

// Tickets Table Component
const TicketsTable = ({
    tickets,
    statusConfig,
    priorityConfig,
    getEmployeeName,
    getEmployeeInitials,
    getCategoryName,
    getDepartmentName,
    onEdit,
    onAssign,
    onDelete,
}) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket #</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {tickets.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                            No tickets found
                        </td>
                    </tr>
                ) : (
                    tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <span className="font-semibold text-blue-600">{ticket.ticket_number}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div>
                                    <p className="font-medium text-gray-900">{ticket.title}</p>
                                    <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">{ticket.description}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[ticket.status]?.color || 'bg-gray-100 text-gray-700'}`}>
                                    {statusConfig[ticket.status]?.label || ticket.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityConfig[ticket.priority]?.color || 'bg-gray-100 text-gray-700'}`}>
                                    {priorityConfig[ticket.priority]?.label || ticket.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {ticket.assigned_to ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                            {getEmployeeInitials(ticket.assigned_to)}
                                        </div>
                                        <span className="text-sm text-gray-900">{getEmployeeName(ticket.assigned_to)}</span>
                                    </div>
                                ) : (
                                    <button onClick={() => onAssign(ticket)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        Assign
                                    </button>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-600">{getDepartmentName(ticket.department_id)}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {ticket.due_date || 'N/A'}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => onEdit(ticket)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => onDelete(ticket.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

// Ticket Form Modal Component
const TicketFormModal = ({
    title,
    formData,
    setFormData,
    categories,
    departments,
    employees,
    loading,
    selectedTicket,
    onSubmit,
    onClose,
}) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <ModalHeader title={title} onClose={onClose} />

            <div className="p-6 space-y-4">
                <FormField label="Title *" type="text" placeholder="Enter ticket title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                <FormField label="Description *" type="textarea" placeholder="Describe the issue or request" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />

                <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Priority" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                        { value: 'critical', label: 'Critical' },
                    ]} />

                    <SelectField label="Category" value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} options={[{ value: '', label: 'Select Category' }, ...categories]} optionKey="id" optionLabel="name" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Department" value={formData.department_id} onChange={(e) => setFormData({ ...formData, department_id: e.target.value })} options={[{ value: '', label: 'Select Department' }, ...departments]} optionKey="id" optionLabel="name" />

                    <FormField label="Due Date" type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} />
                </div>

                <SelectField label="Assign To" value={formData.assigned_to} onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })} options={[{ value: '', label: 'Unassigned' }, ...employees]} optionKey="id" optionLabel="name" />

                {selectedTicket && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Ticket Number</p>
                        <p className="font-semibold text-blue-600">{selectedTicket.ticket_number}</p>
                    </div>
                )}
            </div>

            <ModalFooter loading={loading} onSubmit={onSubmit} onClose={onClose} submitLabel={selectedTicket ? 'Update Ticket' : 'Create Ticket'} />
        </div>
    </div>
);

// Assign Modal Component
const AssignModal = ({ ticket, assignToId, setAssignToId, employees, loading, onSubmit, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <ModalHeader title="Assign Ticket" onClose={onClose} />

            <div className="p-6 space-y-4">
                <SelectField label="Assign To" value={assignToId} onChange={(e) => setAssignToId(e.target.value)} options={[{ value: '', label: 'Select Employee' }, ...employees]} optionKey="id" optionLabel="name" showRole={true} />

                {ticket && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Ticket</p>
                        <p className="font-semibold text-blue-600">{ticket.ticket_number}</p>
                        <p className="font-medium text-gray-900 mt-2">{ticket.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                    </div>
                )}
            </div>

            <ModalFooter loading={loading} onSubmit={onSubmit} onClose={onClose} submitLabel="Assign Ticket" />
        </div>
    </div>
);

// Form Field Component
const FormField = ({ label, type, placeholder, value, onChange, rows }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {type === 'textarea' ? (
            <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        ) : (
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        )}
    </div>
);

// Select Field Component
const SelectField = ({ label, value, onChange, options, optionKey, optionLabel, showRole }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select value={value} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            {options.map((opt, idx) => (
                <option key={idx} value={optionKey ? opt[optionKey] : opt.value}>
                    {optionKey ? opt[optionLabel] : opt.label}
                    {showRole && opt.role ? ` (${opt.role})` : ''}
                </option>
            ))}
        </select>
    </div>
);

// Modal Header Component
const ModalHeader = ({ title, onClose }) => (
    <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
);

// Modal Footer Component
const ModalFooter = ({ loading, onSubmit, onClose, submitLabel = 'Submit' }) => (
    <div className="flex justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
        <button onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
        </button>
        <button onClick={onSubmit} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {submitLabel}
        </button>
    </div>
);

export default TicketManagement;