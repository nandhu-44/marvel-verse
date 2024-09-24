import { movieCategorizer } from "@/utils/moviesUtil";
import React from "react";
import MovieCategory from "./MovieCategory";

const MoviesGrid = ({ movies }) => {
  const {
    upcomingMovies,
    popularMovies,
    recentMovies,
    remainingMovies,
    oldMovies,
  } = movieCategorizer(movies);

  return (
    <div className="flex flex-col lg:px-32 px-4 gap-6">
      <MovieCategory title="Upcoming" movies={upcomingMovies} />
      <MovieCategory title="Popular" movies={popularMovies} />
      <MovieCategory title="New Releases" movies={recentMovies} />
      <MovieCategory title="Underrated" movies={remainingMovies} />
      <MovieCategory title="Classics" movies={oldMovies} />
    </div>
  );
};

export default MoviesGrid;
