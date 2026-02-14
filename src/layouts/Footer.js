import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography, 
    Button, Menu, Avatar, Divider, ListSubheader, 
    MenuList, MenuItem, ListItemIcon, ListItemText, } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import QuizIcon from "@mui/icons-material/Quiz";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

import { useTheme, useMediaQuery } from "@mui/material";

const MyMenuItem = ({ icon, label, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                mx: 1,
                color: "white",
                height: "100%",
            }}
        >
            <IconButton sx={{ color: "white", p: 0.5 }} size="small">
                {icon || null}
            </IconButton>
            <Typography variant="caption" sx={{ mt: -0.5, fontSize: 12, lineHeight: 1 }}>
                {label}
            </Typography>
        </Box>
    );
};

export default function Footer() {

    const { lang, setLang } = useLang();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();

    const [testAnchor, setTestAnchor] = React.useState(null);
    const [aboutMenu, setAboutMenu] = React.useState(null);

    React.useEffect(() => {
        
    }, []);

    const handleMenuClick = (path) => {
        navigate(path, { replace: true });
        closeTestMenu();
        closeAboutMenu();
    };

    const openTestMenu = (e) => setTestAnchor(e.currentTarget);
    const closeTestMenu = () => setTestAnchor(null);
    const openAboutMenu = (e) => setAboutMenu(e.currentTarget);
    const closeAboutMenu = () => setAboutMenu(null);

    return (
        <footer>            
            <AppBar
                position="fixed"
                sx={{
                    top: "auto",
                    bottom: 0,
                    height: 52,
                    overflow: "hidden",
                }}
            >
                {isMobile ? (
                    <Toolbar
                        disableGutters
                        sx={{
                            height: 52,
                            minHeight: "52px !important",
                            justifyContent: "center",
                            alignItems: "center",
                            px: 1,
                            overflow: "hidden",
                        }}
                        >

                        {/* Menus */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <MyMenuItem icon={<HomeIcon />} label={Languages[lang].home} onClick={() => handleMenuClick("/")} />
                            <MyMenuItem icon={<PostAddIcon />} label={Languages[lang].addWord} onClick={() => handleMenuClick("/manage")} />
                            <MyMenuItem 
                                icon={<MenuBookIcon />} 
                                label={Languages[lang].test} 
                                onClick={openTestMenu} >
                            </MyMenuItem>

                                <Menu
                                    anchorEl={testAnchor}
                                    open={Boolean(testAnchor)}
                                    onClose={closeTestMenu}
                                >
                                    <MenuItem onClick={() => handleMenuClick("/test1")}>
                                        <ListItemIcon><QuizIcon /></ListItemIcon>
                                        <ListItemText>Test 1</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/test2")}>
                                        <ListItemIcon><QuizIcon /></ListItemIcon>
                                        <ListItemText>Test 2</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/test3")}>
                                        <ListItemIcon><QuizIcon /></ListItemIcon>
                                        <ListItemText>Test 3</ListItemText>
                                    </MenuItem>
                                </Menu>

                            <MyMenuItem 
                                icon={<InfoIcon />} 
                                label={Languages[lang].about} 
                                onClick={openAboutMenu} >
                            </MyMenuItem>

                                <Menu
                                    anchorEl={aboutMenu}
                                    open={Boolean(aboutMenu)}
                                    onClose={closeAboutMenu}
                                >
                                    {/* <MenuItem onClick={() => handleMenuClick("/privacy-policy")}>
                                        <ListItemIcon><PrivacyTipIcon /></ListItemIcon>
                                        <ListItemText>Privacy Policy</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/term-of-service")}>
                                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                                        <ListItemText>Terms of Service</ListItemText>
                                    </MenuItem> */}
                                    <MenuItem onClick={() => handleMenuClick("/about")}>
                                        <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                                        <ListItemText>About</ListItemText>
                                    </MenuItem>
                                </Menu>

                        </Box>
                    </Toolbar>
                ) : (
                    <Box></Box>
                ) }
                
            </AppBar>
        </footer>
    );
}
