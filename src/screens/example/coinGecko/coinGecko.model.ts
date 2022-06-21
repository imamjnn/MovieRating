/* eslint-disable react-hooks/rules-of-hooks */
import {COINGECKO_API} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {MarketData, MarketResponse} from './coinGecko.types';

export const getMarket = () => {
  const client = useQueryClient();

  const {hasNextPage, ...rest} = useInfiniteQuery<MarketData | null>(
    'infiniteMarket',
    async ({pageParam = 1}) => {
      const response = await axios.get<MarketResponse>(
        `${COINGECKO_API}${endpoint.markets}/?vs_currency=idr&order=market_cap_desc&per_page=20&page=${pageParam}`
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
      client.resetQueries('infiniteMarket');
    }
  };

  return {
    ...rest,
    reload
  };
};
