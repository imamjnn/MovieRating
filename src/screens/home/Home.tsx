/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  fecthNowPlayingMovie,
  fecthPeoplePopular,
  fecthPopularMovie,
  fecthProviderMovie,
  fecthTopRatedMovie,
  fecthTrendingMovie,
  fecthUpcomingMovie
} from './home.model';
import CarousalMovie from './home.partial/CarousalMovie';
import GroupedMovie from './home.partial/GroupedMovie';
import ProviderMovie from './home.partial/ProviderMovie';
import PopularPeople from './home.partial/PopularPeople';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScrollView, View} from 'react-native';
import homeStyles from './home.styles';
import {useRecoilValue} from 'recoil';
import {themeState} from '../setting/setting.model';
import {Header, Text} from '@root/src/components';
import globalStyles from '@root/src/themes/globalStyles';
import {LoaderScreen} from 'react-native-ui-lib';
import {colors} from '@root/src/themes';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {deviceLocalize} from '@root/src/utils/models';

const Home = () => {
  const theme = useRecoilValue(themeState);
  const navigation = useNavigation<AppNavigationProps>();

  const localize = useRecoilValue(deviceLocalize);

  const movieNowPlaying = fecthNowPlayingMovie();
  const movieProvider = fecthProviderMovie(localize.countryCode);
  const movieTrending = fecthTrendingMovie();
  const popularPeople = fecthPeoplePopular();
  const moviePopular = fecthPopularMovie();
  const movieTopRated = fecthTopRatedMovie();
  const movieUpcomming = fecthUpcomingMovie();

  useEffect(() => {
    console.log('Movies');
    // movieNowPlaying.reload();
    // movieProvider.reload();
    // movieTrending.reload();
    // popularPeople.reload();
    // moviePopular.reload();
    // movieTopRated.reload();
    // movieUpcomming.reload();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(movieNowPlaying.data?.results, movieProvider.data?.results);
    });
    return unsubscribe;
  }, []);

  if (movieNowPlaying.isFetching) {
    return (
      <LoaderScreen
        message={'Please wait ..'}
        color={colors.primary}
        backgroundColor={theme.background}
        containerStyle={{backgroundColor: theme.background}}
        messageStyle={{color: theme.text}}
      />
    );
  }

  if (!movieNowPlaying.data) {
    return (
      <View style={[globalStyles.centerView, {backgroundColor: theme.background}]}>
        <Text color={theme.text}>Something wrong, please try again later</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={[homeStyles.container, {backgroundColor: theme.background}]}>
      <Header title="Movies" />
      <ScrollView>
        <CarousalMovie data={movieNowPlaying.data?.results} />

        <ProviderMovie data={movieProvider.data?.results} />
        <GroupedMovie title="Trending" data={movieTrending.data?.results} />
        <PopularPeople data={popularPeople.data?.results} />
        <GroupedMovie title="Most Popular" data={moviePopular.data?.results} />
        <GroupedMovie title="Top Rated" data={movieTopRated.data?.results} />
        <GroupedMovie title="Upcoming" data={movieUpcomming.data?.results} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
