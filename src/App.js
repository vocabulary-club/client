import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/0_Login";
import NotFound from "./pages/0_NotFound";
import Home from "./pages/1_Home";
import Manage from "./pages/2_Manage";
import Test1 from "./pages/3_Test1";
import Test2 from "./pages/3_Test2";
import Test3 from "./pages/3_Test3";
import About from "./pages/6_About";
import DataDeletion from "./pages/6_DataDeletion";
import PrivacyPolicy from "./pages/6_PrivacyPolicy";
import TermsOfService from "./pages/6_TermsOfService";
import Settings from "./pages/7_Settings";
import User from "./pages/8_User";
import Menu from "./pages/9_Menu";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { LangProvider } from "./contexts/LangContext";
import MainLayout from "./layouts/MainLayout";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./layouts/Theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LangProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/data-deletion" element={<DataDeletion />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/term-of-service" element={<TermsOfService />} />
                        <Route path="*" element={<NotFound />} />

                        <Route element={<MainLayout />}>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Home />
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
                                path="/about"
                                element={
                                    <ProtectedRoute>
                                        <About />
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
            </LangProvider>
        </ThemeProvider> 
    );
}

export default App;
