import React from 'react';
import ApiService from "../services/ApiService";

import { Box, Button, Typography, Paper,
    ToggleButton, ToggleButtonGroup, Tooltip, Link, } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import DescriptionIcon from "@mui/icons-material/Description";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

export default function Login() {

    const { lang, setLang } = useLang();

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
                <Tooltip title={Languages[lang].chooseLanguage}>
                    <ToggleButtonGroup
                        value={lang}
                        exclusive
                        onChange={(e, v) => v && setLang(v)}
                        size="small"                    
                    >
                        <ToggleButton sx={{ width: 100, }} value="mn">Монгол Хэл</ToggleButton>
                        <ToggleButton sx={{ width: 100, }} value="en">English</ToggleButton>
                    </ToggleButtonGroup>
                </Tooltip>
                
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
                        {Languages[lang].googleLogin}
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
                        {Languages[lang].facebookLogin}
                    </Button>
                </Box>

            </Paper>

            <Paper sx={{ p: 2, width: 360, mb: 3, }} elevation={3}>

                <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                        variant="outlined"
                        startIcon={<DescriptionIcon />}
                        fullWidth
                        component="a"
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        <Link
                            href="https://shineug.com/term-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                        >
                            {Languages[lang].termOfService}
                        </Link>                        
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<PrivacyTipIcon />}
                        fullWidth
                        component="a"
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        <Link
                            href="https://shineug.com/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                        >
                            {Languages[lang].privacyPolicy}
                        </Link>                        
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
