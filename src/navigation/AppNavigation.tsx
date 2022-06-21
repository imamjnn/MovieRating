import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import {fontFamily} from '../components/text/text.typography';

// App Navigation
import Home from '@screens/home/Home';

export type AppNavigationParams = {
  Home: undefined;
  ExampleNavigation: undefined;
};

const Stack = createNativeStackNavigator<AppNavigationParams>();

export const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{headerTitleStyle: {fontFamily: fontFamily.fw500}, headerBackTitle: ''}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="ExampleNavigation"
      component={ExampleNavigation}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export type AppNavigationProps = NativeStackNavigationProp<AppNavigationParams>;
// End App Navigation

// Example Navigation
import ExComponents from '@screens/example/ExComponents';
import ExRecoil from '@screens/example/ExRecoil';
import Example from '@screens/example/Example';
import CoinGecko from '@screens/example/coinGecko/CoinGecko';

export type ExampleNavigationParams = {
  Example: undefined;
  ExComponents: undefined;
  ExRecoil: undefined;
  CoinGecko: undefined;
};

const ExStack = createNativeStackNavigator<ExampleNavigationParams>();

export const ExampleNavigation = () => (
  <ExStack.Navigator
    screenOptions={{
      headerTitleStyle: {fontFamily: fontFamily.fw500},
      headerBackTitle: ''
    }}>
    <ExStack.Screen name="Example" component={Example} />
    <ExStack.Screen name="ExComponents" component={ExComponents} />
    <ExStack.Screen name="ExRecoil" component={ExRecoil} />
    <ExStack.Screen name="CoinGecko" component={CoinGecko} />
  </ExStack.Navigator>
);

export type ExampleNavigationProps = NativeStackNavigationProp<ExampleNavigationParams>;
// End Example Navigation
