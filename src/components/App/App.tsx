import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const paginationStyles = `
  .pagination { display: flex; justify-content: center; list-style: none; gap: 10px; padding: 20px; }
  .pagination li a { padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; text-decoration: none; color: black; }
  .pagination li.selected a { background-color: #007bff; color: white; border-color: #007bff; }
  .pagination li:hover:not(.selected) a { background-color: #eee; }
`;

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const isNotFound = data && data.results.length === 0 && !isLoading;

  return (
    <div style={{ padding: "20px" }}>
      <style>{paginationStyles}</style>
      
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      
      {(isError || isNotFound) && <ErrorMessage />}

      {data && data.results.length > 0 && !isError && (
        <>
          <MovieGrid movies={data.results} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => setPage(e.selected + 1)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.min(data.total_pages, 500)}
            previousLabel="< previous"
            containerClassName="pagination"
            activeClassName="selected"
            forcePage={page - 1}
          />
        </>
      )}
    </div>
  );
};

export default App;