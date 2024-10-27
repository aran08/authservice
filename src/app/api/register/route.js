import connectDB from "@/lib/Db";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    const { email, name, password } = await req.json();

    // Simple validation
    if (!email || !name || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      password: hashedPassword,
    });

    await user.save();
    console.log("User registered successfully:", user);
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json({ message: `Internal server error: ${error.message}` }, { status: 500 });
  }
};
