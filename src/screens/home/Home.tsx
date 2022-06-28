import React, {useEffect, useState} from 'react';
import * as RNLocalize from 'react-native-localize';
import {
  fecthNowPlayingMovie,
  fecthPeoplePopular,
  fecthPopularMovie,
  fecthProviderMovie,
  fecthTopRatedMovie,
  fecthTrendingMovie,
  fecthUpcomingMovie
} from './home.model';
import {MovieListResults, PeoplePopularResults, ProviderMovieResults} from './home.types';
import CarousalMovie from './home.partial/CarousalMovie';
import GroupedMovie from './home.partial/GroupedMovie';
import ProviderMovie from './home.partial/ProviderMovie';
import PopularPeople from './home.partial/PopularPeople';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native';
import homeStyles from './home.styles';
import {useRecoilValue} from 'recoil';
import {themeState} from '../setting/setting.model';
import {Header} from '@root/src/components';

const Home = () => {
  const theme = useRecoilValue(themeState);

  const [data, setData] = useState<MovieListResults[]>([]);
  const [dataTrending, setDataTrending] = useState<MovieListResults[]>([]);
  const [dataPopular, setDataPopular] = useState<MovieListResults[]>([]);
  const [dataTopRated, setDataTopRated] = useState<MovieListResults[]>([]);
  const [dataProvider, setDataProvider] = useState<ProviderMovieResults[]>([]);
  const [dataPeoplePopular, setDataPeoplePopular] = useState<PeoplePopularResults[]>([]);
  const [dataUpcoming, setDataUpcoming] = useState<MovieListResults[]>([]);

  useEffect(() => {
    console.log(RNLocalize.getCountry());
    console.log(RNLocalize.getLocales());
    loadMovieNowPlaying();
    loadMovieTrending();
    loadMovieProvider();
    loadMoviePopular();
    loadMovieTopRated();
    loadPopularPeople();
    loadMovieUpcoming();
  }, []);

  const loadMovieNowPlaying = async () => {
    const response = await fecthNowPlayingMovie();
    if (response) {
      setData(response.results);
    }
  };

  const loadMovieTrending = async () => {
    const response = await fecthTrendingMovie();
    if (response) {
      setDataTrending(response.results);
    }
  };
  const loadMovieProvider = async () => {
    const response = await fecthProviderMovie();
    if (response) {
      setDataProvider(response.results);
    }
  };
  const loadMoviePopular = async () => {
    const response = await fecthPopularMovie();
    if (response) {
      setDataPopular(response.results);
    }
  };
  const loadMovieTopRated = async () => {
    const response = await fecthTopRatedMovie();
    if (response) {
      setDataTopRated(response.results);
    }
  };
  const loadPopularPeople = async () => {
    const response = await fecthPeoplePopular();
    if (response) {
      setDataPeoplePopular(response.results);
    }
  };
  const loadMovieUpcoming = async () => {
    const response = await fecthUpcomingMovie();
    if (response) {
      setDataUpcoming(response.results);
    }
  };

  return (
    <GestureHandlerRootView style={[homeStyles.container, {backgroundColor: theme.background}]}>
      <Header title="Movies" />
      <ScrollView>
        <CarousalMovie data={data} />
        <ProviderMovie data={dataProvider} />
        <GroupedMovie title="Trending" data={dataTrending} />
        <PopularPeople data={dataPeoplePopular} />
        <GroupedMovie title="Most Popular" data={dataPopular} />
        <GroupedMovie title="Top Rated" data={dataTopRated} />
        <GroupedMovie title="Upcoming" data={dataUpcoming} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
