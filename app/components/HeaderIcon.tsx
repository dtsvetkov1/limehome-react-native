/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Screens } from '../constants/navigation';
import { HeaderIconType } from '../types/types';

export function HeaderIcon(props: HeaderIconType) {
  const { colorScheme } = props;
  const navigation = useNavigation();

  const onHeaderIconPress = () => {
    navigation.navigate(Screens.ApartmentsListScreen);
  };

  return (
    <Pressable
      onPress={onHeaderIconPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name={'list'}
        size={25}
        color={colorScheme === 'dark' ? 'white' : 'black'}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}
