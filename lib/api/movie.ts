import { Movie, MovieResponse } from "@/types/movie";
import { instance } from "../api"

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await instance.get<MovieResponse>('/movie/popular?language=en-US&page=1');
  return response.data.results;
}

export const getRandomMovie = async (): Promise<Movie> => {
  const response = await instance.get<MovieResponse>('/movie/popular');
  const randomNumber = Math.floor(Math.random() * 20);
  return response.data.results[randomNumber];
}