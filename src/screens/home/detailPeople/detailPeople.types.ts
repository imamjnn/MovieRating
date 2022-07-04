type ResponseAPI<R = any> = Promise<R | null>;
// detail people
export type DetailPeopleData = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type DetailPeopleResponse = ResponseAPI<DetailPeopleData>;

// people images
export type PeopleImagesResults = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};
export type PeopleImagesData = {
  id: number;
  profiles: PeopleImagesResults[];
};

export type PeopleImagesResponse = ResponseAPI<PeopleImagesData>;
