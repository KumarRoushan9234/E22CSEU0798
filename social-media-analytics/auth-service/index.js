import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

let cachedToken = null;
let tokenExpiry = 0;

async function fetchAuthToken() {
    try {
        if (cachedToken && Date.now() < tokenExpiry) {
            return cachedToken;
        }
        
        const response = await axios.post(AUTH_URL, {
            email: "e22cseu0798@bennett.edu.in",
            name: "kumar roushan",
            rollNo: "e22cseu0798",
            accessCode: "rtCHZJ",
            clientID: "81be855a-973d-4f94-8463-54e935492638",
            clientSecret: "PKGzXGESPwtrrsVW"
        });

        cachedToken = response.data.access_token;
        tokenExpiry = Date.now() + response.data.expires_in * 1000;
        return cachedToken;
    } catch (error) {
        console.error("Error fetching token:", error.message);
        return null;
    }
}

app.get('/auth/token', async (req, res) => {
    const token = await fetchAuthToken();
    if (token) {
        res.json({ token });
    } else {
        res.status(500).json({ error: "Failed to fetch token" });
    }
});

app.listen(4001, () => console.log("Auth Service running on port 4001"));
export { fetchAuthToken };
