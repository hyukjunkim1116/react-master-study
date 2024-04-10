const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface ITv {
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  id: number;
}
export interface IGetTvResults {
  results: ITv[];
}
export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}



export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}
export function getLatestTv() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=en-US&page=1`).then(
      response => response.json()
  );
}
export function searchMovies(keyword:string|null) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&language=en-US&page=1`).then(
      response => response.json()
  );
}
export function searchTvs(keyword:string|null) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&language=en-US&page=1`).then(
      response => response.json()
  );
}
