/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MovieListResults} from '../home.types';

type GroupedMovieProps = {
  title: string;
  data: MovieListResults[];
  onPressItem: () => void;
  onPressMore?: () => void;
};

const GroupedMovie = ({title = 'Grouped', data, onPressItem, onPressMore}: GroupedMovieProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={onPressMore}>
          <Text>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        horizontal
        contentContainerStyle={{paddingLeft: 6, height: 140}}
        renderItem={({item}) => (
          <Pressable onPress={onPressItem} style={styles.item}>
            <ImageBackground
              source={{uri: `${IMG_HOST}${item.poster_path}`}}
              style={styles.imgBg}
              imageStyle={styles.imgBg}>
              <View style={styles.wrapVote}>
                <Text color={colors.grey50} style={{fontSize: 12, fontWeight: 'bold'}}>
                  {item.vote_average}
                </Text>
              </View>
            </ImageBackground>
            <Text numberOfLines={1} style={{fontSize: 11}}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '100%',
    paddingBottom: 10
  },
  imgBg: {
    height: 120,
    width: 84,
    borderRadius: 4,
    backgroundColor: colors.grey100
  },
  item: {
    width: 84,
    marginRight: 6,
    borderRadius: 4,
    height: 140
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: 6
  },
  wrapVote: {
    borderRadius: 4,
    backgroundColor: colors.blackDim,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4
  }
});

export default GroupedMovie;
