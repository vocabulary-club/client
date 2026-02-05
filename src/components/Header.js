import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
    const navigate = useNavigate();

    const handleClick = (name) => {
        switch (name) {
            case "user":
                navigate("/user", { replace: true });
                break;
            case "menu":
                navigate("/menu", { replace: true });
                break;
            default:
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
                    height: 52,
                    overflow: "hidden",
                }}
            >
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
                            onClick={() => handleClick("user")}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>

                    {/* Right - Menu */}
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton
                            sx={{ color: "white" }}
                            onClick={() => handleClick("menu")}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}
