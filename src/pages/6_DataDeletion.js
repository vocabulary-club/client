import React from 'react';
import { Box, Typography, Link, List, 
    ListItem, ListItemText, Paper,
    ToggleButton, ToggleButtonGroup, Tooltip,  } from '@mui/material';
import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

export default function DataDeletion() {

    const { lang, setLang } = useLang();
    
    return (
        <div className="content-layout">

            <Box
                sx={{
                    height: '100vh',
                    bgcolor: '#f5f5f5',
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'auto',
                    p: 1,
                }}
            >
                {lang === "en" ? (
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            maxWidth: 900,
                            p: { xs: 3, md: 6 },
                            borderRadius: 2,
                            my: 'auto',
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

                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Data Deletion
                        </Typography>


                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Effective Date:</strong> [2026-12-31]
                        </Typography>


                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                You have the right to request deletion of your information.
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                You can delete your information here:
                            </Typography>

                            <Link
                                href="https://shineug.com/user"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/user
                            </Link>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Contact
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                If you have any questions regarding the Data Deletion, please contact us at:
                            </Typography>
                            <Typography fontWeight={500}>lkhaching@gmail.com</Typography>
                        </Box>
                    </Paper>
                ):(
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            maxWidth: 900,
                            p: { xs: 3, md: 6 },
                            borderRadius: 2,
                            my: 'auto',
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

                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Мэдээллээ устгах
                        </Typography>


                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Хүчин төгөлдөр огноо:</strong> [2026-12-31]
                        </Typography>

                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Та өөрийн мэдээллээ устгах эрхтэй.
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Та өөрийн мэдээллээ эндээс уншина уу:
                            </Typography>

                            <Link
                                href="https://shineug.com/user"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/user
                            </Link>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Холбоо барих
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                "Мэдээлэл устгах"-тай холбоотой асуулт байвал доорх хаягаар холбогдоно уу!
                            </Typography>
                            <Typography fontWeight={500}>lkhaching@gmail.com</Typography>
                        </Box>
                    </Paper>
                )}
            </Box>
            
        </div>
    );
}