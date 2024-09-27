import React, { useState } from "react";
import { OPTIONS_API } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setMovieName, setSearchedMoviesList } from "../redux/searchSlice.js";
import { setLoading } from "../redux/userSlice.js";
import MovieList from "./MovieList.js";
import axios from "axios";

const SearchMovies = () => {
  const [searchedMovie, setSearchedMovie] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);
  const { movieName, searchedMoviesList } = useSelector(
    (store) => store.searchMovie
  );

  const searchMovieSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&language=en-US&page=1`,
        OPTIONS_API
      );
      dispatch(setMovieName(searchedMovie));
      dispatch(setSearchedMoviesList(res?.data?.results));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }

    setSearchedMovie("");
  };

  return (
    <>
      <div className="flex justify-center pt-[10%] w-[100%]">
        <form onSubmit={searchMovieSubmitHandler} action="" className="w-[50%]">
          <div className="flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%]">
            <input
              value={searchedMovie}
              onChange={(event) => {
                setSearchedMovie(event.target.value);
              }}
              className="w-full outline-none rounded-md text-lg"
              type="text"
              placeholder="Search for movies"
            />
            <button className="bg-red-800 text-white rounded-md px-4 py-2">
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      {searchedMovie ? (
        <MovieList
          title={movieName}
          searched={true}
          movies={searchedMoviesList}
        />
      ) : (
        <h1>Movie Not Found!!</h1>
      )}
    </>
  );
};

export default SearchMovies;
