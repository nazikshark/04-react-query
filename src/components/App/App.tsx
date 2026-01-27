import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';

import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';

import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isError, isFetching, isSuccess, isPlaceholderData } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
    retry: false,
  });

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  const isNotFound = 
    isSuccess && 
    !isFetching && 
    movies.length === 0 && 
    query !== '' && 
    !isPlaceholderData;

  useEffect(() => {
    if (isNotFound) {
      toast.error('No movies found for your request.');
    }
  }, [isNotFound]);

  const handleSearch = (newQuery: string) => {
    const trimmed = newQuery.trim();
    if (!trimmed || trimmed === query) return;
    setQuery(trimmed);
    setPage(1);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isFetching && !isPlaceholderData && <Loader />}
      {isError && !isFetching && <ErrorMessage />}

      {isNotFound && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No movies found for your request.
        </p>
      )}

      {movies.length > 0 && !isError && (
        <div style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
          
          {/* Пагинация теперь выше сетки */}
          {totalPages > 1 && (
            <div style={{ marginBottom: '20px' }}>
              <ReactPaginate
                pageCount={Math.min(totalPages, 500)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            </div>
          )}

          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;