import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {NowPlayingMovieResponse} from './home.types';

export const fecthNowPlayingMovie = async () => {
  try {
    const response = await axios.get<NowPlayingMovieResponse>(
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
