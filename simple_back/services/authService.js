import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const AUTH_URL = process.env.AUTH_URL;

export async function authenticateUser() {
    try {
        const response = await axios.post(AUTH_URL, {
            email: process.env.EMAIL,
            name: process.env.NAME,
            rollNo: process.env.ROLL_NO,
            accessCode: process.env.ACCESS_CODE,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Authentication error:", error.response?.data || error.message);
        throw new Error("Failed to authenticate.");
    }
}
