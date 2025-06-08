import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import Stock from "../models/stock.model.js";
import OTP from "../models/otp.model.js";
import Portfolio from "../models/ownedStock.model.js";

import { generateToken } from "../lib/utils.js";
import { sendMail } from "../lib/sendmail.js"; // Import the sendMail function

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate first and last name
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    // Check if password is strong enough
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      isVerified: false,
      kycStatus: "not_started",
    });

    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }

    await newUser.save(); // Save the user to the database

    await Wallet.create({ userId: newUser._id, balance: 0, currency: "ETB" });

    // Generate token and set cookie
    generateToken(newUser._id, res); // Generate token and set cookie

    res.status(201).json({
      message: "User created successfully",
      user: { ...newUser._doc, balance: 0, stocks: [] },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res); // Generate token and set cookie

    // Check if user has a wallet, if not create one
    let wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet) {
      wallet = await Wallet.create({
        userId: user._id,
        balance: 0,
        currency: "ETB",
      });
    }

    // Check if user has a portfolio, if not create one
    const portfolio = await Portfolio.find({ userId: user._id });

    let stocks = [];

    if (portfolio && portfolio.length > 0) {
      stocks = await Promise.all(
        portfolio.map(async (stock) => ({
          stockId: stock.stockId,
          quantity: stock.quantity,
          estimatedEarning: await calculateEstimatedEarnings(
            stock.stockId,
            stock.quantity
          ),
        }))
      );
    }

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        isVerified: user.isVerified,
        kycStatus: user.kycStatus,
        balance: wallet.balance,
        stocks: stocks,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }); // Clear the cookie
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user; // Get user from request object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user }); // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const user = req.user; // Get user from request object
    const { _id: userId, email } = user; // Get user ID and email from the request

    const purpose = req.query.purpose; // Get the OTP type from the query parameters

    await OTP.deleteMany({
      $or: [{ expiresAt: { $lte: new Date() } }, { userId, purpose }],
    }); // Delete all expired OTPs and existing OTPs for this user and purpose

    const code = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit code

    // Create and save the OTP model in database
    const otp = await OTP.create({
      userId,
      code,
      purpose,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    //TODO: Send code via email

    console.log(`OTP for ${purpose}:`, code);
    return res.status(200).json({ otpSent: true, code });
  } catch (error) {
    console.error("Error at sendOTP", error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { _id: userId } = req.user; // Get user id
    const purpose = req.query.purpose; // Get OTP purpose
    const { code } = req.body; // Get code from user

    await OTP.deleteMany({ expiresAt: { $lte: new Date() } }); // Delete all expired OTPs

    const otp = await OTP.findOne({ userId, purpose }); // Get OTP from database

    // If OTP not found
    if (!otp) {
      console.log(userId, purpose);

      return res.status(404).json({ message: "OTP not found." });
    }

    // If OTP doesn't match
    if (otp.code !== code) {
      return res
        .status(401)
        .json({ otpMatches: false, message: "OTP doesn't match." });
    }

    await OTP.deleteOne({ _id: otp._id }); // Delete the OTP
    const user = req.user; // Get user from request object

    if (purpose === "verify_email") {
      user.isVerified = true; // Set user as verified
      await user.save(); // Save the user
      console.log("User verified successfully");
    }

    return res
      .status(200)
      .json({ user, otpMatches: true, message: "OTP matches" });
  } catch (error) {
    console.error("Error at verifyOTP: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const saveCookie = async (req, res) => {
  try {
    const { userId } = req.query; // Get user ID from query parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const token = generateToken(userId, res); // Generate token and set cookie

    return res
      .status(200)
      .json({ message: "Cookie saved successfully", token });
  } catch (error) {
    console.error("Error saving cookie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const calculateEstimatedEarnings = async (stockId, quantity) => {
  try {
    const stock = await Stock.findById(stockId); // Fetch stock details from the database
    if (!stock) {
      throw new Error("Stock not found");
    }

    const estimatedEarnings = stock.unitPrice * quantity; // Calculate estimated earnings
    return estimatedEarnings;
  } catch (error) {
    console.error("Error calculating estimated earnings:", error);
    throw error; // Propagate the error
  }
};
