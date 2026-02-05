import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography,
    Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { languages, currLang } from "./Language";

import { useTheme, useMediaQuery } from "@mui/material";

const t = languages[currLang];

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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();

    const [testAnchor, setTestAnchor] = React.useState(null);
    const [aboutMenu, setAboutMenu] = React.useState(null);

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
                            <MyMenuItem icon={<HomeIcon />} label={t.home} onClick={() => handleMenuClick("/")} />
                            <MyMenuItem icon={<PostAddIcon />} label={t.newWord} onClick={() => handleMenuClick("/manage")} />
                            <MyMenuItem 
                                icon={<MenuBookIcon />} 
                                label={t.test} 
                                onClick={openTestMenu} >
                            </MyMenuItem>

                                <Menu
                                    anchorEl={testAnchor}
                                    open={Boolean(testAnchor)}
                                    onClose={closeTestMenu}
                                >
                                    <MenuItem onClick={() => handleMenuClick("/test1")}>Test 1</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/test2")}>Test 2</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/test3")}>Test 3</MenuItem>
                                </Menu>

                            <MyMenuItem 
                                icon={<InfoIcon />} 
                                label={t.about} 
                                onClick={openAboutMenu} >
                            </MyMenuItem>

                                <Menu
                                    anchorEl={aboutMenu}
                                    open={Boolean(aboutMenu)}
                                    onClose={closeAboutMenu}
                                >
                                    <MenuItem onClick={() => handleMenuClick("/privacyPolicy")}>Privacy Policy</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/termsOfService")}>Terms of Service</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/about")}>About</MenuItem>
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
