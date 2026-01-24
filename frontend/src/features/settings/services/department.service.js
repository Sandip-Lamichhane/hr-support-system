import api from '../../../services/api';

export const getDepartments = async() =>{
    const response = await api.get('/departments')
    return response.data;
};

export const createDepartments = async(payload) => {
    const response = await api.post('/departments', payload)
    return response.data;
} 