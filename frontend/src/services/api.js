import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//fetch users
export const getUsers = async () =>{
    try{
        const response = await api.get('/users');
        return response.data;
    }catch(error){
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default api;