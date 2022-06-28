/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useRoute} from '@react-navigation/native';
import {Text} from '@root/src/components';
import {AppNavigationParams} from '@root/src/navigation/AppNavigation';
import React from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';

type MovieByRouteProps = RouteProp<AppNavigationParams, 'MovieBy'>;

const MovieBy = () => {
  const theme = useRecoilValue(themeState);
  const {params} = useRoute<MovieByRouteProps>();
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Text color={theme.text}>Movie by {params.id.toString()}</Text>
    </View>
  );
};

export default MovieBy;
