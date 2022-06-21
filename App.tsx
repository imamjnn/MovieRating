/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {RecoilRoot} from 'recoil';
import {AppNavigation} from '@navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
