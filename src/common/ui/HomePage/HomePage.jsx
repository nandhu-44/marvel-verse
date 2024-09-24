import MoviesGrid from "@/common/components/HomePage/MoviesGrid";
import Navbar from "@/common/components/Navbar";
import MarvelMovies from "@/data/MarvelMovies";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MoviesGrid movies={MarvelMovies} />
    </>
  );
};

export default HomePage;
