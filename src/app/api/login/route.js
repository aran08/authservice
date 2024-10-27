import { NextResponse } from "next/server";
import connectDB from "@/lib/Db";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();

    // Check for required fields
    const requiredFields = ["email", "password"];
    const missingFields = requiredFields.filter(
      (field) => !body[field]?.trim()
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}`},
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: body.email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // User login successful
    return NextResponse.json(
      {
        message: "Login successful",
        data: {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
