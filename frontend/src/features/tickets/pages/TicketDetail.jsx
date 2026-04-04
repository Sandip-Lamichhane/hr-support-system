import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getTicketById, updateTicket, getCategories, getDepartments, getEmployees } from '../services/ticket.service';

// ─── Icon Components ──────────────────────────────────────────────────────────
const ArrowLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
    </svg>
);

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const PaperclipIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TicketDetail() {
    const { ticketNumber } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("details");

    // Edit modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category_id: '',
        department_id: '',
        due_date: '',
        assigned_to: '',
        files: [],
    });

    const cardStyle = {
        background: "#ffffff",
        border: "1px solid #e8edf2",
        borderRadius: 14,
        padding: "22px 24px",
        marginBottom: 18,
    };

    useEffect(() => {
        fetchTicket();
    }, [ticketNumber]);

    const fetchTicket = async () => {
        try {
            const data = await getTicketById(ticketNumber);
            setTicket(data);
        } catch (error) {
            toast.error('Error fetching ticket details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFormData = async () => {
        try {
            const [categoriesData, departmentsData, employeesData] = await Promise.all([
                getCategories(),
                getDepartments(),
                getEmployees(),
            ]);
            setCategories(categoriesData);
            setDepartments(departmentsData);
            setEmployees(employeesData);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleEditClick = () => {
        if (ticket) {
            setFormData({
                title: ticket.title || '',
                description: ticket.description || '',
                priority: ticket.priority || 'medium',
                category_id: ticket.category_id || '',
                department_id: ticket.department_id || '',
                due_date: ticket.due_date || '',
                assigned_to: ticket.assigned_to || '',
                files: [],
            });
            setShowEditModal(true);
            fetchFormData();
        }
    };

    const handleUpdateSubmit = async () => {
        setUpdating(true);
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('priority', formData.priority);
            submitData.append('category_id', formData.category_id);
            submitData.append('department_id', formData.department_id);

            if (formData.due_date) {
                submitData.append('due_date', formData.due_date);
            }

            if (formData.assigned_to) {
                submitData.append('assigned_to', formData.assigned_to);
            }

            if (formData.files && formData.files.length > 0) {
                formData.files.forEach((file) => {
                    submitData.append('attachments[]', file);
                });
            }

            await updateTicket(ticketNumber, submitData);
            toast.success('Ticket updated successfully!');
            setShowEditModal(false);
            fetchTicket(); // Refresh ticket data
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error updating ticket!');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Not Found</h2>
                    <p className="text-gray-600">The ticket you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Edit Modal
    const EditModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Ticket</h2>
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter ticket title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe the issue or request"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                value={formData.department_id}
                                onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input
                                type="date"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                        <select
                            value={formData.assigned_to}
                            onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Unassigned</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Attachments</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFormData({ ...formData, files: Array.from(e.target.files) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            accept="image/*,.pdf,.doc,.docx"
                        />
                        <p className="text-xs text-gray-500 mt-1">You can add new attachments. Existing attachments will be preserved.</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateSubmit}
                        disabled={updating}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updating ? 'Updating...' : 'Update Ticket'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {showEditModal && <EditModal />}
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto p-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                            <ArrowLeftIcon />
                            Back to Tickets
                        </button>
                    </div>

                    {/* Ticket Header */}
                    <div style={cardStyle}>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-gray-900">#{ticket.ticket_number}</h1>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                        ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {ticket.status?.replace('_', ' ').toUpperCase()}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        ticket.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {ticket.priority?.toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{ticket.title}</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <UserIcon />
                                        <span>Created by: {ticket.creator?.name || 'Unknown'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserIcon />
                                        <span>Assigned to: {ticket.assigned_user?.name || 'Unassigned'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon />
                                        <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <EditIcon />
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white border border-gray-200 rounded-lg mb-6">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={`px-6 py-3 font-medium text-sm ${
                                    activeTab === "details"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => setActiveTab("attachments")}
                                className={`px-6 py-3 font-medium text-sm ${
                                    activeTab === "attachments"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Attachments ({ticket.attachments?.length || 0})
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === "details" && (
                                <div className="space-y-6">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                                        </div>
                                    </div>

                                    {/* Additional Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ticket Information</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Category:</span>
                                                    <span className="font-medium">{ticket.category?.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Department:</span>
                                                    <span className="font-medium">{ticket.department?.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Priority:</span>
                                                    <span className="font-medium capitalize">{ticket.priority}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Status:</span>
                                                    <span className="font-medium capitalize">{ticket.status?.replace('_', ' ')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Created:</span>
                                                    <span className="font-medium">{new Date(ticket.created_at).toLocaleString()}</span>
                                                </div>
                                                {ticket.updated_at !== ticket.created_at && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Last Updated:</span>
                                                        <span className="font-medium">{new Date(ticket.updated_at).toLocaleString()}</span>
                                                    </div>
                                                )}
                                                {ticket.due_date && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Due Date:</span>
                                                        <span className="font-medium">{new Date(ticket.due_date).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "attachments" && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                                    {ticket.attachments && ticket.attachments.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {ticket.attachments.map((attachment, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <PaperclipIcon />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {attachment.original_name || attachment.filename}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {(attachment.size / 1024).toFixed(1)} KB
                                                            </p>
                                                        </div>
                                                        <a
                                                            href={`${import.meta.env.VITE_API_URL}/storage/${attachment.path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <PaperclipIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No attachments</h3>
                                            <p className="mt-1 text-sm text-gray-500">This ticket has no attachments.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
