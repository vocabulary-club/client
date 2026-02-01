import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/0_Login";
import Home from "./pages/1_Home";
import Check from "./pages/2_1_Check";
import Quick from "./pages/2_2_Quick";
import Test from "./pages/2_3_Test";
import Manage from "./pages/3_Manage";
import Settings from "./pages/7_Settings";
import User from "./pages/8_User";
import Menu from "./pages/9_Menu";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (        
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/check"
                        element={
                            <ProtectedRoute>
                                <Check />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quick"
                        element={
                            <ProtectedRoute>
                                <Quick />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/test"
                        element={
                            <ProtectedRoute>
                                <Test />
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
    );
}

export default App;
