/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {Text} from '@root/src/components';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {themeState} from '@root/src/screens/setting/setting.model';
import {IMG_HOST} from '@root/src/services/api';
import React from 'react';
import {FlatList, Image, ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {fecthCollectionMovie} from '../detailMovie.model';

type MovieCollectionProps = {
  collectionId: number;
  movieId: number;
};

const MovieCollection = ({collectionId, movieId}: MovieCollectionProps) => {
  const navigation = useNavigation<AppNavigationProps>();
  const theme = useRecoilValue(themeState);
  const collectionMovie = fecthCollectionMovie(collectionId);

  const onPressItem = (id: number) => {
    if (id !== movieId) {
      navigation.push('DetailMovie', {id: id});
    }
  };

  return (
    <View style={styles.container}>
      <Text color={theme.text} paddingVertical={10} style={{paddingLeft: 10, fontWeight: 'bold'}}>
        {collectionMovie.data?.name}
      </Text>
      <ImageBackground
        source={{uri: `${IMG_HOST}${collectionMovie.data?.backdrop_path}`}}
        imageStyle={styles.imgBg}
        resizeMode="cover">
        <FlatList
          keyExtractor={item => String(item.id)}
          data={collectionMovie.data?.parts}
          horizontal
          contentContainerStyle={{padding: 10}}
          renderItem={({item}) => (
            <Pressable
              style={[styles.item, {backgroundColor: theme.foreground}]}
              onPress={() => onPressItem(item.id)}>
              <Image source={{uri: `${IMG_HOST}${item.poster_path}`}} style={styles.img} />
              <View style={styles.wrapTitle}>
                <Text
                  color={theme.text}
                  center
                  style={{fontSize: 12, fontWeight: 'bold'}}
                  numberOfLines={2}>
                  {item.title}
                </Text>
                <Text color={theme.text} center style={{fontSize: 11}} numberOfLines={2}>
                  {item.release_date ? new Date(item.release_date).getFullYear() : '-'}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  imgBg: {
    height: 220,
    width: '100%'
  },
  img: {
    height: 140,
    width: 100,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },
  item: {
    height: 200,
    width: 100,
    marginRight: 10,
    borderRadius: 6,
    elevation: 6
  },
  wrapTitle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingH: 6
  }
});

export default MovieCollection;
