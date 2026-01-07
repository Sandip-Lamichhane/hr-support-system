import api from "./api";

export const CreateUsers = async (data) => {
    const response = await api.post('/users', data);
    return response.data;
}

export const UpdatUsers = async (id, data ) => {
    const response = await api.put(`/users/${id}`, data); 
    return response.data;
}