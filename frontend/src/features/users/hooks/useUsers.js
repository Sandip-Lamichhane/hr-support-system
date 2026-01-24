import { useState, useEffect } from 'react';
import { getUsers, CreateUsers, UpdatUsers } from '../services/user.service';
import { getDepartments } from '../../settings/services/department.service';
import toast from 'react-hot-toast';
import { EMPTY_FORM } from '../constants/UserForm';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Fetch users
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            const msg = err.message || 'Failed to fetch users';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // Fetch departments
    const fetchDepartments = async () => {
        try {
            const { data } = await getDepartments();
            setDepartments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch departments:', error);
        }
    };

    // Create user
    const createUser = async (formData) => {
        const requiredFields = ['name', 'email', 'password', 'department_id', 'role', 'status'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                toast.error('Please fill all required fields.');
                return false;
            }
        }

        setSubmitting(true);
        try {
            await CreateUsers({ 
                ...formData, 
                department_id: Number(formData.department_id) 
            });
            toast.success('User created successfully!');
            await fetchUsers();
            return true;
        } catch (error) {
            const msg = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join(' | ')
                : error.response?.data?.message || 'Failed to create User!';
            toast.error(msg);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // Update user
    const updateUser = async (userId, formData) => {
        setSubmitting(true);
        try {
            await UpdatUsers(userId, {
                name: formData.name,
                department_id: Number(formData.department_id),
                role: formData.role,
                status: formData.status,
            });
            toast.success('User updated successfully!');
            await fetchUsers();
            return true;
        } catch (error) {
            toast.error('Failed to update user');
            console.error(error);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // Initial data fetching
    useEffect(() => {
        fetchUsers();
        fetchDepartments();
    }, []);

    return {
        users,
        departments,
        loading,
        error,
        submitting,
        fetchUsers,
        createUser,
        updateUser,
    };
};