/* eslint-disable react-hooks/rules-of-hooks */
import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {MovieListData, MovieListResponse} from '../home.types';
import {
  DetailMovieData,
  DetailMovieResponse,
  MovieCastData,
  MovieCastResponse,
  MovieCollectionData,
  MovieCollectionResponse,
  MovieVideoData,
  MovieVideoResponse,
  WatchProviderMovieData,
  WatchProviderMovieResponse
} from './detailMovie.types';

export const fetchDetailMovie = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<DetailMovieData | null>(
    ['fetchDetailMovie'],
    async () => {
      const response = await axios.get<DetailMovieResponse>(
        `${HOST}${endpoint.movie}/${id}?api_key=${API_KEY}&language=en-US`
      );
      if (response?.status !== 200) {
        return null;
      }
      return response.data;
    },
    {cacheTime: 0}
  );

  const reload = () => {
    client.resetQueries(['fetchDetailMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthWatchProviderMovie = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<WatchProviderMovieData | null>(
    ['fecthWatchProviderMovie'],
    async () => {
      const response = await axios.get<WatchProviderMovieResponse>(
        `${HOST}${endpoint.movie}/${id}/watch/providers?api_key=${API_KEY}&language=en-US`
      );
      if (response?.status !== 200) {
        return null;
      }
      return response.data;
    }
  );

  const reload = () => {
    client.resetQueries(['fecthWatchProviderMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthMovieCast = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieCastData | null>(['fecthMovieCast'], async () => {
    const response = await axios.get<MovieCastResponse>(
      `${HOST}${endpoint.movie}/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthMovieCast']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthMovieVideos = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieVideoData | null>(['fecthMovieVideos'], async () => {
    const response = await axios.get<MovieVideoResponse>(
      `${HOST}${endpoint.movie}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthMovieVideos']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthSimilarMovie = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieListData | null>(['fecthSimilarMovie'], async () => {
    const response = await axios.get<MovieListResponse>(
      `${HOST}${endpoint.movie}/${id}/similar?api_key=${API_KEY}&language=en-US`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthSimilarMovie']);
  };

  return {
    ...rest,
    reload
  };
};

export const fecthCollectionMovie = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<MovieCollectionData | null>(['fecthCollectionMovie'], async () => {
    const response = await axios.get<MovieCollectionResponse>(
      `${HOST}${endpoint.collectionMovie}/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (response?.status !== 200) {
      return null;
    }
    return response.data;
  });

  const reload = () => {
    client.resetQueries(['fecthCollectionMovie']);
  };

  return {
    ...rest,
    reload
  };
};
