import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button, Text} from '@components';
import globalStyles from '@themes/globalStyles';
import * as RNLocalize from 'react-native-localize';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@navigation/AppNavigation';
import {useRecoilState} from 'recoil';
import {deviceLocalize} from '../utils/models';
import {DeviceLocalizeParams} from '../utils/types';

const AppIntro = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const [localize, setLocalize] = useRecoilState<DeviceLocalizeParams>(deviceLocalize);

  useEffect(() => {
    console.log(localize);
    if (localize.countryCode) {
      navigation.replace('DashboardTabNavigator');
    }
  }, [localize, navigation]);

  const onPressNext = () => {
    const myLoc = RNLocalize.getLocales()[0];
    setLocalize(myLoc);
    navigation.replace('DashboardTabNavigator');
  };
  return (
    <View style={globalStyles.centerView}>
      {!localize.countryCode ? (
        <View>
          <Text>{RNLocalize.getCountry()}</Text>
          <Button text="Next" onPress={() => onPressNext()} />
        </View>
      ) : (
        <View>
          <Text>OK</Text>
        </View>
      )}
    </View>
  );
};

export default AppIntro;
