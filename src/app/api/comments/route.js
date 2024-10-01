import Comments from "@/model/Comments";
import MongoConnect from "@/utils/mongoConnect";
import jwt from "jsonwebtoken";

MongoConnect();

export async function POST(req) {
  try {
    const { token, comment, movieId } = await req.json();
    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    const newComment = new Comments({ movieId, username, comment });
    await newComment.save();

    return new Response(
      JSON.stringify({ message: "Comment added successfully" }),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Comment creation failed:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const movieId = url.searchParams.get("movieId");

    if (!movieId) {
      return new Response(JSON.stringify({ message: "Movie ID is required" }), {
        status: 400,
      });
    }

    const comments = await Comments.find({ movieId });
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Comment retrieval failed:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
