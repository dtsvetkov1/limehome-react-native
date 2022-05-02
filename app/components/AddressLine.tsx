import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { Text } from './Themed';

import { IApartment } from '../types/types';

import locationIcon from '../../assets/images/location.png';

type AddressLineProps = {
  type?: 'distance' | 'address';
  apartment: IApartment;
}

export function AddressLine(props: AddressLineProps) {
  const { apartment, type = 'address' } = props;

  const getAddress = () => {
    if (type === 'distance') {
      return `${apartment.distance.toFixed(1)} km from city center`;
    }
    return `${apartment.location.addressLine1}, ${apartment.location.postalCode}, ${apartment.location.countryName}`;
  };

  return (<View style={styles.container}>
    <Image source={locationIcon} style={styles.locationIcon} />
    <Text style={styles.text}>{getAddress()}</Text>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.common.secondary_500_main,
  },
  text: {
  },
});
