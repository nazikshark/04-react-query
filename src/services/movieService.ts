import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
  const { data } = await movieApi.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
  return data;
};