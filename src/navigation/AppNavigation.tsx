import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import {fontFamily} from '../components/text/text.typography';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// App Navigation
import Home from '@screens/home/Home';

export type AppNavigationParams = {
  Home: undefined;
  ExampleNavigation: undefined;
  DashboardTabNavigator: undefined;
};

const Stack = createNativeStackNavigator<AppNavigationParams>();

export const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{headerTitleStyle: {fontFamily: fontFamily.fw500}, headerBackTitle: ''}}>
    <Stack.Screen
      name="DashboardTabNavigator"
      component={DashboardTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ExampleNavigation"
      component={ExampleNavigation}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export type AppNavigationProps = NativeStackNavigationProp<AppNavigationParams>;
// End App Navigation

/**
 * Dashboard
 */
import Setting from '../screens/setting/Setting';
import {colors} from '../themes';
import {Icon} from '../components';

export type DashboardTabParams = {
  Home: undefined;
  Search: undefined;
  Setting: undefined;
};

const DashboardTab = createBottomTabNavigator<DashboardTabParams>();

const DashboardTabNavigator = () => {
  const theme = useRecoilValue(themeState);
  return (
    <DashboardTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'movie' : 'movie';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings';
          }

          return (
            /* eslint-disable react-native/no-inline-styles */
            <Icon name={iconName} size={32} color={color} />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        headerTitleStyle: {fontFamily: fontFamily.fw400},
        tabBarStyle: {backgroundColor: theme.background}
      })}>
      <DashboardTab.Screen name="Home" component={Home} options={{title: 'Movie'}} />
      <DashboardTab.Screen name="Search" component={Setting} options={{title: 'Search'}} />
      <DashboardTab.Screen name="Setting" component={Setting} options={{title: 'Setting'}} />
    </DashboardTab.Navigator>
  );
};

// Example Navigation
import ExComponents from '@screens/example/ExComponents';
import ExRecoil from '@screens/example/ExRecoil';
import Example from '@screens/example/Example';
import CoinGecko from '@screens/example/coinGecko/CoinGecko';
import {useRecoilValue} from 'recoil';
import {themeState} from '../screens/setting/setting.model';

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
