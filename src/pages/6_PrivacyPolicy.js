import React from 'react';
import { Box, Typography, Link, List, 
    ListItem, ListItemText, Paper,
    ToggleButton, ToggleButtonGroup, Tooltip,  } from '@mui/material';
import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

export default function PrivacyPolicy() {

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
                            Privacy Policy
                        </Typography>


                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Effective Date:</strong> [2026-12-31]
                        </Typography>


                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The <strong>[SHINE-UG]</strong> application respects the confidentiality of your personal
                                information and implements the following Privacy Policy. This policy explains how your
                                information is protected while you use our app.
                            </Typography>


                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                For cybersecurity and privacy reasons, the system does not store your confidential
                                personal information (such as passwords), and you may log in using Google or Facebook Login.
                            </Typography>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Information Required at Login
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                When you log in using a Google or Facebook account, the following information may be collected:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Email address" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Name" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Profile picture" />
                                </ListItem>
                            </List>

                            <br></br>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                This information is collected only with your consent.
                            </Typography>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                How Is the Information Used?
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The collected information is used for the following purposes:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="To verify login authentication" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="To save personal settings within the system" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="To notify you when the Privacy Policy is updated" />
                                </ListItem>
                            </List>

                            <br></br>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                We reserve the right to update the Privacy Policy, and when updates are made, you will be
                                notified by email or through this page.
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The app does not sell, trade, or transfer your information to third parties. It is used solely
                                for login and app-related purposes.
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                You have the right to request deletion of your information.
                            </Typography>

                            <Link
                                href="https://shineug.com/data-deletion"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/data-deletion
                            </Link>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Terms of Service
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                You can read the Terms of Service here:
                            </Typography>
                            
                            <Link
                                href="https://shineug.com/term-of-service"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/term-of-service
                            </Link>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Contact
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                If you have any questions regarding the Privacy Policy, please contact us at:
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
                            Нууцлалын Бодлого
                        </Typography>


                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Хүчин төгөлдөр огноо:</strong> [2026-12-31]
                        </Typography>


                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The <strong>[SHINE-UG]</strong> апп нь таны хувийн мэдээллийн нууц байх байдлыг 
                                хүндэтгэж дараах "Нууцлалын Бодлого"-ыг хэрэгжүүлж байна. Энэхүү бодлого нь манай апп-ыг 
                                ашиглах явцад таны мэдээллийг хэрхэн хамгаалдаг талаар тайлбарлах болно.
                            </Typography>


                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Цахим аюулгүй байдлын үүднээс системд таны хувийн нууц мэдээллийг (нууц дугаар) 
                                хадгалахгүй ба Google болон Facebook Login ашиглан нэвтрэх боломжтой.
                            </Typography>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Нэвтрэх үед шаардлагатай мэдээлэл
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Google болон Facebook хаягаар нэвтрэх үед дараах мэдээллийг цуглуулах болно:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Email хаяг" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Нэр" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Profile зураг" />
                                </ListItem>
                            </List>

                            <br></br>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Энэхүү мэдээллийг гагцхүү та зөвшөөрсөн үед л цуглуулах боломжтой.
                            </Typography>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Мэдээллийг юунд ашигладаг вэ?
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Цуглуулсан мэдээллийг дараад зорилгоор ашиглана:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Нэвтрэлтийг баталгаажуулах" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Систем дахь хувийн тохиргоог хадгалах" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={`"Нууцлалын Бодлого" шинэчлэгдсэн үед танд мэдэгдэх`} />
                                </ListItem>
                            </List>

                            <br></br>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Бид "Нууцлалын Бодлого" - ыг шинэчлэх эрхтэй ба шинэчлэх 
                                үед танд email илгээх эвсэл энэ хуудсанд мэдэгдэх болно.
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Апп нь таны мэдээллийг гуравдагч этгээдэд худалдах, арилжаалах эсвэл 
                                дамжуулахгүй. Зөвхөн апп-д нэвтрэх зорилгоор ашиглана.
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Та өөрийн мэдээллээ устгах эрхтэй.
                            </Typography>

                            <Link
                                href="https://shineug.com/data-deletion"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/data-deletion
                            </Link>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Үйлчилгээний нөхцөл
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Үйлчилгээний нөхцлийг эндээс уншина уу:
                            </Typography>
                            
                            <Link
                                href="https://shineug.com/term-of-service"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/term-of-service
                            </Link>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Холбоо барих
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                "Нууцлалын Бодлого"-той холбоотой асуулт байвал доорх хаягаар холбогдоно уу!
                            </Typography>
                            <Typography fontWeight={500}>lkhaching@gmail.com</Typography>
                        </Box>
                    </Paper>
                )}
            </Box>
            
        </div>
    );
}