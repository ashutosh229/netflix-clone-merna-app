import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieName: null,
    searchedMoviesList: null,
  },
  reducers: {
    //actions
    setMovieName: (state, action) => {
      state.movieName = action.payload;
    }, //for the name of the searched movie
    setSearchedMoviesList: (state, action) => {
      state.searchedMoviesList = action.payload;
    }, //for the list of movies which came after searching the movie name
    setSearchedMovieDetails: (state, action) => {
      const { name, list } = action.payload;
      state.movieName = name;
      state.searchedMoviesList = list;
    }, //this is the action which can do both the tasks at the same time, we can use this also
  },
});

export const { setMovieName, setSearchedMoviesList, setSearchedMovieDetails } =
  searchSlice.actions;
export default searchSlice.reducer;
