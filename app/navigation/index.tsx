/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer, DefaultTheme, DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/ApartmentsMapScreen';
import { MainStackParamList } from '../types/navigationTypes';
import ApartmentsListScreen from '../screens/ApartmentsListScreen';
import ApartmentScreen from '../screens/ApartmentScreen';
import { Screens } from '../constants/navigation';
import { HeaderIcon } from '../components/HeaderIcon';

const MainStack = createSharedElementStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  const colorScheme = useColorScheme();

  const renderHeaderIcon = () => <HeaderIcon
    colorScheme={colorScheme}
  />;

  return (
    <MainStack.Navigator
      initialRouteName={Screens.ApartmentsMapScreen}
      screenOptions={{
        headerShown: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <MainStack.Screen
        name={Screens.ApartmentsMapScreen}
        component={TabOneScreen}
        options={() => ({
          title: 'Map View',
          headerRight: renderHeaderIcon,
        })}
      />
      <MainStack.Screen
        name={Screens.ApartmentsListScreen}
        component={ApartmentsListScreen}
        options={{
          title: 'List View',
        }}
      />
      <MainStack.Screen
        name={Screens.ApartmentScreen}
        component={ApartmentScreen}
        options={{
          detachPreviousScreen: true,
          title: 'Apartment',
        }}
        sharedElements={(route) => {
          const { id } = route.params;
          return [{ id }];
        }}
      />
    </MainStack.Navigator>
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <MainStackNavigator />
    </NavigationContainer>
  );
}
