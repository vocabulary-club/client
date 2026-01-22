import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

export default function Login() {

    const { login, user} = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    console.log("Current User:", user);

    const onLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${ApiService.apiUrl}/login`, {
                method: 'POST',
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            const authHeader = response.headers.get("Authorization");
            const accessToken = authHeader?.replace("Bearer ", "");
            console.info("Access Token:", accessToken);

            login({ name: username });
            navigate("/", { replace: true });

        } catch (err) { 
            console.error("Login error:", err);
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
            <h1>Login</h1>

            <form onSubmit={onLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
