/* eslint-disable react-native/no-inline-styles */
import {Text} from '@root/src/components';
import {dark, light} from '@root/src/themes/colors';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {themeState} from './setting.model';

const Setting = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const onPressTheme = () => {
    setTheme(theme.isDark ? light : dark);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <TouchableOpacity onPress={onPressTheme}>
        <Text color={theme.text}>{theme.isDark ? 'DARK' : 'LIGHT'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
