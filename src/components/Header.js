import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MenuItem = ({ icon, label, onClick }) => {
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
            <Typography variant="caption" sx={{ mt: -0.5, fontSize: 10, lineHeight: 1 }}>
                {label}
            </Typography>
        </Box>
    );
};

export default function Header() {
    
    const navigate = useNavigate();    
    
    const handleClick = (name) => {
        switch(name) {
            case "user" :
                navigate("/user", { replace: true });
                break;
            default :
                navigate("/", { replace: true });
                break;

        }
    };

    return (
        <header>
            <AppBar
                position="fixed"
                sx={{
                    top: 0,
                    height: 48,
                    overflow: "hidden",
                }}
                >
                <Toolbar
                    disableGutters
                    sx={{
                        height: 48,
                        width: "100%",
                        minHeight: "48px !important",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 1,
                        overflow: "hidden",
                    }}
                    >

                    {/* Logo */}
                    <Box
                        sx={{
                            width: 96,
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => handleClick("logo")}
                    >
                        <Box
                            component="img"
                            src="/logo192.png"
                            alt="logo"
                            sx={{ height: 26, width: 26 }}
                        />
                    </Box>


                    {/* Menus */}
                    <Box
                        sx={{
                            width: 96,              // same width
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MenuItem icon={<AccountCircleIcon />} label="User" onClick={() => handleClick("user")} />
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}