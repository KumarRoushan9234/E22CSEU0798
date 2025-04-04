import { authenticateUser } from "../services/authService.js";

export async function loginUser(req, res) {
    try {
        const accessToken = await authenticateUser();
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,   
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 60 * 60 * 1000 // 1 hour expiration
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Authentication failed" });
    }
}


export function logoutUser(req, res) {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });

    res.json({ message: "Logged out successfully" });
}
