import axios from "axios";
import { END_POINTS_MOVIES_DATA } from "../utils/constants.js";
import { OPTIONS_API } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { getUpcomingMovies } from "../redux/movieSlice.js";

const useUpcomingMovies = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(
      END_POINTS_MOVIES_DATA.upcomingMovies,
      OPTIONS_API
    );
    dispatch(getUpcomingMovies(res.data.results));
  } catch (error) {
    console.log(error);
  }
};

export default useUpcomingMovies;
