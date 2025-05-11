export type TV = {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
};

export type TVResponse = {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
};
