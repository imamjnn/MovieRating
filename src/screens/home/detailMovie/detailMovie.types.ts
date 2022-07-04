import {MovieListResults} from '../home.types';

type ResponseAPI<R = any> = Promise<R | null>;

// movie detail
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

export type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type DetailMovieData = {
  imdb_id: string;
  budget: number;
  revenue: number;
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
  belongs_to_collection: BelongsToCollection;
};

export type DetailMovieResponse = ResponseAPI<DetailMovieData>;

// movie provider
export type WatchProviderMovieResults = {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
};

export type WatchProviderMovieData = {
  id: number;
  results: {
    [key: string]: {
      link: string;
      flatrate: WatchProviderMovieResults[];
      buy: WatchProviderMovieResults[];
    };
  };
};

export type WatchProviderMovieResponse = ResponseAPI<WatchProviderMovieData>;

// movie cast
export type MovieCastResults = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  character: string;
};

export type MovieCastData = {
  id: number;
  cast: MovieCastResults[];
};

export type MovieCastResponse = ResponseAPI<MovieCastData>;

// movie video
export type MovieVideoResults = {
  id: string;
  name: string;
  published_at: string;
  key: string;
  type: string;
  site: string;
  official: boolean;
};

export type MovieVideoData = {
  id: number;
  results: MovieVideoResults[];
};

export type MovieVideoResponse = ResponseAPI<MovieVideoData>;

// movie collection
export type MovieCollectionData = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: MovieListResults[];
};

export type MovieCollectionResponse = ResponseAPI<MovieCollectionData>;
