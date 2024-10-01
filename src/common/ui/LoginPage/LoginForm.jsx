"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        window.localStorage.setItem("marvel-token", data.token);
        toast({
          description: "Login successful. Welcome back!",
          variant: "success",
        });
        router.push("/");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData?.message || "Login failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center pt-28 lg:pt-0 lg:justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl lg:text-6xl text-red-600 mb-6 font-semibold">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-800 p-4 lg:p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <button
          type="submit"
          className="p-3 bg-red-600 rounded text-white hover:bg-red-700 transition duration-200"
        >
          Login
        </button>
        <span className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/create-account" className="text-red-600 font-bold">
            Create one
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
