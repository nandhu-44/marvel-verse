function movieCategorizer(movies, popularityThreshold = 50) {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  const upcomingMovies = [];
  const oldMovies = [];
  const remainingMovies = [];
  const recentMovies = [];
  const popularMovies = [];

  const recentTime = 365 * 24 * 60 * 60 * 1000;

  movies.forEach((movie) => {
    const movieDate = new Date(movie.release_date);
    const movieTime = movieDate.getTime();

    if (currentTime < movieTime) {
      upcomingMovies.push(movie);
    } else {
      const differenceInDays = (currentTime - movieTime) / (1000 * 3600 * 24);

      if (differenceInDays > 15 * 365) {
        oldMovies.push(movie);
      } else {
        remainingMovies.push(movie);
      }

      if (currentTime - movieTime <= recentTime) {
        recentMovies.push(movie);
      }

      if (movie.popularity >= popularityThreshold) {
        popularMovies.push(movie);
      }
    }
  });

  // Removing recent movies from remaining movies
  recentMovies.forEach((recentMovie) => {
    const index = remainingMovies.findIndex((movie) =>
      movie.id === recentMovie.id
    );
    if (index !== -1) {
      remainingMovies.splice(index, 1);
    }
  });

  return {
    upcomingMovies,
    oldMovies,
    remainingMovies,
    recentMovies,
    popularMovies,
  };
}

export { movieCategorizer };
