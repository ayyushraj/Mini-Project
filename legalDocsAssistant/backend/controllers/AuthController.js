/* eslint-disable no-undef */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import dotenv from "dotenv";

// dotenv.config();

const jwtKey = "myjwtkey";

export const signupRoute = async (req, res) => {
    const { username, email, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = new User({
        username,
        email,
        password: hashedPassword, 
      });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create user" });
    }
  };

export const loginRoute = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const tokenPayload = {email: user.email, username: user.username };

    const token = jwt.sign(tokenPayload, jwtKey, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const getUserDetailsRoute = async (req, res) => {
    try {
      const email = req.headers.authorization.split(' ')[1];
      const user = await User.findOne({ email }).select('profilePicUrl username email usn'); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ profilePicUrl: user.profilePicUrl ,username: user.username, usn: user.usn});
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

