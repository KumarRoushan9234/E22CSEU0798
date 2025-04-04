import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
