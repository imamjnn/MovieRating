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
  data: MovieCastResults[];
};

const MovieCast = ({data}: MovieCastProps) => {
  const theme = useRecoilValue(themeState);
  if (data.length === 0) {
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
              style={styles.imgBg}
              resizeMode="cover"
            />
            <Text color={theme.text} style={{fontSize: 11}} center>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 110,
    width: 80,
    marginRight: 10
  },
  imgBg: {
    height: 80,
    width: 80,
    borderRadius: 6,
    backgroundColor: colors.grey100
  }
});

export default MovieCast;
