"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("marvel-token")) {
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    setUser(false);
    window.localStorage.removeItem("marvel-token");
  };

  return (
    <nav className="flex justify-between bg-slate-950 py-4 px-4 lg:px-32 z-50">
      {/* Logo */}
      <Link href={"/"}>
        <Image
          src="/marvelLogo.png"
          width={100}
          height={100}
          className="cursor-pointer rounded-sm"
        />
      </Link>

      {user
        ? (
          <div className="flex gap-x-2 lg:gap-x-4 items-center">
            <button
              onClick={() => handleLogout()}
              className="bg-red-600 rounded-md text-white text-center py-2 px-4 font-semibold"
            >
              Logout
            </button>
          </div>
        )
        : (
          <Link
            href={"/login"}
            className="flex items-center"
          >
            <button className="bg-red-600 rounded-md text-white text-center py-2 px-4 font-semibold">
              Login
            </button>
          </Link>
        )}
    </nav>
  );
};

export default Navbar;
