import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

export default function Login() {

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
            }}
            >
            <Paper sx={{ p: 2, width: 360, height: 120, mt: -16}} elevation={3}>

                <Box mt={3} display="flex" flexDirection="column" gap={1}>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        fullWidth
                        component="a"
                        href={`${ApiService.apiUrl}/oauth2/authorization/google`}
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        fullWidth
                        component="a"
                        href={`${ApiService.apiUrl}/oauth2/authorization/facebook`}
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Continue with Facebook
                    </Button>
                </Box>

            </Paper>

        </Box>
    );
}
