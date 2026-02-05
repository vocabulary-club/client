import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography, 
    Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const showAuth = path !== "/" && path !== "/login";
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
        navigate("/login", { replace: true });
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
                        {/* Left - User */}
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
                                <AccountCircleIcon />
                            </IconButton>
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
                                <AccountCircleIcon />
                            </IconButton>                      
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
                            <Button color="inherit" onClick={() => handleMenuClick("/")}>
                                Home
                            </Button>

                            <Button color="inherit" onClick={() => handleMenuClick("/manage")}>
                                New Word
                            </Button>

                            <Button
                                color="inherit"
                                endIcon={<ArrowDropDownIcon />}
                                onClick={openTestMenu}
                            >
                                Test
                            </Button>

                                <Menu
                                    anchorEl={testAnchor}
                                    open={Boolean(testAnchor)}
                                    onClose={closeTestMenu}
                                >
                                    <MenuItem onClick={() => handleMenuClick("/test1")}>Test 1</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/test2")}>Test 2</MenuItem>
                                </Menu>

                            <Button
                                color="inherit"
                                endIcon={<ArrowDropDownIcon />}
                                onClick={openAboutMenu}
                            >
                                About
                            </Button>

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
