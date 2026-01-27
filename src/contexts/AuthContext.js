import React from 'react';
import { createContext, useContext, useState } from "react";
import ApiService from "../services/ApiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = async () => {
        try {
            await fetch(`${ApiService.apiUrl}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } finally {
            setUser(null);
        }
    };
    const onAuthFail = () => setUser(null);

    React.useEffect(() => {
        ApiService.setAuthFailHandler(onAuthFail);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
