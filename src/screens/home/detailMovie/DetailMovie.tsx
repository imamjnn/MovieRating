/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useRoute} from '@react-navigation/native';
import {LoadingView, Text} from '@root/src/components';
import {AppNavigationParams} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ImageBackground, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {
  fecthDetailMovie,
  fecthMovieCast,
  fecthMovieVideos,
  fecthSimilarMovie,
  fecthWatchProviderMovie
} from './detailMovie.model';
import {
  DetailMovieData,
  MovieCastResults,
  MovieVideoResults,
  WatchProviderMovieResults
} from './detailMovie.types';
import {Chip} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@root/src/themes';
import WatchProvider from './detailMovie.partial/WatchProvider';
import {deviceLocalize} from '@root/src/utils/models';
import MovieGenreList from './detailMovie.partial/MovieGenreList';
import {MovieListResults} from '../home.types';
import GroupedMovie from '../home.partial/GroupedMovie';
import MovieCast from './detailMovie.partial/MovieCast';
import MovieVideos from './detailMovie.partial/MovieVideos';
import MoreDetail from './detailMovie.partial/MoreDetail';

type DetailMovieRouteProps = RouteProp<AppNavigationParams, 'DetailMovie'>;

const Setting = () => {
  const theme = useRecoilValue(themeState);
  const localize = useRecoilValue(deviceLocalize);
  const {params} = useRoute<DetailMovieRouteProps>();

  const [data, setData] = useState<DetailMovieData | null>(null);
  const [dataProviderMovie, setDataProviderMovie] = useState<WatchProviderMovieResults[]>([]);
  const [dataCastMovie, setDataCastMovie] = useState<MovieCastResults[]>([]);
  const [dataVideosMovie, setDataVideosMovie] = useState<MovieVideoResults[]>([]);
  const [dataSimilarMovie, setDataSimilarMovie] = useState<MovieListResults[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    console.log('Detail Movie');
    loadDetailMovie();
    loadProviderMovie();
    loadCastMovie();
    loadVideosMovie();
    loadSimilarMovie();
  }, []);

  const loadDetailMovie = async () => {
    const response = await fecthDetailMovie(params.id);
    setLoadingDetail(false);
    if (response) {
      setData(response);
    }
  };

  const loadProviderMovie = async () => {
    const response = await fecthWatchProviderMovie(params.id);
    if (response) {
      if (response.results[localize.countryCode]) {
        setDataProviderMovie(
          response?.results[localize.countryCode].flatrate
            ? response?.results[localize.countryCode].flatrate
            : response?.results[localize.countryCode].buy
        );
      }
    }
  };

  const loadCastMovie = async () => {
    const response = await fecthMovieCast(params.id);
    setLoadingDetail(false);
    if (response) {
      setDataCastMovie(response.cast);
    }
  };

  const loadVideosMovie = async () => {
    const response = await fecthMovieVideos(params.id);
    setLoadingDetail(false);
    if (response) {
      setDataVideosMovie(response.results);
    }
  };

  const loadSimilarMovie = async () => {
    const response = await fecthSimilarMovie(params.id);
    setLoadingDetail(false);
    if (response) {
      setDataSimilarMovie(response.results);
    }
  };

  if (loadingDetail) {
    return <LoadingView />;
  }

  if (!data) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Animated.View
        style={{
          opacity: headerOpacity,
          backgroundColor: theme.background,
          position: 'absolute',
          top: 0,
          zIndex: 1,
          height: 50,
          width: '100%',
          padding: 10,
          justifyContent: 'center'
        }}>
        <Text color={theme.text} center style={{fontSize: 18, fontWeight: 'bold'}}>
          {data?.title}
        </Text>
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
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}>
        <ImageBackground
          source={{uri: `${IMG_HOST}${data?.backdrop_path}`}}
          imageStyle={{
            height: 200,
            width: '100%'
          }}
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'flex-end'
          }}
        />
        <View style={{marginTop: -50, flexDirection: 'row'}}>
          <View style={{width: '30%', paddingLeft: 10}}>
            <Image
              source={{uri: `${IMG_HOST}${data?.poster_path}`}}
              style={{height: 160, width: 100}}
            />
          </View>
          <View style={{paddingTop: 50, padding: 6, width: '70%'}}>
            <Text color={theme.text} style={{fontSize: 18, fontWeight: '800'}} paddingVertical={6}>
              {data?.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Chip
                label={String(`${data?.vote_average} / ${data?.vote_count}`)}
                labelStyle={{color: theme.text, fontWeight: 'bold'}}
                leftElement={
                  <Icon name="star" size={16} color={colors.warning} style={{paddingLeft: 6}} />
                }
                containerStyle={{marginRight: 6}}
                borderRadius={6}
              />
              <Chip
                label={String(data?.release_date)}
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
            <MovieGenreList data={data.genres} />
          </View>
        </View>
        <View style={{padding: 10}}>
          <Text color={theme.text}>{data?.overview}</Text>
        </View>
        <WatchProvider data={dataProviderMovie} />
        <MovieCast data={dataCastMovie} />
        <MoreDetail
          revenue={data.revenue}
          budget={data.budget}
          prodCompanies={data.production_companies}
        />
        <MovieVideos data={dataVideosMovie} />
        <GroupedMovie title="Similar Movie" data={dataSimilarMovie} />
      </Animated.ScrollView>
    </View>
  );
};

export default Setting;
