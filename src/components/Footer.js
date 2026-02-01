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

export default function Footer() {

    const navigate = useNavigate();    

    const handleClick = (name) => {
        switch(name) {
            case "home" :
                navigate("/", { replace: true });
                break;
            case "test" :
                navigate("/check", { replace: true });
                break;
            case "add" :
                navigate("/manage", { replace: true });
                break;
            case "settings" :
                navigate("/settings", { replace: true });
                break;
            case "user" :
                navigate("/user", { replace: true });
                break;
            default :
                navigate("/", { replace: true });
                break;

        }
    };

    return (
        <footer>
            <AppBar
                position="fixed"
                sx={{
                    top: "auto",
                    bottom: 0,
                    height: 48,
                    overflow: "hidden",
                }}
                >
                <Toolbar
                    disableGutters
                    sx={{
                        height: 48,
                        minHeight: "48px !important",
                        justifyContent: "flex-start",
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
                        <MenuItem icon={<HomeIcon />} label="Home" onClick={() => handleClick("home")} />
                        <MenuItem icon={<MenuBookIcon />} label="Test" onClick={() => handleClick("test")} />
                        <MenuItem icon={<AddCircleOutlineIcon />} label="Add" onClick={() => handleClick("add")} />
                        <MenuItem icon={<SettingsIcon />} label="Settings" onClick={() => handleClick("settings")} />
                    </Box>
                </Toolbar>
            </AppBar>
        </footer>
    );
}
