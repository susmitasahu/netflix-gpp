import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = movieId => {
  const dispatch = useDispatch();
  //fetch trailer type movies and updating store with trailer data
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const jsonData = await data.json();

    const filterData = jsonData.results.filter(
      video => video.type === "Trailer"
    );
    const trailer = filterData.length ? filterData[0] : jsonData.results;
    console.log("trailer", trailer);
    // setTrailerId(trailer.key);
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
