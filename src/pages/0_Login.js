import React from 'react';
import ApiService from "../services/ApiService";

import { Box, Button, Typography, Paper,
    ToggleButton, ToggleButtonGroup } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { Languages, CurrLang } from "../components/Language";

export default function Login() {

    const [lang, setLang] = React.useState("mn");

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                pt: 2,
            }}
        >
            <Box display="flex"
                justifyContent="start"
                mb={2}
                sx={{ width: 360 }}
            >
                <ToggleButtonGroup
                    value={lang}
                    exclusive
                    onChange={(e, v) => v && setLang(v)}
                    size="small"                    
                >
                    <ToggleButton sx={{ width: 100, }} value="mn">Монгол Хэл</ToggleButton>
                    <ToggleButton sx={{ width: 100, }} value="en">English</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Typography
                variant="body2"
                sx={{ maxWidth: 360, mb: 3, color: "text.secondary", textAlign: "justify", }}
            >
                {Languages[lang].appDesc}
            </Typography>

            <Paper sx={{ p: 2, width: 360, mb: 3, }} elevation={3}>

                <Box display="flex" flexDirection="column" gap={1}>
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
                        Google Login
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
                        Facebook Login
                    </Button>
                </Box>

            </Paper>

            <Typography
                variant="body2"
                sx={{ maxWidth: 360, mb: 2, color: "text.secondary", textAlign: "justify", }}
            >
                {Languages[lang].securityDesc}
            </Typography>

        </Box>
    );
}
