import React, { useEffect } from "react";
import Header from "./Header.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer.js";
import MovieContainer from "./MovieContainer.js";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";
import SearchMovies from "./SearchMovies.js";
import useUpcomingMovies from "../hooks/useUpcomingMovies.js";

const Browse = () => {
  const user = useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const toggle = useSelector((store) => store.movie.toggle);

  //custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <div>
      <Header></Header>
      <div>
        {toggle ? (
          <SearchMovies></SearchMovies>
        ) : (
          <>
            <MainContainer />
            <MovieContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
