export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface Crew {
  known_for_department: string;
  department: string;
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

export interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  budget: number;
  status: string;
  homepage: string;
  genres: Array<{ name: string }>;
  production_countries: Array<{ name: string }>;
  production_companies: Array<{ name: string }>;
  spoken_languages: Array<{ name: string }>;
}
