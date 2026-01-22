import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

export default function User() {
    
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [logout, navigate]);

    const fetchUser = async () => {
        try {
            const response = await ApiService.request("/user", { method: "GET" });

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
            navigate("/login");   
        }
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <div>
            <h1>User</h1>
            <p>My name, {user.name}</p>
            <div>
                <button onClick={handleHome}>Go To Home</button>
            </div>
            <div>
                <button onClick={logout}>Logout</button>
            </div>            
        </div>
    );
}