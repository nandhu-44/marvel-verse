import { movieCategorizer } from "@/utils/moviesUtil";
import React from "react";
import MovieCategory from "./MovieCategory";

const MoviesGrid = ({ movies, searchedContent }) => {

  const filteredMovies = movies.filter((movie) => {
    const isTitleMatched = movie.title.toLowerCase().includes(
      searchedContent.toLowerCase(),
    );
    const isGenreMatched = movie.genres.filter((genre) =>
      genre.name.toLowerCase().includes(searchedContent.toLowerCase())
    ).length > 0;
    const isCastMatched = movie.cast.filter((actor) =>
      actor.name.toLowerCase().includes(searchedContent.toLowerCase())
    ).length > 0;
    return isTitleMatched || isGenreMatched || isCastMatched;
  });

  const {
    upcomingMovies,
    popularMovies,
    recentMovies,
    remainingMovies,
    oldMovies,
  } = movieCategorizer(filteredMovies);

  return (
    <div className="flex flex-col lg:px-32 px-4 gap-6">
      {upcomingMovies.length > 0 || popularMovies.length > 0 ||
          recentMovies.length > 0 || remainingMovies.length > 0 ||
          oldMovies.length > 0
        ? (
          <>
            <MovieCategory title="Upcoming" movies={upcomingMovies} />
            <MovieCategory title="Popular" movies={popularMovies} />
            <MovieCategory title="New Releases" movies={recentMovies} />
            <MovieCategory title="Underrated" movies={remainingMovies} />
            <MovieCategory title="Classics" movies={oldMovies} />
          </>
        )
        : (
          <h1 className="text-white text-xl mt-8 font-semibold text-center">
            ❌ No movies found ❌
          </h1>
        )}
    </div>
  );
};

export default MoviesGrid;
