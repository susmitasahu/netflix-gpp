import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ poster_path }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="Movie-Card" src={IMG_CDN_URL + poster_path} />
    </div>
  );
};
export default MovieCard;
