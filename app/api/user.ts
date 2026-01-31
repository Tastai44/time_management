import axios from "axios";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            email: email,
            password: password
        });
        localStorage.setItem("token", response.data);
        return response.data; // return data if needed
    } catch (error) {
        console.error("Failed to login:", error);
        throw error; // rethrow error for further handling if needed
    }
};

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            name: name,
            email: email,
            password: password
        });
        // console.log("Login successful:", response.data);
    } catch (error) {
        console.error("Failed to login:", error);
        throw error; // rethrow error for further handling if needed
    }
};