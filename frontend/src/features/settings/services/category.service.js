import api from "../../../services/api";

export const getCategories = async() => {
    const response = await api.get('/category');
    return response.data;
}

export const createCategories = async() => {
    const response = await api.post('/category');
    return response.data;
}

export const updateCategories = async() => {
    const response = await api.put('/category');
    return response.data;
}