import React from "react";
import { BANNER_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/movieSlice.js";
import { getId } from "../redux/movieSlice.js";

const MovieCard = (props) => {
  const dispatch = useDispatch();
  const id = props.key;

  if (props.posterPath === null) return null;

  const handleOpenCard = () => {
    dispatch(getId(id));
    dispatch(setOpen(true));
  };

  return (
    <div className="w-48 pr-2" onClick={handleOpenCard}>
      <img src={`${BANNER_URL}/${props.posterPath}`} alt="movie-banner" />
    </div>
  );
};

export default MovieCard;
