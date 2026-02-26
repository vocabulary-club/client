import React from 'react';
import { Box, Typography, Link, List, 
    ListItem, ListItemText, Paper,
    ToggleButton, ToggleButtonGroup, Tooltip,  } from '@mui/material';
import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

export default function About() {

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
                {lang == "en" ? (
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
                        
                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The <strong>[SHINE-UG]</strong> application is designed for memorizing 
                                foreign language vocabulary. By entering the foreign words you are learning 
                                along with their meanings into the system, you can build your own personal 
                                vocabulary list. Through this, you can expand your vocabulary using features 
                                such as a daily new word, a full word dictionary, and various quizzes and tests 
                                based on the words you have saved.
                            </Typography>


                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                For cybersecurity and privacy reasons, the system does not store your confidential
                                personal information (such as passwords), and you may log in using Google Login.
                            </Typography>
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
                        
                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Энэхүү <strong>[SHINE-UG]</strong> апп нь гадаад хэлний үг цээжилэхэд зориуглагдсан 
                                ба та сурч буй гадаад хэлний үг болон утгыг системд оруулсанаар өөрийн гэсэн 
                                үгсийн сантай болох боломжтой юм. Ингэснээр та өөрийн бүртгэсэн шинэ үгсийн хүрээнд, 
                                өдөр бүрийн шинэ үг, бүх үгний толь, төрөл бүрийн тест шалгалт зэрэг 
                                функцуудыг ашиглан үгсийн сангаа нэмэгдүүлэх боломжтой юм.
                            </Typography>


                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Цахим аюулгүй байдлын үүднээс системд таны хувийн нууц мэдээллийг (нууц дугаар) 
                                хадгалахгүй ба Google Login ашиглан нэвтрэх боломжтой.
                            </Typography>
                        </Box>

                    </Paper>
                )}
            </Box>
        </div>
    );
}