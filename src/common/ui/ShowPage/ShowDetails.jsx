"use client";
import React from "react";
import { notFound } from "next/navigation";
import MarvelMovies from "@/data/MarvelMovies";
import Image from "next/image";
import {
  FaChevronLeft,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import ShowCast from "./ShowCast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ShowDetails = ({ params }) => {
  const movie = MarvelMovies.find(
    (movie) => movie.id.toString() === params?.id,
  );

  if (!movie) {
    notFound();
  }

  const vote_average = movie.vote_average / 2;
  const formattedRating = vote_average === 0
    ? "NA"
    : parseFloat(vote_average.toFixed(1)) % 1 === 0
    ? vote_average.toFixed(0)
    : vote_average.toFixed(1).replace(/\.?0+$/, "");
  const rating = vote_average;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between pb-6">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <FaChevronLeft className="text-white p-2 rounded-full bg-red-600 w-8 h-8 hover:text-red-600 hover:bg-white" />
        </button>

        <Link
          href={"#comment-section"}
          className="bg-red-600 text-white hover:text-red-600 hover:bg-white py-2 px-3 rounded-md font-semibold"
        >
          View Comments
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row relative">
        <div className="flex flex-col">
          <Link href={movie?.homepage ?? "#"} target="_blank">
            <h1 className="text-4xl font-bold text-white mb-0 lg:hidden hover:cursor-pointer hover:text-red-600 duration-300">
              {movie.title}
            </h1>
          </Link>
          <p className="text-gray-400 my-2 mb-4 lg:hidden">
            ({movie.release_date})
          </p>
        </div>
        <Image
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg lg:w-72"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/lazy.svg"
        />
        <div className="lg:ml-8 mt-4 lg:mt-0">
          <Link href={movie?.homepage ?? "#"} target="_blank">
            <h1 className="text-4xl font-bold text-white hover:cursor-pointer hover:text-red-600 duration-300 hidden lg:block animate-accordion-up">
              {movie.title}
            </h1>
          </Link>

          <p className="text-gray-400 mt-2 hidden lg:block">
            {movie.release_date}
          </p>
          <p className="text-white mt-4">{movie.overview}</p>
          <p className="text-white mt-4">
            Rating:{" "}
            <span className="flex items-center hover:cursor-pointer">
              {Array(fullStars)
                .fill(<FaStar className="text-yellow-400" />)
                .map((star, index) => <span key={index}>{star}</span>)}
              {halfStar === 1 && <FaStarHalfAlt className="text-yellow-400" />}
              {Array(emptyStars)
                .fill(<FaRegStar className="text-yellow-400" />)
                .map((star, index) => <span key={index}>{star}</span>)}
              <span className="ml-2 text-sm text-gray-400">
                {formattedRating}
                {vote_average !== 0 && `/5 (${movie.vote_count} votes)`}
              </span>
            </span>
          </p>

          <div className="mt-4">
            {movie.runtime > 0
              ? <p className="text-white">Runtime: {movie.runtime} minutes</p>
              : <p className="text-white">Runtime: N/A</p>}

            {movie.genres && movie.genres.length > 0
              ? (
                <p className="text-white">
                  Genres: {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
              )
              : <p className="text-white">Genres: N/A</p>}

            {movie.revenue && movie.revenue > 0
              ? (
                <p className="text-white">
                  Revenue: ${movie.revenue.toLocaleString()}
                </p>
              )
              : <p className="text-white">Revenue: N/A</p>}
          </div>

          <ShowCast cast={movie.cast} />
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
