/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Text} from '@root/src/components';
import {AppNavigationParams, AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ImageBackground, Pressable, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {
  fecthMovieCast,
  fecthMovieVideos,
  fecthSimilarMovie,
  fecthWatchProviderMovie,
  fetchDetailMovie
} from './detailMovie.model';
import {Chip, LoaderScreen} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@root/src/themes';
import WatchProvider from './detailMovie.partial/WatchProvider';
import {deviceLocalize} from '@root/src/utils/models';
import MovieGenreList from './detailMovie.partial/MovieGenreList';
import GroupedMovie from '../home.partial/GroupedMovie';
import MovieCast from './detailMovie.partial/MovieCast';
import MovieVideos from './detailMovie.partial/MovieVideos';
import MoreDetail from './detailMovie.partial/MoreDetail';
import detailMovieStyles from './detailMovie.styles';
import globalStyles from '@root/src/themes/globalStyles';
import MovieCollection from './detailMovie.partial/MovieCollection';
import LinearGradient from 'react-native-linear-gradient';

type DetailMovieRouteProps = RouteProp<AppNavigationParams, 'DetailMovie'>;

const Setting = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const theme = useRecoilValue(themeState);
  const localize = useRecoilValue(deviceLocalize);
  const {params} = useRoute<DetailMovieRouteProps>();

  const [overviewLess, setOverviewLess] = useState(true);

  const yOffset = useRef(new Animated.Value(0)).current;
  // const headerOpacity = yOffset.interpolate({
  //   inputRange: [0, 200],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp'
  // });
  const headerColor = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: ['transparent', theme.background],
    extrapolate: 'clamp'
  });

  const titleColor = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: ['transparent', theme.text],
    extrapolate: 'clamp'
  });

  const detailMovie = fetchDetailMovie(params.id);
  const watchProvider = fecthWatchProviderMovie(params.id);
  const movieCast = fecthMovieCast(params.id);
  const movieVideo = fecthMovieVideos(params.id);
  const movieSimilar = fecthSimilarMovie(params.id);

  useEffect(() => {
    console.log('Detail Movie');
  }, []);

  const watchProviderData =
    watchProvider.data?.results[localize.countryCode] &&
    watchProvider.data?.results[localize.countryCode].flatrate
      ? watchProvider.data?.results[localize.countryCode].flatrate
      : [];

  if (detailMovie.isFetching) {
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

  if (!detailMovie.data) {
    return (
      <View style={[globalStyles.centerView, {backgroundColor: theme.background}]}>
        <Text color={theme.text}>Something wrong, please try again later</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Animated.View
        style={[
          detailMovieStyles.header,
          {
            // opacity: headerOpacity,
            backgroundColor: headerColor
          }
        ]}>
        <Pressable style={{width: '10%'}} onPress={() => navigation.pop()}>
          <Icon name="arrow-back" size={20} color={theme.text} />
        </Pressable>
        <View style={{width: '90%'}}>
          <Animated.Text
            style={{fontSize: 18, fontWeight: 'bold', color: titleColor}}
            numberOfLines={1}>
            {detailMovie.data.title}
          </Animated.Text>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={{zIndex: 0}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset
                }
              }
            }
          ],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}>
        <ImageBackground
          source={{uri: `${IMG_HOST}${detailMovie.data.backdrop_path}`}}
          imageStyle={{
            height: 200,
            width: '100%'
          }}
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'flex-end'
          }}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', theme.background]}
            style={{height: 200, width: '100%'}}
          />
        </ImageBackground>
        <View style={{marginTop: -50, flexDirection: 'row'}}>
          <View style={{width: '30%', paddingLeft: 10}}>
            <Image
              source={{uri: `${IMG_HOST}${detailMovie.data.poster_path}`}}
              style={{height: 160, width: 100, backgroundColor: theme.foreground}}
            />
          </View>
          <View style={{paddingTop: 50, padding: 6, width: '70%'}}>
            <Text color={theme.text} style={{fontSize: 18, fontWeight: '800'}} paddingVertical={6}>
              {detailMovie.data.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Chip
                label={String(`${detailMovie.data.vote_average} / ${detailMovie.data.vote_count}`)}
                labelStyle={{color: theme.text, fontWeight: 'bold'}}
                leftElement={
                  <Icon name="star" size={16} color={colors.warning} style={{paddingLeft: 6}} />
                }
                containerStyle={{marginRight: 6}}
                borderRadius={6}
              />
              <Chip
                label={
                  detailMovie.data.release_date
                    ? detailMovie.data.release_date
                    : detailMovie.data.status
                }
                labelStyle={{color: theme.text}}
                leftElement={
                  <Icon
                    name="date-range"
                    size={16}
                    color={colors.primary}
                    style={{paddingLeft: 6}}
                  />
                }
                containerStyle={{marginRight: 6}}
                borderRadius={6}
              />
            </View>
            <MovieGenreList data={detailMovie.data.genres} />
          </View>
        </View>
        <View style={{padding: 10}}>
          <Pressable onPress={() => setOverviewLess(!overviewLess)}>
            <Text color={colors.grey400} numberOfLines={overviewLess ? 4 : 0}>
              {detailMovie.data.overview}
            </Text>
          </Pressable>
        </View>
        <WatchProvider data={watchProviderData} />
        <MovieCast data={movieCast.data?.cast} />
        <MoreDetail
          isLoading={detailMovie.isLoading}
          revenue={detailMovie.data.revenue}
          budget={detailMovie.data.budget}
          prodCompanies={detailMovie.data.production_companies}
        />
        <MovieVideos data={movieVideo.data?.results} />
        {detailMovie.data.belongs_to_collection ? (
          <MovieCollection
            collectionId={detailMovie.data.belongs_to_collection.id}
            movieId={detailMovie.data.id}
          />
        ) : null}
        <GroupedMovie title="Similar Movie" data={movieSimilar.data?.results} />
      </Animated.ScrollView>
    </View>
  );
};

export default Setting;
