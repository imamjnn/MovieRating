import {colors} from '@root/src/themes';
import globalStyles from '@root/src/themes/globalStyles';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingView = () => {
  return (
    <View style={globalStyles.centerView}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default LoadingView;
