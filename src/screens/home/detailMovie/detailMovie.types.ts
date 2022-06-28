type ResponseAPI<R = any> = Promise<R | null>;

// movie list
export type ProductionCompanies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Genres = {
  id: number;
  name: string;
};

export type DetailMovieData = {
  imdb_id: string;
  budget: number;
  production_companies: ProductionCompanies[];
  genres: Genres[];
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  status: string;
};

export type DetailMovieResponse = ResponseAPI<DetailMovieData>;
