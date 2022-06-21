import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import homeStyles from './home.styles';
import * as RNLocalize from 'react-native-localize';
import {fecthNowPlayingMovie} from './home.model';
import {NowPlayingMovieResults} from './home.types';
import CarousalMovie from './home.partial/CarousalMovie';
import {View} from 'react-native';

const Home = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const [data, setData] = useState<NowPlayingMovieResults[]>([]);

  useEffect(() => {
    console.log(RNLocalize.getCountry());
    console.log(RNLocalize.getLocales());
    loadMovieNowPlaying();
  }, []);

  const loadMovieNowPlaying = async () => {
    const response = await fecthNowPlayingMovie();
    if (response) {
      setData(response.results);
    }
  };

  return (
    <View style={homeStyles.container}>
      <CarousalMovie data={data} onPressItem={() => navigation.navigate('ExampleNavigation')} />
    </View>
  );
};

export default Home;
