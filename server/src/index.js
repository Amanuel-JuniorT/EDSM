import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import stocksRoutes from "./routes/stocks.route.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js"; // Import the user route

const app = express();

config(); // Load environment variables from .env file

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoutes); // Use the signup function directly here

app.use("/api/stocks", stocksRoutes); // Use the stocks routes

app.use("/api/user", userRoute); // Use the user routes

app.listen("5000", () => {
  console.log("Server is running on port 5000");
  connectDB();
});
