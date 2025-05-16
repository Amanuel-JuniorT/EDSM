import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const {email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if password is strong enough
    if(password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      passwordHash: hashedPassword,
      isVerified: false,
      kycStatus: 'not_started'
    });

    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }

    generateToken(newUser._id, res); // Generate token and set cookie
    await newUser.save(); // Save the user to the database

    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  }
  // Check if user already exists
  catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
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

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the cookie
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the request
    const user = await User.findById(userId); // Find the user in the database

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email, kycStatus: user.kycStatus }); // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

