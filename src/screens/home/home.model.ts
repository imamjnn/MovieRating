/* eslint-disable react-hooks/rules-of-hooks */
import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {
  MovieListData,
  MovieListResponse,
  PeoplePopularData,
  PeoplePopularResponse,
  ProviderMovieData,
  ProviderMovieResponse
} from './home.types';

export const fecthNowPlayingMovie = () => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(['fecthNowPlayingMovie'], async () => {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.nowPlayingMovie}?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthNowPlayingMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthTrendingMovie = () => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(['fecthTrendingMovie'], async () => {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.trendingMovie}?api_key=${API_KEY}`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthTrendingMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthProviderMovie = (region: string) => {
  const client = useQueryClient();

  const {...rest} = useQuery<ProviderMovieData | null>(['fecthProviderMovie'], async () => {
    const response = await axios.get<ProviderMovieResponse>(
      `${HOST}${endpoint.providerMovie}?api_key=${API_KEY}&language=id-ID&watch_region=${region}`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthProviderMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthPopularMovie = () => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(['fecthPopularMovie'], async () => {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.popularMovie}?api_key=${API_KEY}&language=id-ID`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthPopularMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthTopRatedMovie = () => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(['fecthTopRatedMovie'], async () => {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.topRatedMovie}?api_key=${API_KEY}&language=id-ID`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthTopRatedMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthUpcomingMovie = () => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(['fecthUpcomingMovie'], async () => {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.upcomingMovie}?api_key=${API_KEY}&language=id-ID`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthUpcomingMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthPeoplePopular = () => {
  const client = useQueryClient();

  const {...rest} = useQuery<PeoplePopularData | null>(['fecthPeoplePopular'], async () => {
    const response = await axios.get<PeoplePopularResponse>(
      `${HOST}${endpoint.personPopular}?api_key=${API_KEY}&language=id-ID`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthPeoplePopular']);
  };

  return {
    ...rest,
    reload
  };
};
