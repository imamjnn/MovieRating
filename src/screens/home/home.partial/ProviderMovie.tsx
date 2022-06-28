/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {ProviderMovieResults} from '../home.types';

type ProviderMovieProps = {
  data: ProviderMovieResults[];
};

const ProviderMovie = ({data}: ProviderMovieProps) => {
  const theme = useRecoilValue(themeState);
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text color={theme.text}>Watch Movie Providers in Indo</Text>
      </View>
      <FlatList
        keyExtractor={item => item.provider_id.toString()}
        data={data}
        horizontal
        contentContainerStyle={{paddingLeft: 6, height: 80}}
        renderItem={({item}) => (
          <Pressable style={styles.item}>
            <Image source={{uri: `${IMG_HOST}${item.logo_path}`}} style={styles.imgBg} />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    paddingTop: 10
  },
  imgBg: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.grey100
  },
  item: {
    width: 60,
    marginRight: 6,
    borderRadius: 4,
    height: 60
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: 6
  }
});

export default ProviderMovie;
