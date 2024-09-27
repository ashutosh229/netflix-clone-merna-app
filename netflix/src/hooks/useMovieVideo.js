import axios from "axios";
import { OPTIONS_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getTrailers } from "../redux/movieSlice";
import { useEffect } from "react";

const useMovieVideo = async (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          OPTIONS_API
        );
        const trailers = res?.data?.results?.filter((item) => {
          return item.type === "Trailer";
        });
        if (trailers.length === 0) {
          const randIndex = Math.floor(
            Math.random() * (res.data.results.length + 1)
          );
          dispatch(getTrailers(res.data.results[randIndex]));
        } else {
          const randIndexTrailer = Math.floor(
            Math.random() * (trailers.length + 1)
          );
          dispatch(getTrailers(trailers[randIndexTrailer]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovieById();
  }, []);
};

export default useMovieVideo;
