import {themeState} from '@root/src/screens/setting/setting.model';
import {colors} from '@root/src/themes';
import globalStyles from '@root/src/themes/globalStyles';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useRecoilValue} from 'recoil';

const LoadingView = () => {
  const theme = useRecoilValue(themeState);
  return (
    <View style={[globalStyles.centerView, {backgroundColor: theme.background}]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default LoadingView;
