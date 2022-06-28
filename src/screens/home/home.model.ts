import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {MovieListResponse, PeoplePopularResponse, ProviderMovieResponse} from './home.types';

export const fecthNowPlayingMovie = async () => {
  try {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.nowPlayingMovie}?api_key=${API_KEY}&language=en-US&page=1`
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

export const fecthTrendingMovie = async () => {
  try {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.trendingMovie}?api_key=${API_KEY}`
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

export const fecthProviderMovie = async () => {
  try {
    const response = await axios.get<ProviderMovieResponse>(
      `${HOST}${endpoint.providerMovie}?api_key=${API_KEY}&language=id-ID&watch_region=ID`
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

export const fecthPopularMovie = async () => {
  try {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.popularMovie}?api_key=${API_KEY}&language=id-ID`
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

export const fecthTopRatedMovie = async () => {
  try {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.topRatedMovie}?api_key=${API_KEY}&language=id-ID`
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

export const fecthUpcomingMovie = async () => {
  try {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.upcomingMovie}?api_key=${API_KEY}&language=id-ID`
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

export const fecthPeoplePopular = async () => {
  try {
    const response = await axios.get<PeoplePopularResponse>(
      `${HOST}${endpoint.personPopular}?api_key=${API_KEY}&language=id-ID`
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
