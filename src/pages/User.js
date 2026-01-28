import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, IconButton, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function User() {
    
    const { user, logout } = useAuth();

    return (
        <div className='content-layout'>
            <Box
                sx={{
                    height: "100vh",
                    bgcolor: "#f5f5f5",
                    display: "flex",
                    justifyContent: "center",
                }}
                >
                <Paper sx={{ p: 4, width: 420 }} elevation={3}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="body1" mb={3}>
                            My username is <strong>{user?.name}.</strong>
                        </Typography>

                        <IconButton
                            color="error"
                            onClick={logout}
                            aria-label="logout"
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Stack>
                </Paper>
            </Box>                   
        </div>
    );
}