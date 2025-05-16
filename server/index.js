import express from "express";
import { connectDB } from "./lib/db.js";
import { router } from "./auth.route.js";


const app = express();

app.use(express.json());

app.use("/api/auth/signup", router);


app.listen("5000", () => {
  console.log("Server is running on port 5000");
  connectDB();
});
