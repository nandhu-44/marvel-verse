import MongoConnect from "@/utils/mongoConnect";
import bcrypt from "bcryptjs";
import User from "@/model/User";
import jwt from "jsonwebtoken";

MongoConnect();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username },
      process.env.JWT_SECRET,
    );

    return new Response(
      JSON.stringify({ token, message: "User created successfully" }),
      { status: 201 },
    );
  } catch (error) {
    console.error("User creation failed:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
