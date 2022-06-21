import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import * as RNLocalize from 'react-native-localize';
import {
  fecthNowPlayingMovie,
  fecthPeoplePopular,
  fecthPopularMovie,
  fecthProviderMovie,
  fecthTopRatedMovie,
  fecthTrendingMovie
} from './home.model';
import {MovieListResults, PeoplePopularResults, ProviderMovieResults} from './home.types';
import CarousalMovie from './home.partial/CarousalMovie';
import GroupedMovie from './home.partial/GroupedMovie';
import ProviderMovie from './home.partial/ProviderMovie';
import PopularPeople from './home.partial/PopularPeople';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native';
import homeStyles from './home.styles';

const Home = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const [data, setData] = useState<MovieListResults[]>([]);
  const [dataTrending, setDataTrending] = useState<MovieListResults[]>([]);
  const [dataPopular, setDataPopular] = useState<MovieListResults[]>([]);
  const [dataTopRated, setDataTopRated] = useState<MovieListResults[]>([]);
  const [dataProvider, setDataProvider] = useState<ProviderMovieResults[]>([]);
  const [dataPeoplePopular, setDataPeoplePopular] = useState<PeoplePopularResults[]>([]);

  useEffect(() => {
    console.log(RNLocalize.getCountry());
    console.log(RNLocalize.getLocales());
    loadMovieNowPlaying();
    loadMovieTrending();
    loadMovieProvider();
    loadMoviePopular();
    loadMovieTopRated();
    loadPopularPeople();
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

  return (
    <GestureHandlerRootView style={homeStyles.container}>
      <ScrollView>
        <CarousalMovie data={data} onPressItem={() => navigation.navigate('ExampleNavigation')} />
        <ProviderMovie
          data={dataProvider}
          onPressItem={() => navigation.navigate('ExampleNavigation')}
        />
        <GroupedMovie
          title="Trending"
          data={dataTrending}
          onPressItem={() => navigation.navigate('ExampleNavigation')}
        />
        <PopularPeople data={dataPeoplePopular} />
        <GroupedMovie
          title="Most Popular"
          data={dataPopular}
          onPressItem={() => navigation.navigate('ExampleNavigation')}
        />
        <GroupedMovie
          title="Top Rated"
          data={dataTopRated}
          onPressItem={() => navigation.navigate('ExampleNavigation')}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
