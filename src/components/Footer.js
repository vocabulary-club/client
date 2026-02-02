import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { languages, currLang } from "./Language";

const t = languages[currLang];

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
            case "test1" :
                navigate("/test1", { replace: true });
                break;
            case "test2" :
                navigate("/test2", { replace: true });
                break;
            case "manage" :
                navigate("/manage", { replace: true });
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
                        <MenuItem icon={<HomeIcon />} label={t.home} onClick={() => handleClick("home")} />
                        <MenuItem icon={<MenuBookIcon />} label={t.test1} onClick={() => handleClick("test1")} />                        
                        <MenuItem icon={<MenuBookIcon />} label={t.test2} onClick={() => handleClick("test2")} />
                        <MenuItem icon={<PostAddIcon />} label={t.newWord} onClick={() => handleClick("manage")} />
                    </Box>
                </Toolbar>
            </AppBar>
        </footer>
    );
}
