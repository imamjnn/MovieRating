/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Suspense} from 'react';
import {RecoilRoot} from 'recoil';
import {AppNavigation} from '@navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ActivityIndicator, View} from 'react-native';
import globalStyles from './src/themes/globalStyles';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const Loading = () => (
  <View style={globalStyles.centerView}>
    <ActivityIndicator size="large" />
  </View>
);

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AppNavigation />
          </QueryClientProvider>
        </NavigationContainer>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
