import React from 'react';
import {View} from 'react-native';
import {Text} from '@components';
import globalStyles from '@themes/globalStyles';

const useCheckingApp = () => {
  return (
    <View style={globalStyles.centerView}>
      <Text>Loading</Text>
    </View>
  );
};

export default useCheckingApp;
