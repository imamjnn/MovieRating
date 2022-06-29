/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {themeState} from '@root/src/screens/setting/setting.model';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-ui-lib';
import {useRecoilValue} from 'recoil';
import {ProductionCompanies} from '../detailMovie.types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {thousandSeparator} from '@root/src/utils/formatter';

type MoreDetailProps = {
  budget: number;
  revenue: number;
  prodCompanies: ProductionCompanies[];
};

const MoreDetail = ({prodCompanies, budget, revenue}: MoreDetailProps) => {
  const theme = useRecoilValue(themeState);
  return (
    <View style={{backgroundColor: theme.foreground, marginBottom: 10, marginTop: 10}}>
      <View style={styles.wrapItem}>
        <Text color={theme.text} style={{paddingBottom: 6}}>
          Budget & Revenue
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Chip
            label={thousandSeparator(budget).toString()}
            labelStyle={{color: theme.text}}
            backgroundColor={theme.background}
            leftElement={<Icon name="monetization-on" size={20} color={colors.error} />}
            containerStyle={{marginRight: 10}}
          />
          <Chip
            label={thousandSeparator(revenue).toString()}
            labelStyle={{color: theme.text}}
            backgroundColor={theme.background}
            leftElement={<Icon name="monetization-on" size={20} color={colors.darkGreen} />}
          />
        </View>
      </View>
      <View style={styles.wrapItem}>
        <Text color={theme.text} style={{paddingBottom: 6}}>
          Production Companies
        </Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={prodCompanies}
          horizontal
          renderItem={({item}) => (
            <Chip
              label={item.name}
              labelStyle={{color: theme.text}}
              iconSource={{uri: `${IMG_HOST}${item.logo_path}`}}
              iconStyle={{
                height: 20,
                width: 20,
                borderRadius: 20 / 2,
                backgroundColor: colors.grey100,
                marginRight: 6
              }}
              containerStyle={{marginRight: 10}}
              backgroundColor={theme.background}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapItem: {
    padding: 10
  }
});

export default MoreDetail;
