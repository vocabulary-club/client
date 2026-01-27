import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Quick from "./pages/Quick";
import Test from "./pages/Test";
import Manage from "./pages/Manage";
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
                </Route>

            </Routes>
        </AuthProvider>
    );
}

export default App;
