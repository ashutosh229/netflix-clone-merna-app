import axios from "axios";
import { END_POINTS_MOVIES_DATA, OPTIONS_API } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../redux/movieSlice.js";

const usePopularMovies = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(
      END_POINTS_MOVIES_DATA.popularMovies,
      OPTIONS_API
    );
    dispatch(getPopularMovies(res.data.results));
  } catch (error) {
    console.log(error);
  }
};

export default usePopularMovies;
