import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import {fontFamily} from '../components/text/text.typography';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRecoilValue} from 'recoil';
import {themeState} from '../screens/setting/setting.model';
import {colors} from '../themes';
import {Icon} from '../components';

// App Navigation
import AppIntro from '@screens/AppIntro';
import DetailMovie from '@screens/home/detailMovie/DetailMovie';
import MovieBy from '@screens/home/movieBy/MovieBy';

export type AppNavigationParams = {
  AppIntro: undefined;
  DashboardTabNavigator: undefined;
  DetailMovie: {
    id: number;
  };
  MovieBy: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<AppNavigationParams>();

export const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{headerTitleStyle: {fontFamily: fontFamily.fw500}, headerBackTitle: ''}}
    initialRouteName="AppIntro">
    <Stack.Screen name="AppIntro" component={AppIntro} options={{headerShown: false}} />
    <Stack.Screen
      name="DashboardTabNavigator"
      component={DashboardTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen name="DetailMovie" component={DetailMovie} options={{headerShown: false}} />
    <Stack.Screen name="MovieBy" component={MovieBy} options={{headerShown: true}} />
  </Stack.Navigator>
);

export type AppNavigationProps = NativeStackNavigationProp<AppNavigationParams>;
// End App Navigation

// Tabs Navigation
import Home from '@screens/home/Home';
import Setting from '../screens/setting/Setting';

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
// Tabs Navigation
