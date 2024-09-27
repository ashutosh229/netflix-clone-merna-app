import React from "react";
import MovieCard from "./MovieCard.js";

const MovieList = ({ title, movies, searched = false }) => {
  return (
    <div className="px-8">
      <h1
        className={`${searched ? "text-black" : "text-white"} text-3xl py-3 `}
      >
        {title}
      </h1>
      <div className="flex overflow-x-auto no-scrollbar cursor-pointer">
        <div className="flex items-center">
          {movies?.map((movie) => {
            return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
