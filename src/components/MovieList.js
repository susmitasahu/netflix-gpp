import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 bg-black">
      <h2 className="text-3xl py-4 text-white">
        {title}
      </h2>
      <div className="flex overflow-x-scroll">
        <div className="flex">
        {movies && movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie.id} poster_path={movie?.poster_path} />
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
