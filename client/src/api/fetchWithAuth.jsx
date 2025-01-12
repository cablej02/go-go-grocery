import Auth from "../utils/auth";

const fetchWithAuth = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });

        if (response.status === 401) {
            console.log("Unauthorized, logging out...");
            Auth.logout();
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error) {
        console.log("API Error", error);
        navigate('/login');
    }
}

export default fetchWithAuth;