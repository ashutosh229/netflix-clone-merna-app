import React from "react";
import VideoBackground from "./VideoBackground.js";
import VideoTitle from "./VideoTitle.js";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movie?.nowPlayingMovies
  );
  if (!nowPlayingMovies) {
    return; //concept of early return
  }
  const index = Math.floor(Math.random() * (nowPlayingMovies.length + 1));
  const { overview, id, title } = nowPlayingMovies[index];
  return (
    <div>
      <VideoTitle title={title} overview={overview}></VideoTitle>
      <VideoBackground id={id}></VideoBackground>
    </div>
  );
};

export default MainContainer;
