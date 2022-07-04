/* eslint-disable react-hooks/rules-of-hooks */
import {API_KEY, HOST} from '@root/src/services/api';
import {endpoint} from '@root/src/services/endpoint';
import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {
  DetailPeopleData,
  DetailPeopleResponse,
  PeopleImagesData,
  PeopleImagesResponse
} from './detailPeople.types';

export const fetchDetailPeople = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<DetailPeopleData | null>(
    ['fetchDetailPeople'],
    async () => {
      const response = await axios.get<DetailPeopleResponse>(
        `${HOST}${endpoint.person}/${id}?api_key=${API_KEY}&language=en-US`
      );
      if (response?.status !== 200) {
        return null;
      }
      return response.data;
    },
    {cacheTime: 0}
  );

  const reload = () => {
    client.resetQueries(['fetchDetailPeople']);
  };

  return {
    ...rest,
    reload
  };
};

export const fetchPeopleImages = (id: number) => {
  const client = useQueryClient();

  const {...rest} = useQuery<PeopleImagesData | null>(
    ['fetchPeopleImages'],
    async () => {
      const response = await axios.get<PeopleImagesResponse>(
        `${HOST}${endpoint.person}/${id}/images?api_key=${API_KEY}&language=en-US`
      );
      if (response?.status !== 200) {
        return null;
      }
      return response.data;
    },
    {cacheTime: 0}
  );

  const reload = () => {
    client.resetQueries(['fetchPeopleImages']);
  };

  return {
    ...rest,
    reload
  };
};
