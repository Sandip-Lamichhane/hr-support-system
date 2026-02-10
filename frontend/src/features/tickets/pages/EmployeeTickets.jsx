import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTickets } from '../hooks/useTickets';
import TicketStats from '../components/TicketStats';
import TicketToolbar from '../components/TicketToolbar';
import TicketsTable from '../components/TicketTable';
import TicketFormModal from '../components/TicketFormModal';
import { useAuth } from '../../../utils/context/auth';

const EmployeeTickets = () => {
    const { user } = useAuth();

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
    } = useTickets();

    // Filter and search states
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [modals, setModals] = useState({
        create: false,
        edit: false,
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
        files: [],
    });

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
            files: [],
        });
        setSelectedTicket(null);
    };

    const handleModalClose = (modalName) => {
        toggleModal(modalName, false);
        resetForm();
    };

    // Only include tickets created by the logged-in user
    const isTicketOwner = (ticket) => {
        const uid = user?.id;
        if (!uid) return false;
        return (
            ticket.user_id === uid ||
            ticket.created_by === uid ||
            ticket.owner_id === uid ||
            (ticket.user && ticket.user.id === uid)
        );
    };

    const userTickets = tickets.filter((t) => isTicketOwner(t));

    // Calculate stats from user's tickets
    const stats = {
        total: userTickets.length,
        open: userTickets.filter((t) => t.status === 'open').length,
        inProgress: userTickets.filter((t) => t.status === 'in-progress').length,
        resolved: userTickets.filter((t) => t.status === 'resolved').length,
    };

    // Filter tickets by search and status
    const filteredTickets = userTickets.filter((ticket) => {
        const matchesFilter = activeFilter === 'all' || ticket.status === activeFilter;
        const matchesSearch =
            ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.ticket_number?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleEditClick = (ticket) => {
        if (!isTicketOwner(ticket)) return toast.error('Not authorized to edit this ticket');
        setSelectedTicket(ticket);
        setFormData({
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            category_id: ticket.category_id,
            department_id: ticket.department_id,
            due_date: ticket.due_date,
            files: [],
        });
        toggleModal('edit', true);
    };

    const handleCreateSubmit = async () => {
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('priority', formData.priority);
            submitData.append('category_id', formData.category_id);
            submitData.append('department_id', formData.department_id);

            if (formData.due_date) submitData.append('due_date', formData.due_date);

            if (formData.files?.length > 0) {
                formData.files.forEach((file) => submitData.append('attachments[]', file));
            }

            await createTicket(submitData);
            toast.success('Ticket created successfully!');
            handleModalClose('create');
            fetchTickets();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error creating ticket!');
        }
    };

    const handleUpdateSubmit = async () => {
        try {
            if (!selectedTicket) return;
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('priority', formData.priority);
            submitData.append('category_id', formData.category_id);
            submitData.append('department_id', formData.department_id);
            submitData.append('due_date', formData.due_date || '');

            if (formData.files && formData.files.length > 0) {
                formData.files.forEach((file) => submitData.append('files', file));
            }

            await updateTicket(selectedTicket.id, submitData);
            toast.success('Ticket updated successfully!');
            handleModalClose('edit');
            fetchTickets();
        } catch (error) {
            console.error(error);
            toast.error('Error updating ticket!');
        }
    };

    const handleDelete = async (id) => {
        const ticket = tickets.find((t) => t.id === id);
        if (!isTicketOwner(ticket)) return toast.error('Not authorized to delete this ticket');
        if (confirm('Are you sure you want to delete this ticket?')) {
            try {
                await deleteTicket(id);
                toast.success('Ticket deleted successfully!');
                fetchTickets();
            } catch (error) {
                console.error(error);
                toast.error('Error deleting ticket!');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
                    <p className="text-gray-600 mt-1">Tickets you have created</p>
                </div>

                <TicketStats stats={stats} />

                <TicketToolbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    loading={loading}
                    onRefresh={fetchTickets}
                    onCreate={() => toggleModal('create', true)}
                />

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
                            onAssign={() => { /* no-op for employees */ }}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

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
        </div>
    );
};

export default EmployeeTickets;
