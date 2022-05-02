import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Text, View, Image, StyleSheet,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Animated from 'react-native-reanimated';

import { fetchApartment } from '../api/requests';
import { AddressLine } from '../components/AddressLine';
import Colors from '../constants/Colors';
import { typography } from '../constants/styles';
import { useStore, useStoreActions } from '../store';
import { getPortraitPhoto } from '../utils/utils';
import { Screens } from '../constants/navigation';
import { ScreenProps } from '../types/navigationTypes';

import { IExtendedApartment } from '../types/types';

export default function ApartmentScreen(props: ScreenProps<Screens.ApartmentScreen>) {
  const { route } = props;
  const [loading, setLoading] = useState(true);
  const { apartments } = useStore();
  const { setApartments } = useStoreActions();

  const { id } = route.params;
  // const apartment = apartments[id.toString()];
  const apartment = apartments[id];
  const { name, images } = apartment;
  const uri = getPortraitPhoto(images);

  useEffect(() => {
    fetchApartment(id).then((response) => {
      const result = response.payload;
      // {[id: number]: IApartment}
      setApartments((oldApartments: {[id: number]: IExtendedApartment}) => {
        const tmpApartments = oldApartments;
        tmpApartments[result.id] = result;
        return tmpApartments;
      });
      setLoading(false);
    });
  }, [id, setApartments]);

  const renderLoader = () => (loading ? (
    <View style={styles.loader}>
      <ActivityIndicator color={Colors.common.secondary_500_main} />
    </View>
  ) : null);

  return (
    <View style={styles.container}>
      {renderLoader()}
      <Text style={[styles.title, typography.heading2]}>{name}</Text>
      {/* TODO it would be great to add carousel here */}
      <SharedElement id={id.toString()}>
        <Image
          style={styles.image}
          source={{
            uri,
            cache: 'force-cache',
          }}
          resizeMode="cover"
        />
      </SharedElement>
      <View style={{ marginVertical: 10 }}>
        <AddressLine apartment={apartment} />
      </View>
      {apartment.description ? (
        <Animated.View>
          <Animated.Text style={styles.description}>{apartment.description}</Animated.Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.common.neutral_off_white,
  },
  loader: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: 10,
  },
  image: {
    height: 220,
  },
  title: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  description: {
    marginTop: 1,
  },
});
