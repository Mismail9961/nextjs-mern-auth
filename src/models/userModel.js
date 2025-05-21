// src/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean, // Fixed: Changed from String to Boolean
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Create index for email to optimize queries and enforce uniqueness
userSchema.index({ email: 1 }, { unique: true });

// Export the model, ensuring it’s only compiled once
export default mongoose.models.User || mongoose.model("User", userSchema);