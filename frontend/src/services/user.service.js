import api from "./api";

export const CreateUsers = async () => {
    const response = await api.post('/users');
    return response.data;
}