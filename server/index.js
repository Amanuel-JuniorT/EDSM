import express from "express";
import { connectDB } from "./lib/db.js";
// import { router } from "./auth.route.js";
import {config} from "dotenv";
import {signup} from "./controller/auth.controller.js";

const app = express();

// app.use(config());
app.use(express.json());

app.post("/api/auth/signup", signup); // Use the signup function directly here


app.listen("5000", () => {
  console.log("Server is running on port 5000");
  connectDB();
});
