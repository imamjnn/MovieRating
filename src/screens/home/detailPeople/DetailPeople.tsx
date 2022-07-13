/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useRoute} from '@react-navigation/native';
import {LoadingView, Text} from '@root/src/components';
import {AppNavigationParams} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {fetchDetailPeople} from './detailPeople.model';
import detailPeopleStyles from './detailPeople.styles';

type DetailPeopleRouteProps = RouteProp<AppNavigationParams, 'DetailPeople'>;

const DetailPeople = () => {
  const theme = useRecoilValue(themeState);
  const {params} = useRoute<DetailPeopleRouteProps>();

  const detailPeople = fetchDetailPeople(params.id);

  if (detailPeople.isFetching) {
    return <LoadingView />;
  }

  return (
    <ScrollView
      contentContainerStyle={[detailPeopleStyles.container, {backgroundColor: theme.background}]}>
      <View style={[detailPeopleStyles.header, {backgroundColor: theme.foreground}]}>
        <Image
          source={{uri: `${IMG_HOST}${detailPeople.data?.profile_path}`}}
          style={detailPeopleStyles.imgProfile}
        />
        <Text color={theme.text} style={{paddingTop: 10, fontSize: 18, fontWeight: 'bold'}}>
          {detailPeople.data?.name}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailPeople;
