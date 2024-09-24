import Navbar from "@/common/components/Navbar";
import SpidermanLoader from "@/common/components/SpidermanLoader";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <SpidermanLoader />
      <div className="flex flex-col justify-center items-center mt-64">
        <h2 className="text-white text-xl text-center px-6 my-6">
          Uh-oh this page looks dusty and boring!
        </h2>
        <Link
          href="/"
          className="font-semibold bg-red-600 text-white py-2 px-4 w-fit items-center text-center"
        >
          Lets Get back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
