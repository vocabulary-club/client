class ApiService {
    static apiUrl = process.env.REACT_APP_API_URL;  

    static renewToken = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/token/renew`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Token renew failed:", errorText);
            return null;
        }

        const authHeader = response.headers.get("Authorization");
        return authHeader?.replace("Bearer ", "");
    };

    static request = async (url, options = {}) => {
        const token = await this.renewToken();

        if (!token) {
            throw new Error("No access token available");
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return response;
    };
    
}

export default ApiService;