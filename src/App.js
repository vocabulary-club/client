import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Home from "./pages/Home";
import User from "./pages/User";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (        
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <User />
                            </ProtectedRoute>
                        }
                    />
                </Route>

            </Routes>
        </AuthProvider>
    );
}

export default App;
