import React from "react";
import MovieList from "./MovieList.js";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  const movie = useSelector((store) => store.movie);
  return (
    <div className="bg-black ">
      <div className="-mt-52 relative z-10">
        <MovieList title={"Popular"} movies={movie.popularMovies}></MovieList>
        <MovieList
          title={"Now Playing"}
          movies={movie.nowPlayingMovies}
        ></MovieList>
        <MovieList
          title={"Top Rated"}
          movies={movie.topRatedMovies}
        ></MovieList>
        <MovieList title={"Upcoming"} movies={movie.upcomingMovies}></MovieList>
      </div>
    </div>
  );
};

export default MovieContainer;
