export type Movie = {
  id: number,
  poster_path: string,
  original_language: string,
  vote_average: number,
  title: string,
  release_date: string,
  overview: string,
  backdrop_path: string,
}

//  { id: string, name: string } 
// винести

export type Details = {
  backdrop_path: string,
  genres: { id: string, name: string }[],
  homepage: string,
  origin_country: string[],
  title: string,
  poster_path: string,
  release_date: string,
  overview: string,
};

export type CastMember = {
  character: string;
  name: string;
  profile_path: string | null;
};

export type Review = {
  author_details: {
    avatar_path: string | null;
    username: string;
  };
  created_at: string;
  content: string;
};

export type Video = {
  name: string;
  published_at: string;
  key: string;
};

export type MovieDetails = {
  credits: {
    cast: CastMember[];
  };
  details: Details;
  review: {
    results: Review[];
  };
  video: {
    id: number;
    results: Video[];
  };
};

export type MovieResponse = {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}
