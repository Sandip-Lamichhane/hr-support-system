import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
    createTicket as createTicketAPI,
    updateTicket as updateTicketAPI,
    deleteTicket as deleteTicketAPI,
    assignTicket as assignTicketAPI,
} from '../services/ticket.service';
import {
    getCategories,
    getDepartments,
    getEmployees,
    getTickets,
} from '../services/ticket.service';

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all data on mount
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchTickets(),
                fetchEmployees(),
                fetchDepartments(),
                fetchCategories(),
            ]);
        } catch (error) {
            toast.error('Error loading data!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTickets = async () => {
        try {
            const { data } = await getTickets();
            setTickets(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Error fetching tickets!');
            console.error(error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Error fetching employees!');
            console.error(error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const {data} = await getDepartments();
            setDepartments(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Error fetching departments!');
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await getCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Error fetching categories!');
            console.error(error);
        }
    };

    const createTicket = async (ticketData) => {
        setLoading(true);
        try {
            await createTicketAPI(ticketData);
        } finally {
            setLoading(false);
        }
    };

    const updateTicket = async (id, ticketData) => {
        setLoading(true);
        try {
            await updateTicketAPI(id, ticketData);
        } finally {
            setLoading(false);
        }
    };

    const deleteTicket = async (id) => {
        setLoading(true);
        try {
            await deleteTicketAPI(id);
        } finally {
            setLoading(false);
        }
    };

    const assignTicket = async (ticketId, employeeId) => {
        setLoading(true);
        try {
            await assignTicketAPI(ticketId, employeeId);
        } finally {
            setLoading(false);
        }
    };

    return {
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
    };
};