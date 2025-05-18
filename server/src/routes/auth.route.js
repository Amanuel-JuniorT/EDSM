import express from "express";
import {
  signup,
  login,
  logout,
  sendOTP,
  verifyOTP,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route for send otp
router.post("/sendOTP", protectedRoute, sendOTP);

// Route for verify otp
router.post("/verifyOtp", protectedRoute, verifyOTP);

// Route for user logout
router.post("/logout", logout);

// router.post("/test", (req, res) => {
//   const name = req.query.name;
//   console.log(`Name: ${name}`);
//   return res.status(200).json({ message: "Arrived"});

// });

export default router;
