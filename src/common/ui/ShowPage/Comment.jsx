import formatDate from "@/utils/formatDate";
import Image from "next/image";
import React from "react";

const Comment = ({ comment }) => {
  const { username, comment: text, createdAt } = comment;

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-3 border border-red-700">
      <div className="flex items-center gap-x-3">
        <Image
          src="/user-profile.svg"
          width={40}
          height={40}
          className="rounded-full w-10 h-10 bg-white border-[0.25px]"
          alt="Profile"
        />
        <p className="font-bold text-red-600">
          {username}
          <span className="mx-2 text-gray-200 font-light">
            ⏺️ {formatDate(createdAt)}
          </span>
        </p>
      </div>
      <div className="mt-2 text-base">
        <p className="text-gray-100">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
