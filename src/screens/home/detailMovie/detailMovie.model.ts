import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {MovieListResponse} from '../home.types';
import {
  DetailMovieResponse,
  MovieCastResponse,
  MovieVideoResponse,
  WatchProviderMovieResponse
} from './detailMovie.types';

export const fecthDetailMovie = async (id: number) => {
  try {
    const response = await axios.get<DetailMovieResponse>(
      `${HOST}${endpoint.movie}/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200 && response.data !== null) {
      return response.data;
    }

    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return null;
    }

    return null;
  }
};

export const fecthWatchProviderMovie = async (id: number) => {
  try {
    const response = await axios.get<WatchProviderMovieResponse>(
      `${HOST}${endpoint.movie}/${id}/watch/providers?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200 && response.data !== null) {
      return response.data;
    }

    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return null;
    }

    return null;
  }
};

export const fecthMovieCast = async (id: number) => {
  try {
    const response = await axios.get<MovieCastResponse>(
      `${HOST}${endpoint.movie}/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200 && response.data !== null) {
      return response.data;
    }

    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return null;
    }

    return null;
  }
};

export const fecthMovieVideos = async (id: number) => {
  try {
    const response = await axios.get<MovieVideoResponse>(
      `${HOST}${endpoint.movie}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200 && response.data !== null) {
      return response.data;
    }

    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return null;
    }

    return null;
  }
};

export const fecthSimilarMovie = async (id: number) => {
  try {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.movie}/${id}/similar?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200 && response.data !== null) {
      return response.data;
    }

    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return null;
    }

    return null;
  }
};
