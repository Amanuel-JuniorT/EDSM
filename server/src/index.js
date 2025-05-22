import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

config(); // Load environment variables from .env file
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoutes); // Use the signup function directly here
// app.use("/api/auth", router); // Use the signup function directly here

app.get("/login", (req, res) => {
  return res.status(200).json({ message: "Login successful" });
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
  connectDB();
});
