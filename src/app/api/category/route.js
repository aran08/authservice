import { NextResponse } from "next/server";
import connectDB from "@/lib/Db";
import User from "@/model/user";

export async function PATCH(req) {
  const { email, interests } = await req.json();
  console.log("Is interests an array?", Array.isArray(interests));
  try {
    await connectDB();

    // const email = "aranjaish2308@gmail.com";
    // const email = localStorage.getItem("email");
    // console.log("email from local", email);
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { interests: interests} }, 
      { new: true }
    );

    console.log("user", user)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: {
          message: "User updated successfully",
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            interests: user.interests,
          },
        },
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
