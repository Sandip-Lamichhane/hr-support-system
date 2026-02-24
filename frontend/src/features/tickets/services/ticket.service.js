import api from "../../../services/api";

// Fetch all tickets
export const getTickets = async () => {
    try {
        const response = await api.get('/tickets');
        return response.data;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};

// Fetch single ticket by ID
export const getTicketById = async (id) => {
    try {
        const response = await api.get(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket:', error);
        throw error;
    }
};

// Create new ticket
export const createTicket = async (formData) => {
    const response = await api.post('/tickets', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


// Update ticket
export const updateTicket = async (id, data) => {
    const response = await api.post(`/tickets/${id}/update`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete ticket
export const deleteTicket = async (id) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
};

// Assign ticket to employee
export const assignTicket = async (ticketId, employeeId) => {
    const response = await api.patch(`/tickets/${ticketId}/assign`, {
        assigned_to: employeeId,
    });
    return response.data;
};

// Fetch all categories
export const getCategories = async () => {
    try {
        const response = await api.get('/category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch all departments
export const getDepartments = async () => {
    try {
        const response = await api.get('/departments');
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

//Fetch all Employees
export const getEmployees = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};