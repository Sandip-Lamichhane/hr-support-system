import api from "./api";

export const register = (data) => {
    return api.post("/register", data);
};

export const login = async (data) => {
    const res = await api.post("/login", data);

    // Store token
    localStorage.setItem("token", res.data.token);

    // Store user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
};

export const logout = () => {
    return api.post("/logout");
};