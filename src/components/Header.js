import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography, 
    Button, Menu, Avatar, Divider, ListSubheader, 
    MenuList, MenuItem, ListItemIcon, ListItemText, } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuIcon from "@mui/icons-material/Menu";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ShieldIcon from "@mui/icons-material/Shield";
import GavelIcon from "@mui/icons-material/Gavel";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

import { useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {

    const { lang, setLang } = useLang();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { user, logout } = useAuth();

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

    const handleLogout = (e) => {
        logout();
    }

    return (
        <header>
            <AppBar position="fixed" sx={{ height: 52 }}>
                
                {isMobile ? (
                    <Toolbar
                        disableGutters
                        sx={{
                            height: 52,
                            minHeight: "52px !important",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 1,
                            overflow: "hidden",
                        }}
                    >
                        {/* LEFT USER AREA */}
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <IconButton
                                sx={{ color: "white" }}
                                onClick={() => handleMenuClick("/user")}
                            >
                                {user?.pictureUrl ? 
                                    (
                                        <Avatar
                                            src={user.pictureUrl}
                                            alt="User"
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    ) : 
                                    (
                                        <AccountCircleIcon />
                                    )
                                }
                                
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >  
                            {/* RIGHT LANGUAGE AREA */}
                            <Box
                                sx={{
                                    width: 60,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >                              
                                <Button
                                    color="inherit"
                                    onClick={() => setLang(lang == "en" ? "mn" : "en")}
                                    sx={{fontSize: 20, width: 120, }}
                                >
                                    {Languages[lang].language}
                                </Button>
                            </Box>

                            {/* RIGHT USER AREA */}
                            <Box
                                sx={{
                                    width: 60,               // symmetric with left
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <IconButton color="inherit" onClick={(e) => handleLogout(e)}>
                                    <LogoutIcon />
                                </IconButton>
                            </Box>
                        </Box>

                    </Toolbar>
                    ) : ( 
                    <Toolbar
                        disableGutters
                            sx={{
                            height: 52,
                            minHeight: "52px !important",
                            px: 2,
                            display: "flex"
                        }}
                    >
                        {/* LEFT USER AREA */}
                        <Box
                            sx={{
                                width: 60,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >  
                            <IconButton
                                sx={{ color: "white" }}
                                onClick={() => handleMenuClick("/user")}
                            >
                                {user?.pictureUrl ? 
                                    (
                                        <Avatar
                                            src={user.pictureUrl}
                                            alt="User"
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    ) : 
                                    (
                                        <AccountCircleIcon />
                                    )
                                }
                                
                            </IconButton>
                        </Box>

                        {/* LEFT EMPTY AREA */}
                        <Box
                            sx={{
                                width: 60,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >  
                        </Box>

                        {/* CENTER MENUS */}
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                gap: 2
                            }}
                        >
                            <Button color="inherit" onClick={() => handleMenuClick("/")} sx={{fontSize: 20, width: 120, }} >
                                {Languages[lang].home}
                            </Button>

                            <Button color="inherit" onClick={() => handleMenuClick("/manage")} sx={{fontSize: 20, width: 120, }} >
                                {Languages[lang].addWord}
                            </Button>

                            <Button
                                color="inherit"
                                endIcon={<ArrowDropDownIcon />}
                                onClick={openTestMenu}
                                sx={{fontSize: 20, width: 120, }}
                            >
                                {Languages[lang].test}
                            </Button>

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

                            <Button
                                color="inherit"
                                endIcon={<ArrowDropDownIcon />}
                                onClick={openAboutMenu}
                                sx={{fontSize: 20, width: 120, }}
                            >
                                {Languages[lang].about}
                            </Button>

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

                        {/* RIGHT LANGUAGE AREA */}
                        <Box
                            sx={{
                                width: 60,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >                              
                            <Button
                                color="inherit"
                                onClick={() => setLang(lang == "en" ? "mn" : "en")}
                                sx={{fontSize: 20, width: 120, }}
                            >
                                {Languages[lang].language}
                            </Button>
                        </Box>

                        {/* RIGHT USER AREA */}
                        <Box
                            sx={{
                                width: 60,               // symmetric with left
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <IconButton color="inherit" onClick={(e) => handleLogout(e)}>
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>                                        
                )}
                
            </AppBar>
        </header>
    );
}
