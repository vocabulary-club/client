import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

export default function Home() {

    const [homeData, setHomeData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${ApiService.apiUrl}/`)
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text);
                }
                return response.text(); // 👈 IMPORTANT
            }).then((data) => {
                console.log("Fetched data:", data);
                setHomeData(data);
            }).catch((err) => {
                console.error("Fetch error:", err.message);
            });
    }, []);


    const handleUser = () => {
        navigate("/user");
    };

    const handleLogin = () => {
        navigate("/login");
    }

    const handleJoin = () => {
        navigate("/join");
    }

    return (
        <div>
            <h1>Home</h1>
            <p>{homeData}</p>
            <div>
                <button onClick={handleUser}>Go To User</button>
            </div>
            <div>
                <button onClick={handleLogin}>Go To Login</button>
            </div>
            <div>
                <button onClick={handleJoin}>Go To Join</button>
            </div>
        </div>
    );
}