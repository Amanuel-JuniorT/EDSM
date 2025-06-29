import express from "express";
import {
  signup,
  login,
  logout,
  sendOTP,
  verifyOTP,
  getUser,
  saveCookie
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

// Route for user data
router.get("/getUser", protectedRoute, getUser)

// Route for user logout
router.post("/logout", logout);

//Route for save cookie
router.get("/saveUser", saveCookie);


export default router;
