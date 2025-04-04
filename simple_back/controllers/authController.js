import { authenticateUser } from "../services/authService.js";

export async function loginUser(req, res) {
    try {
        const accessToken = await authenticateUser();

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000 
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Authentication failed" });
    }
}

export function logoutUser(req, res) {
    res.clearCookie("access_token");
    res.json({ message: "Logged out successfully" });
}
