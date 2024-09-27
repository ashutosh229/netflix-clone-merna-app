import React from "react";
import useMovieVideo from "../hooks/useMovieVideo.js";
import { useSelector } from "react-redux";

const VideoBackground = (props) => {
  const trailer = useSelector((store) => store.movie.trailers);
  const key = trailer?.key;
  const id = props.id;
  const bool = props.bool;
  useMovieVideo(id);

  return (
    <div className="w-[vw] overflow-hidden">
      <iframe
        className={`${bool ? "w-[100%]" : "w-screen aspect-video"}`}
        src={`https://www.youtube.com/embed/${key}?si=rPEaPQ5hIiFMzR69&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
