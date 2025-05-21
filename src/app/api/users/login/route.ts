import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Ensure MongoDB connection (called once, reused across requests)
let isConnected = false;
async function ensureConnection() {
  if (!isConnected) {
    await connect();
    isConnected = true;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await ensureConnection();

    // Parse request body
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Validate TOKEN_SECRET
    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: { id: user._id, email: user.email, username: user.username },
      });

      response.cookies.set("token",token,{httpOnly:true})
    // Return response with token
    return response
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}