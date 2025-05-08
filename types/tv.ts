export type TVResponse = {
  page: number;
  result: TV[];
  total_page: number;
  total_result: number;
}

export type TV = {
  id: number;
  backdrop_path: string;
  name: string;
  poster_path: string;
  vote_average: number;
}