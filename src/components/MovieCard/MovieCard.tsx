import type { Movie } from "../../types/movie";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=200";

  return (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "10px" }}>
      <img src={poster} alt={movie.title} style={{ width: "100%", height: "300px", objectFit: "cover" }} />
      <h4 style={{ fontSize: "14px" }}>{movie.title}</h4>
    </div>
  );
};

export default MovieCard;