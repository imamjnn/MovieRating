/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Text} from '@root/src/components';
import {AppNavigationParams, AppNavigationProps} from '@root/src/navigation/AppNavigation';
import React, {useEffect} from 'react';
import {Dimensions, FlatList, ImageBackground, Pressable, RefreshControl, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {fetchDiscoverMovie} from './movieBy.model';
import movieByStyles from './movieBy.styles';
import {MovieListResults} from '../home.types';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import {deviceLocalize} from '@root/src/utils/models';

type MovieByRouteProps = RouteProp<AppNavigationParams, 'MovieBy'>;

const screenWidth = Dimensions.get('screen').width;

const MovieBy = () => {
  const theme = useRecoilValue(themeState);
  const navigation = useNavigation<AppNavigationProps>();
  const {params} = useRoute<MovieByRouteProps>();

  const localize = useRecoilValue(deviceLocalize);

  const queryString =
    params.type === 'genre'
      ? `&with_genres=${params.id}`
      : params.type === 'provider'
      ? `&with_watch_providers=${params.id}&watch_region=${localize.countryCode}`
      : `&with_companies=${params.id}`;

  const {isFetching, data, reload, fetchNextPage} = fetchDiscoverMovie(queryString);

  useEffect(() => {
    navigation.setOptions({title: `${params.title} Movies`});
  }, [navigation]);

  const mergeData = data?.pages
    .map(page => page?.results ?? [])
    .reduce((prev, current) => {
      current = [...prev, ...current];
      return current;
    }, []);

  const _renderItem = ({item: props}: {item: MovieListResults}) => (
    <Pressable
      onPress={() => navigation.push('DetailMovie', {id: props.id})}
      style={[movieByStyles.item, {backgroundColor: theme.foreground, width: screenWidth / 4.6}]}>
      <ImageBackground source={{uri: `${IMG_HOST}${props.poster_path}`}} style={{height: 130}}>
        <View style={movieByStyles.wrapVote}>
          <Text color={colors.grey50} style={{fontSize: 12, fontWeight: 'bold'}}>
            {props.vote_average.toFixed(1)}
          </Text>
        </View>
      </ImageBackground>
      <View style={{height: 50, padding: 6}}>
        <Text color={theme.text} style={{fontSize: 12}} numberOfLines={2} center>
          {props.title}
        </Text>
        <Text color={theme.text} style={{fontSize: 12}} center>
          {new Date(props.release_date).getFullYear()}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <FlatList
        data={mergeData}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => reload()} />}
        contentContainerStyle={movieByStyles.list}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
        renderItem={_renderItem}
        numColumns={4}
      />
    </View>
  );
};

export default MovieBy;
