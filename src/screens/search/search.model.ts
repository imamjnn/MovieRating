/* eslint-disable react-hooks/rules-of-hooks */
import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {MovieListData, MovieListResponse} from '../home/home.types';

export const fecthSearchMovie = (query: string) => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(
    ['fecthSearchMovie'],
    async () => {
      const response = await axios.get<MovieListResponse>(
        `${HOST}${endpoint.searchMovie}?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
      );
      if (response?.status !== 200) {
        return null;
      }
      return response.data;
    },
    {cacheTime: 0}
  );

  const reload = () => {
    client.resetQueries(['fecthSearchMovie']);
  };

  return {
    ...rest,
    reload
  };
};
