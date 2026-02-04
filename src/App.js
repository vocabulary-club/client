import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/0_Login";
import Home from "./pages/1_Home";
import Test1 from "./pages/2_Test1";
import Test2 from "./pages/2_Test2";
import Test3 from "./pages/2_Test3";
import Manage from "./pages/3_Manage";
import Settings from "./pages/7_Settings";
import User from "./pages/8_User";
import Menu from "./pages/9_Menu";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./layouts/Theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/test1"
                            element={
                                <ProtectedRoute>
                                    <Test1 />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/test2"
                            element={
                                <ProtectedRoute>
                                    <Test2 />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/test3"
                            element={
                                <ProtectedRoute>
                                    <Test3 />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/manage"
                            element={
                                <ProtectedRoute>
                                    <Manage />
                                </ProtectedRoute>
                            }
                        />                    
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute>
                                    <User />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/menu"
                            element={
                                <ProtectedRoute>
                                    <Menu />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                </Routes>
            </AuthProvider>
        </ThemeProvider> 
    );
}

export default App;
