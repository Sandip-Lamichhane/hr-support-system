import { createContext, useContext, useState } from "react";

import { useLoginMutation } from "../../../services/auth/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored && stored !== "undefined" ? JSON.parse(stored) : null;
        } catch (e) {
            console.error("Failed to parse stored user", e);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("access_token") || null;
    });

    const [login, { isLoading, isError, error }] = useLoginMutation();

    const loginUser = async (credentials) => {
        const response = await login(credentials).unwrap();

        const { access_token, user } = response;

        setToken(access_token);
        setUser(user);

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        return response.user;
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