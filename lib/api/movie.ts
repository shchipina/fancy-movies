import { Movie, MovieDetails, MovieResponse } from "@/types/movie";
import { instance } from "../api"

export const getMoviesList = async (page: number): Promise<MovieResponse> => {
  const response = await instance.get<MovieResponse>(`/movie/popular?language=en-US&page=${page}`);
  return response.data;
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await instance.get<MovieResponse>('/trending/movie/day?language=en-US&page=1');
  return response.data.results;
}

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await instance.get<MovieResponse>('/movie/upcoming?language=en-US&page=1');
  return response.data.results;
}

export const getRandomMovie = async (): Promise<Movie> => {
  const response = await instance.get<MovieResponse>('/movie/popular');
  const randomNumber = Math.floor(Math.random() * 20);
  return response.data.results[randomNumber];
}

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  try {
    const [detailsMovie, videoMovie, credirsMovie, reviewMovie] = await Promise.all([
      instance.get(`/movie/${id}?language=en-US`),
      instance.get(`/movie/${id}/videos?language=en-US`),
      instance.get(`/movie/${id}/credits`),
      instance.get(`/movie/${id}/reviews`)
    ]);

    return {
      details: detailsMovie.data,
      video: videoMovie.data,
      credits: credirsMovie.data,
      review: reviewMovie.data
    }
  } catch (error) {
    console.log("Error, ", error);
    throw error;
  }
}

export const getRecommendationByMovie = async (id: string) => {
  const response = await instance.get(`/movie/${id}/recommendations?language=en-US&page=1`);

  return response.data;
}