import api from "./api";

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

export const CreateUsers = async (data) => {
    const response = await api.post('/users', data);
    return response.data;
}

export const UpdatUsers = async (id, data ) => {
    const response = await api.put(`/users/${id}`, data); 
    return response.data;
}