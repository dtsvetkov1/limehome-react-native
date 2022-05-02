/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screens } from '../constants/navigation';

type NavigationParamsType = { id: number };

export type MainStackParamList = {
    [Screens.ApartmentsMapScreen]: NavigationParamsType | undefined;
    [Screens.ApartmentsListScreen]: undefined;
    [Screens.ApartmentScreen]: NavigationParamsType;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

// export type navigationType = StackNavigationProp<MainStackParamList>;
// type Props = NativeStackScreenProps<MainStackParamList, Screens.ApartmentScreen>;
export type ScreenProps<T extends Screens> = NativeStackScreenProps<MainStackParamList, T>;
