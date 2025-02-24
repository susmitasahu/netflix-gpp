import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector(state => state.movies);
  if (!movies) return <h2>Loading...</h2>;

  return (
    <div className="bg-black">
      <div className="-mt-40 pl-12 relative z-10">
        <MovieList title={"New Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"UpComing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Commedy"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
