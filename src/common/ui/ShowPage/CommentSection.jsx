"use client";
import Loader from "@/common/components/Loader";
import Comment from "./Comment";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const CommentSection = ({ params }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const movieId = params.id;
  const [token, setToken] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setToken(localStorage?.getItem("marvel-token"));
    fetchComments();
  }, [movieId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?movieId=${movieId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      toast({
        description: "Unable to load comments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (
      !newComment.trim() || newComment.length < 1 || newComment.length > 500
    ) {
      toast({
        description: "Comment must be between 1 and 500 characters.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          comment: newComment,
          movieId,
        }),
      });

      if (response.ok) {
        setLoading(true);
        await fetchComments();
        setNewComment("");
      }
    } catch (error) {
      toast({
        description: "Failed to post comment",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 flex flex-col lg:px-20 px-6" id="comment-section">
      {loading && <Loader />}
      {!loading && (
        <>
          {token?.length > 0
            ? (
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:outline-none resize-none overflow-hidden"
                  rows={1}
                  maxLength={500}
                  style={{ maxHeight: "6rem", minHeight: "2rem" }}
                />
                <button
                  type="submit"
                  className="mt-2 p-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
                >
                  Post Comment
                </button>
              </form>
            )
            : (
              <div className="flex flex-col items-center gap-y-2">
                <Link
                  href="/login"
                  className="text-white text-center bg-red-600 px-4 py-2 rounded-md"
                >
                  Login to post a comment
                </Link>
              </div>
            )}
          {comments.length === 0 && (
            <div className="flex pt-4 flex-row justify-center items-center gap-x-2">
              <div className="h-[0.5px] rounded-md bg-white w-1/4"></div>
              <p className="text-white text-xs">No comments</p>
              <div className="h-[0.5px] bg-white rounded-md w-1/4"></div>
            </div>
          )}
          {comments.length > 0 && (
            <>
              <div className=" flex w-full h-[0.5px] bg-white my-8"></div>
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                />
              ))}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default CommentSection;
