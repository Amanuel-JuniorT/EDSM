import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import { generateToken } from "../lib/utils.js";
import { sendMail } from "../lib/sendmail.js"; // Import the sendMail function

export const signup = async (req, res) => {
  const { email, password } = req.body;

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
      isVerified: false,
      kycStatus: "not_started",
    });

    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }

    await newUser.save(); // Save the user to the database

    // Generate token and set cookie
    generateToken(newUser._id, res); // Generate token and set cookie

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

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

    rememberMe && generateToken(user._id, res); // Generate token and set cookie

    res.status(200).json({ message: "Login successful" });
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

// export const verifyEmail = async (req, res) => {
//   const user = req.user;

//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const { _id: userId, email, isVerified } = user; // Get user ID and email from the request

//   // Check if user is already verified
//   if (isVerified) {
//     return res.status(400).json({ message: "User already verified" });
//   }

//   try {
//     // Find OTP
//     let otp = await OTP.findOne({ userId, purpose: "verify_email" });

//     if (!otp || otp.expiresAt < Date.now()) {
//       otp && (await OTP.deleteOne({ _id: otp._id })); // Delete expired OTP

//       const code = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit code

//       otp = new OTP({
//         userId,
//         code,
//         purpose: "verify_email", // Purpose of the OTP
//         expiresAt: Date.now() + 10 /*min*/ * 60 /*sec*/ * 1000 /*millisec*/, // OTP expires in 10 minutes
//       });

//       console.log("OTP:", otp);
//       await otp.save(); // Save the OTP to the database

//       console.log("OTP saved to database:", otp);
//       //Send OTP to user's email (you can use a service like SendGrid or Nodemailer)
//       // TODO
//       //await sendMail(email, "Verify your email", `Your OTP is ${code}`)

//       res.status(200).json({ message: `${otp}: OTP sent to your email` });
//     } else {
//       // OTP already exists and is not expired
//       //TODO
//       // Send OTP to user's email (you can use a service like SendGrid or Nodemailer)
//       // await sendMail(email, "Verify your email", `Your OTP is ${code}`)

//       console.log("OTP already sent, please check your email");

//       res
//         .status(400)
//         .json({ message: "OTP already sent, please check your email" });
//     }

//     const { usercode } = req.body;
//     const mycode = otp.code; // Assign the OTP code to the variable
//     // console.log("OTP code:", mycode , "mycode: ", usercode);

//     if (!usercode) {
//       return res.status(400).json({ message: "Code is required" });
//     }

//     if (mycode != usercode) {
//       return res.status(400).json({ message: "Invalid code" });
//     }

//     console.log(mycode === usercode);
//     // console.log(176);

//     // console.log(180);

//     // // Validate code
//     // if (!usercode) {
//     //   return res.status(400).json({ message: "Code is required" });
//     // }

//     // console.log(187);

//     // // Check if the code matches
//     // if (mycode != usercode) {
//     //   return res.status(400).json({ message: "Invalid code" });
//     // }

//     // console.log(195);

//     // await User.findByIdAndUpdate(userId, { isVerified: true }); // Update user verification status

//     // console.log(200);

//     // await OTP.deleteOne({ _id: otp._id }); // Delete the OTP

//     // console.log(205);

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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
    return res.status(200).json({ otpSent: true });
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
    return res.status(200).json({ otpMatches: true, message: "OTP matches" });
  } catch (error) {
    console.error("Error at verifyOTP: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
