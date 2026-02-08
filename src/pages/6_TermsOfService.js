import React from 'react';
import { Box, Typography, Link, List, 
    ListItem, ListItemText, Paper,
    ToggleButton, ToggleButtonGroup, Tooltip, } from '@mui/material';
import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

export default function TermsOfService() {

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
                            Terms of Service
                        </Typography>


                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Effective Date:</strong> [2026-12-31]
                        </Typography>


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
                                The <strong>[SHINE-UG]</strong> application offers its services to you under 
                                the following terms and conditions. 
                                By accepting these Terms of Service, you are granted the right to use our app.
                            </Typography>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Scope of Services
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Our app provides the following services:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Login using Google and Facebook accounts" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Add, edit, and delete new words" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Daily memorization word list" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Various quizzes and tests" />
                                </ListItem>
                            </List>

                            <br></br>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                When using our app, you agree to the following responsibilities:
                            </Typography>

                            <ListItem>
                                <ListItemText primary="Do not violate the service rules" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Log in only with your own account" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Do not misuse the app or use it for unintended purposes" />
                            </ListItem>

                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Personal Information and Privacy
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                When you use our app, we collect and use your information 
                                as described in the Privacy Policy. You can read the Privacy Policy here:
                            </Typography>
                            
                            <Link
                                href="https://shineug.com/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/privacy-policy
                            </Link>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Limitation of Liability
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Our app is not responsible for:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Service interruptions or technical errors" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Issues arising from third-party services" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Problems caused by improper or unintended use by the user" />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Third-Party Services
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Our app uses Google OAuth2 and Facebook OAuth2, and we 
                                recommend reviewing their respective terms and policies.
                            </Typography>                            
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Changes to the Terms of Service
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                We reserve the right to update the Terms of Service from time to time, 
                                and any changes will be posted on this page.
                            </Typography>                            
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Contact
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                If you have any questions regarding the Terms of Service, please contact us at:
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
                            Үйлчилгээний Нөхцөл
                        </Typography>


                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Effective Date:</strong> [2026-12-31]
                        </Typography>


                        <Box mt={3}>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The <strong>[SHINE-UG]</strong> апп нь гадаад хэлний үг цээжилэхэд зориуглагдсан 
                                ба та сурч буй гадаад хэлний үг болон утгыг системд оруулсанаар өөрийн гэсэн 
                                үгсийн сантай болох боломжтой юм. Ингэснээр та өөрийн бүртгэсэн шинэ үгсийн хүрээнд, 
                                өдөр бүрийн шинэ үг, бүх үгний толь, төрөл бүрийн тест шалгалт зэрэг 
                                функцуудыг ашиглан үгсийн сангаа нэмэгдүүлэх боломжтой юм.
                            </Typography>


                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                The <strong>[SHINE-UG]</strong> апп нь танд дараах нөхцөлөөр үйлчилгээг 
                                санал болгож байна. Энэхүү үйлчилгээний нөхцлийг хүлээн 
                                зөвшөөрснөөр та манай аппыг ашиглах эрхтэй болно.
                            </Typography>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Үйлчилгээний хамрах хүрээ
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Манай апп нь дараах үйлчилгээг үзүүлнэ:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Google болон Facebook хаягаар нэвтрэх" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Шинэ үг нэмэх, засах болон устгах" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Өдөр бүрийн цээжлэх шинэ үгний жагсаалт" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Төрөл бүрийн тест шалгалт" />
                                </ListItem>
                            </List>

                            <br></br>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Та манай апп-ыг ашиглахдаа дараах үүргийг хүлээнэ:
                            </Typography>

                            <ListItem>
                                <ListItemText primary="Үйлчилгээний дүрмийг зөрчихгүй байх" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Апп-руу зөвхөн өөрийн хаягаар нэвтрэх" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Зориулалтыг бусаар ашиглахгүй байх" />
                            </ListItem>

                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Хувийн мэдээлэл ба нууцлал
                            </Typography>

                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Та манай аппыг ашиглах үед бид таны мэдээллийг "Нууцлалын Бодлого"-д 
                                заасан байдлаар цуглуулж, ашиглах болно. Нууцлалын бодлогыг эндээс уншина уу:
                            </Typography>
                            
                            <Link
                                href="https://shineug.com/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                            >
                                https://shineug.com/privacy-policy
                            </Link>
                        </Box>


                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Хариуцлагын нөхцөл
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Манай апп дараах нөхцөлд хариуцлага хүлээхгүй:
                            </Typography>

                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Апп-ын тасалдал эсвэл техникийн алдаа" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Гуравдагч этгээдийн үйлчилгээний асуудал" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Хэрэглэгчийн зориулалтын бус ашиглалтаас үүдсэн асуудал" />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Гуравдагч этгээдийн үйлчилгээ
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Манай апп Google-ийн OAuth2 болон Facebook-ийн OAuth2 ашигладаг 
                                бөгөөд эдгээрийн нөхцөлтэй танилцахыг зөвлөж байна.
                            </Typography>                            
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Үйлчилгээний нөхцлыг өөрчлөх
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                Бид үйлчилгээний нөхцлийг үе үе шинэчлэх эрхтэй бөгөөд өөрчлөлтийг энэ хуудсанд нийтлэх болно.
                            </Typography>                            
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: "justify", }}>
                                Холбоо барих
                            </Typography>
                            <Typography paragraph sx={{ textAlign: "justify", }}>
                                "Үйлчилгээний Hөхцөл"-той холбоотой асуулт байвал доорх хаягаар холбогдоно уу!
                            </Typography>
                            <Typography fontWeight={500}>lkhaching@gmail.com</Typography>
                        </Box>
                    </Paper>
                )}
                
            </Box>
            
        </div>
    );
}