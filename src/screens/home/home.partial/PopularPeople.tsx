/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {PeoplePopularResults} from '../home.types';

type PopularPeopleProps = {
  data: PeoplePopularResults[] | undefined;
};

const PopularPeople = ({data}: PopularPeopleProps) => {
  const theme = useRecoilValue(themeState);
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
          <View style={styles.item}>
            <Image
              source={{uri: `${IMG_HOST}/${item.profile_path}`}}
              style={[styles.imgBg, {backgroundColor: theme.foreground}]}
            />
            <Text color={colors.white} style={styles.nameText} center numberOfLines={2}>
              {item.name}
            </Text>
          </View>
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
  item: {
    height: 150,
    width: 80
  },
  imgBg: {
    height: 120,
    width: 80,
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
