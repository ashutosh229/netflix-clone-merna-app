import axios from "axios";
import { END_POINTS_MOVIES_DATA } from "../utils/constants.js";
import { OPTIONS_API } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { getTopRatedMovies } from "../redux/movieSlice.js";

const useTopRatedMovies = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(
      END_POINTS_MOVIES_DATA.topRatedMovies,
      OPTIONS_API
    );
    dispatch(getTopRatedMovies(res.data.results));
  } catch (error) {
    console.log(error);
  }
};

export default useTopRatedMovies;
