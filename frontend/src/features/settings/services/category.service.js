import api from "../../../services/api";

export const getCategories = async (offset = 0, limit = 10) => {
    const response = await api.get('/category',
        {
            params: { offset, limit },
        });
    return response.data;
}

export const createCategories = async (payload) => {
    const response = await api.post('/category', payload);
    return response.data;
}

export const updateCategories = async (id, payload) => {
    const response = await api.put(`/category/${id}`, payload);
    return response.data;
};

export const updateCategoryStatus = async (id, status) => {
    const response = await api.patch(`/category/${id}/status`, {status});
    return response.data;
}