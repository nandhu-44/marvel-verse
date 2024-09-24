"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(true);

  const handleLogout = () => {
    setUser(false);
  };

  return (
    <nav className="flex justify-between bg-slate-950 py-4 px-4 lg:px-32 z-50">
      {/* Logo */}
      <Link href={"/"}>
        <Image
          src="/marvelLogo.png"
          width={100}
          height={100}
        />
      </Link>

      {/* Login / ( Logout & Profile) */}

      {user ? (
        <div className="flex gap-x-2 lg:gap-x-4 items-center">
          <Link
            href={"/profile"}
            className="rounded-full bg-slate-700"
          >
            <Image
              src="/user-profile.svg"
              width={100}
              height={100}
              className="rounded-full text-white w-[44px] h-[44px] bg-white p-[1px]"
            />
          </Link>
          <button
            onClick={() => handleLogout()}
            className="bg-red-600 text-white text-center py-2 px-4 font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href={"/login"}
          onClick={(e) => {
            e.preventDefault();
            setUser(true);
          }}
          className="flex items-center"
        >
          <button className="bg-red-600 text-white text-center py-2 px-4 font-semibold">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
