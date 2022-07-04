/* eslint-disable react-hooks/rules-of-hooks */
import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {MovieListData, MovieListResponse} from '../home.types';

export const fetchDiscoverMovie = (queryString: string) => {
  const client = useQueryClient();

  const {hasNextPage, ...rest} = useInfiniteQuery<MovieListData | null>(
    'fetchDiscoverMovie',
    async ({pageParam = 1}) => {
      const response = await axios.get<MovieListResponse>(
        `${HOST}${endpoint.discoverMovie}?api_key=${API_KEY}&page=${pageParam}${queryString}`
      );
      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const curPage = Number(pages.length);
        return curPage + 1;
      },
      cacheTime: 0
    }
  );

  const reload = () => {
    if (hasNextPage) {
      client.resetQueries('fetchDiscoverMovie');
    }
  };

  return {
    ...rest,
    reload
  };
};
