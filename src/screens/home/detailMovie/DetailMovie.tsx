/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import React from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';

const Setting = () => {
  const theme = useRecoilValue(themeState);

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Text color={theme.text}>Detail</Text>
    </View>
  );
};

export default Setting;
