import api from "./api";

export const CreateUsers = async (data) => {
    const response = await api.post('/users', data);
    return response.data;
}