/* eslint-disable react-native/no-inline-styles */
import {themeState} from '@root/src/screens/setting/setting.model';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import Text from '../text/Text';

type HeaderProps = {
  title: string;
};

const Header = ({title = 'Title'}: HeaderProps) => {
  const theme = useRecoilValue(themeState);
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={{width: '80%'}}>
        <Text color={theme.text} style={{fontSize: 20, fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 4
  }
});

export default Header;
