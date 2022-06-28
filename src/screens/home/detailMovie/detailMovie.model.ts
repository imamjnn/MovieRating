import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {DetailMovieResponse} from './detailMovie.types';

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
