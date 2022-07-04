/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList} from 'react-native';
import {Chip} from 'react-native-ui-lib';
import {Genres} from '../detailMovie.types';

type MovieGenreListProps = {
  data: Genres[];
};

const MovieGenreList = ({data}: MovieGenreListProps) => {
  const navigation = useNavigation<AppNavigationProps>();
  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={data}
      horizontal
      contentContainerStyle={{
        marginTop: 6,
        alignItems: 'center',
        flexGrow: 1
      }}
      renderItem={({item}) => (
        <Chip
          label={item.name}
          labelStyle={{color: colors.grey100}}
          containerStyle={{marginRight: 6}}
          onPress={() => navigation.push('MovieBy', {id: item.id, title: item.name, type: 'genre'})}
          backgroundColor={colors.primary}
        />
      )}
    />
  );
};

export default MovieGenreList;
