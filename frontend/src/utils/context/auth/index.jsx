import { createContext, useContext, useEffect, useState } from "react";

import { useLoginMutation } from "../../../services/auth/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    const [login, { isLoading, isError, error }] = useLoginMutation();

    // Restore auth from localStorage on refresh
    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser && storedUser !== "undefined") {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
            }
        }
    }, []);

    const loginUser = async (credentials) => {
        try {
            const response = await login(credentials).unwrap();

            const { access_token, user } = response;

            setToken(access_token);
            setUser(user);

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify(user));

            return response;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loginUser,
                logout,
                isLoading,
                isError,
                error,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
