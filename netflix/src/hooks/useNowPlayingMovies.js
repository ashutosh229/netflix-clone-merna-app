import axios from "axios";
import { END_POINTS_MOVIES_DATA } from "../utils/constants";
import { OPTIONS_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getNowPlayingMovies } from "../redux/movieSlice";

const useNowPlayingMovies = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(
      END_POINTS_MOVIES_DATA.nowPlayingMovies,
      OPTIONS_API
    );
    dispatch(getNowPlayingMovies(res.data.results));
  } catch (error) {
    console.log(error);
  }
};

export default useNowPlayingMovies;
