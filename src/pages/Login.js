import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
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
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                pt: 8,
            }}
            >
            <Paper sx={{ p: 4, width: 360 }} elevation={3}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    Login
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <Box component="form" onSubmit={onLogin} mt={2}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
