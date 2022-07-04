/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {themeState} from '@root/src/screens/setting/setting.model';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {MovieCastResults} from '../detailMovie.types';

type MovieCastProps = {
  data: MovieCastResults[] | undefined;
};

const MovieCast = ({data}: MovieCastProps) => {
  const theme = useRecoilValue(themeState);
  if (data && data.length === 0) {
    return null;
  }
  return (
    <View>
      <Text color={theme.text} style={{paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold'}}>
        Main Cast
      </Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        horizontal
        contentContainerStyle={{paddingLeft: 10}}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image
              source={{uri: `${IMG_HOST}${item.profile_path}`}}
              style={[styles.imgBg, {backgroundColor: theme.foreground}]}
              resizeMode="cover"
            />
            <Text color={theme.text} style={{fontSize: 11}} center numberOfLines={2}>
              {item.name}
            </Text>
            <Text color={colors.grey400} style={{fontSize: 10}} center numberOfLines={2}>
              ({item.character})
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 140,
    width: 80,
    marginRight: 10
  },
  imgBg: {
    height: 100,
    width: 80,
    borderRadius: 6
  }
});

export default MovieCast;
