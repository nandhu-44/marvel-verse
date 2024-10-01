"use client";
import React, { useRef } from "react";
import Image from "next/image";
import "./MovieCategory.css";
import Link from "next/link";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const MovieCategory = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col my-6">
      <h3 className="text-white py-6 text-2xl font-bold">{title}</h3>
      <div className="bg-slate-950 bg-opacity-50 rounded-md py-4 px-2">
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute -left-6 lg:-left-12 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-1 rounded transition duration-300 hover:bg-gray-700"
          >
            <FiChevronsLeft className="w-6 h-6" />
          </button>
          <div
            ref={sliderRef}
            className="flex horizontal-scroll"
          >
            {movies.map((movie) => (
              <Link
                key={movie.id}
                className="relative w-60 flex-shrink-0 mx-3"
                href={`/show/${movie?.id ?? ""}`}
              >
                <Image
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.title}
                  width={250}
                  height={400}
                  className="rounded-lg w-full h-64 object-cover hover:cursor-pointer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                  <p className="text-sm font-bold">{movie.title}</p>
                  <p className="text-xs">{movie.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute -right-6 lg:-right-12 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-1 rounded transition duration-300 hover:bg-gray-700"
          >
            <FiChevronsRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCategory;
