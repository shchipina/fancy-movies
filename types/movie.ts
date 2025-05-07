export type Movie = {
  id: number,
  poster_path: string,
  genre_ids: number[],
  original_language: string,
  vote_average: number,
  title: string,
  release_date: string,
  overview: string,
  backdrop_path: string
}

export type MovieResponse = {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}
