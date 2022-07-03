/* eslint-disable react-hooks/rules-of-hooks */
import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {MovieListResponse} from '../home/home.types';

export const fecthSearchMovie = async (query: string) => {
  const response = await axios.get<MovieListResponse>(
    `${HOST}${endpoint.searchMovie}?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
  );
  if (response?.status !== 200) {
    return null;
  }
  return response.data;
};
