import {
  FlatList, View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { AddressLine } from '../components/AddressLine';

import { Text } from '../components/Themed';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Screens } from '../constants/navigation';
import { typography } from '../constants/styles';
import { useStore } from '../store';
import { getPortraitPhoto } from '../utils/utils';
import { ScreenProps } from '../types/navigationTypes';
import { IApartment } from '../types/types';

export default function ApartmentsListScreen(
  { navigation }: ScreenProps<Screens.ApartmentsListScreen>,
) {
  const { apartmentsList } = useStore();

  const renderApartmentCard = ({ item }: {item: IApartment}) => {
    const url = getPortraitPhoto(item.images);

    const onExplorePress = () => {
      navigation.navigate(Screens.ApartmentScreen, { id: item.id });
    };

    const onShowOnMapPress = () => {
      navigation.navigate(Screens.ApartmentsMapScreen, { id: item.id });
    };

    return (
      <View style={styles.cardContainer}>
        <SharedElement id={item.id.toString()}>
          <Image
            style={styles.image}
            source={{
              uri: url,
              cache: 'force-cache',
            }}
            resizeMode="cover"
          />
        </SharedElement>
        <View style={styles.topText}>
          <Text style={[styles.cardTitle, typography.heading2]}>{item.name}</Text>
          <AddressLine apartment={item} type="distance" />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onShowOnMapPress} style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Show on map</Text>
          </TouchableOpacity>
          <View style={styles.buttonSeparator} />
          <TouchableOpacity onPress={onExplorePress} style={styles.primaryButton}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList<IApartment>
        contentContainerStyle={styles.contentContainer}
        style={styles.listContainer}
        data={apartmentsList.slice(0, 5)}
        renderItem={renderApartmentCard}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.common.neutral_off_white,
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingVertical: 15,
  },
  cardContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: Colors.common.neutral_off_white,
  },
  image: {
    width: Layout.window.width,
    height: 160,
  },
  topText: { width: '100%', marginBottom: 10 },
  cardTitle: {
    fontSize: 14,
    marginVertical: 10,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryButton: {
    padding: 10,
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.common.primary_900_dark_main,
  },
  primaryButton: {
    padding: 10,
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.common.primary_900_dark_main,
    backgroundColor: Colors.common.primary_900_dark_main,
  },
  buttonText: {
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    height: 1.5,
    backgroundColor: Colors.common.greyscale_900_dark,
    marginVertical: 10,
  },
  buttonSeparator: {
    width: 10,
  },
});
