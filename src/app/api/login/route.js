import MongoConnect from "@/utils/mongoConnect";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import User from "@/model/User";

MongoConnect();

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const user = await User.findOne({ username });

    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({ token, message: "Login successful" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Login failed:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
