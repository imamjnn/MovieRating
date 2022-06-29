/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {themeState} from '@root/src/screens/setting/setting.model';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {WatchProviderMovieResults} from '../detailMovie.types';

type WatchProviderProps = {
  data: WatchProviderMovieResults[];
};

const WatchProvider = ({data}: WatchProviderProps) => {
  const theme = useRecoilValue(themeState);
  if (data.length === 0) {
    return null;
  }
  return (
    <View style={{padding: 10}}>
      <Text color={theme.text} style={{paddingBottom: 10, fontWeight: 'bold'}}>
        Watch Provider
      </Text>
      <FlatList
        data={data}
        horizontal
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image source={{uri: `${IMG_HOST}${item.logo_path}`}} style={styles.imgBg} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: 10
  },
  imgBg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: colors.grey100
  }
});

export default WatchProvider;
