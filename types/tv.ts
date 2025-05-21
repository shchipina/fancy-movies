 export interface TV {
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

export interface TVDetails extends TV {
  genres: { id: number; name: string }[];
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  origin_country: string[];
};

export type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
};

export type VideoResponse = {
  results: Video[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CreditsResponse = {
  cast: CastMember[];
};

export type Review = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

export type ReviewResponse = {
  results: Review[];
};

export type TVShowDetailsResponse = {
  details: TVDetails;
  video: VideoResponse;
  credits: CreditsResponse;
  review: ReviewResponse;
};