// src/features/tickets/pages/TicketManagement.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTickets } from '../hooks/useTickets';
import TicketStats from '../components/TicketStats';
import TicketToolbar from '../components/TicketToolbar';
import TicketsTable from '../components/TicketTable';
import TicketFormModal from '../components/TicketFormModal';
import AssignModal from '../components/AssignModal';

const TicketManagement = () => {
    const {
        tickets,
        employees,
        departments,
        categories,
        loading,
        fetchTickets,
        createTicket,
        updateTicket,
        deleteTicket,
        assignTicket,
    } = useTickets();

    // Filter and search states
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [modals, setModals] = useState({
        create: false,
        edit: false,
        assign: false,
    });

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
        files: [],
    });
    const [assignToId, setAssignToId] = useState('');

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
            files: [],
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

    // Handlers
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
            files: [],
        });
        toggleModal('edit', true);
    };

    const handleAssignClick = (ticket) => {
        setSelectedTicket(ticket);
        toggleModal('assign', true);
    };

    const handleCreateSubmit = async () => {
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

            if (formData.files?.length > 0) {
                formData.files.forEach((file) => {
                    submitData.append('attachments[]', file); // ✅ must be attachments[]
                });
            }


            await createTicket(submitData);
            toast.success('Ticket created successfully!');
            handleModalClose('create');
            fetchTickets();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || 'Error creating ticket!'
            );
        }
    };


    const handleUpdateSubmit = async () => {
        try {
            // Create FormData for file upload
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

            // Append new files with correct field name
            if (formData.files && formData.files.length > 0) {
                formData.files.forEach((file) => {
                    submitData.append('attachments[]', file);
                });
            }

            await updateTicket(selectedTicket.id, submitData);
            toast.success('Ticket updated successfully!');
            handleModalClose('edit');
            fetchTickets();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || 'Error updating ticket!'
            );
        }
    };

    const handleAssignSubmit = async () => {
        try {
            await assignTicket(selectedTicket.id, assignToId);
            toast.success('Ticket assigned successfully!');
            handleModalClose('assign');
            setAssignToId('');
            fetchTickets();
        } catch (error) {
            toast.error('Error assigning ticket!');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this ticket?')) {
            try {
                await deleteTicket(id);
                toast.success('Ticket deleted successfully!');
                fetchTickets();
            } catch (error) {
                toast.error('Error deleting ticket!');
            }
        }
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
                <TicketStats stats={stats} />

                {/* Toolbar */}
                <TicketToolbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    loading={loading}
                    onRefresh={fetchTickets}
                    onCreate={() => toggleModal('create', true)}
                />

                {/* Tickets Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <TicketsTable
                            tickets={filteredTickets}
                            employees={employees}
                            categories={categories}
                            departments={departments}
                            onEdit={handleEditClick}
                            onAssign={handleAssignClick}
                            onDelete={handleDelete}
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
                    onSubmit={handleCreateSubmit}
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
                    onSubmit={handleUpdateSubmit}
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
                    onSubmit={handleAssignSubmit}
                    onClose={() => {
                        handleModalClose('assign');
                        setAssignToId('');
                    }}
                />
            )}
        </div>
    );
};

export default TicketManagement;