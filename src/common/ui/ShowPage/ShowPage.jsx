import Navbar from "@/common/components/Navbar";
import React from "react";
import ShowDetails from "./ShowDetails";
import CommentSection from "./CommentSection";

const ShowPage = ({ params }) => {
  return (
    <>
      <Navbar />
      <ShowDetails params={params} />
      <CommentSection params={params} />
    </>
  );
};

export default ShowPage;
