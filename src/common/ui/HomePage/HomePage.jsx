"use client";
import MoviesGrid from "@/common/components/HomePage/MoviesGrid";
import Searchbar from "@/common/components/HomePage/Searchbar";
import Navbar from "@/common/components/Navbar";
import MarvelMovies from "@/data/MarvelMovies";
import React, { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
      <Searchbar search={search} handleSearch={setSearch} />
      <MoviesGrid movies={MarvelMovies} searchedContent={search} />
    </>
  );
};

export default HomePage;
