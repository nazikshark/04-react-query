import axios from 'axios';
import type { FetchMoviesResponse } from '../types/movie'; 

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
  const { data } = await axios.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};