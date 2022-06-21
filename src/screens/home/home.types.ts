type ResponseAPI<R = any> = Promise<R | null>;

// movie list
export type MovieListResults = {
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
};

export type MovieListData = {
  page: number;
  results: MovieListResults[];
};

export type MovieListResponse = ResponseAPI<MovieListData>;

// watch providers movie
export type ProviderMovieResults = {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
};

export type ProviderMovieData = {
  results: ProviderMovieResults[];
};

export type ProviderMovieResponse = ResponseAPI<ProviderMovieData>;

// popular pople
export type PeoplePopularResults = {
  gender: number;
  name: string;
  profile_path: string;
  popularity: number;
  adult: boolean;
  known_for_department: string;
  id: number;
};

export type PeoplePopularData = {
  results: PeoplePopularResults[];
};

export type PeoplePopularResponse = ResponseAPI<PeoplePopularData>;
