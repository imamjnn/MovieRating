/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {themeState} from '@root/src/screens/setting/setting.model';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {MovieVideoResults} from '../detailMovie.types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MovieVideosProps = {
  data: MovieVideoResults[] | undefined;
};

const MovieVideos = ({data}: MovieVideosProps) => {
  const theme = useRecoilValue(themeState);
  if (data && data.length === 0) {
    return null;
  }
  return (
    <View>
      <Text color={theme.text} style={{paddingBottom: 10, paddingLeft: 10, fontWeight: 'bold'}}>
        Videos
      </Text>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{paddingLeft: 10, paddingBottom: 10}}
        renderItem={({item}) => (
          <ImageBackground
            source={{uri: `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}}
            style={styles.item}
            imageStyle={styles.imgBg}>
            <Icon name="play-circle-fill" color={colors.grey100} size={36} />
          </ImageBackground>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: 180,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgBg: {
    height: 100,
    width: 180,
    borderRadius: 6,
    backgroundColor: colors.grey100
  }
});

export default MovieVideos;
