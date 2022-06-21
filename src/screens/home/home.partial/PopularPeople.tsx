/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {PeoplePopularResults} from '../home.types';
type PopularPeopleProps = {
  data: PeoplePopularResults[];
};

const PopularPeople = ({data}: PopularPeopleProps) => {
  return (
    <View style={styles.container}>
      <View style={{padding: 6}}>
        <Text color={colors.white}>Popular People</Text>
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        horizontal
        renderItem={({item}) => (
          <ImageBackground
            source={{uri: `${IMG_HOST}/${item.profile_path}`}}
            style={[styles.imgBg, {backgroundColor: colors.grey100}]}
            imageStyle={styles.imgBg}>
            <Text color={colors.white} style={styles.nameText}>
              {item.name}
            </Text>
          </ImageBackground>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: colors.primary,
    marginBottom: 10
  },
  imgBg: {
    height: 120,
    width: 80,
    backgroundColor: colors.grey100,
    justifyContent: 'flex-end',
    padding: 4
  },
  nameText: {
    fontSize: 11,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textShadowColor: colors.black
  }
});

export default PopularPeople;
