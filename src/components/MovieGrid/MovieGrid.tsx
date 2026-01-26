import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";

const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;