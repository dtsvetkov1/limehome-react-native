import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import { View } from '../components/Themed';
import Layout from '../constants/Layout';
import { useApartments } from '../hooks/useApartments';
import { CustomMapMarker } from '../components/CustomMapMarker';
import { ApartmentPreview } from '../components/ApartmentPreview';
import { Screens } from '../constants/navigation';

import { ScreenProps } from '../types/navigationTypes';

export default function TabOneScreen({ route }: ScreenProps<Screens.ApartmentsMapScreen>) {
  const mapRef = useRef<MapView | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<number | undefined>();
  const { apartments } = useApartments();

  useEffect(() => {
    // center map on iOS devices
    if (Platform.OS === 'ios' && selectedApartment) {
      const coordinate = apartments.find((apartment) => apartment.id === selectedApartment)!;
      mapRef.current?.animateToRegion(
        {
          latitude: coordinate.location.lat,
          longitude: coordinate.location.lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        // {animated: true},
      );
    }
  }, [apartments, selectedApartment]);

  useEffect(() => {
    const id = route?.params?.id;

    // If we have an id, we need navigate to correct apartment
    if (id) {
      const coordinate = apartments.find((apartment) => apartment.id === id)!;
      mapRef.current?.animateToRegion(
        {
          latitude: coordinate.location.lat,
          longitude: coordinate.location.lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        // {animated: true},
      );
      setSelectedApartment(id);
    }
  }, [apartments, route?.params?.id]);

  useEffect(() => {
    if (apartments?.length > 0) {
      mapRef?.current?.fitToCoordinates?.(
        apartments.map((apartment) => (
          { latitude: apartment.location.lat, longitude: apartment.location.lng }
        )),
        {
          edgePadding: {
            top: 10, right: 10, left: 10, bottom: 10,
          },
          animated: true,
        },
      );
    }
  }, [apartments]);

  const onMarkerPress = useCallback((id: number) => {
    setSelectedApartment(id);
  }, [setSelectedApartment]);

  // Console log can be used to detect unnecessary re-renders
  // console.log('Map re-render, selected ', selectedApartment);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // onMapReady={}
        userInterfaceStyle="light"
        style={styles.map}
      >
        {apartments.map((marker) => (
          <CustomMapMarker
            key={marker.id}
            isActive={selectedApartment === marker.id}
            onPress={onMarkerPress}
            marker={marker}
          />
        ))}
      </MapView>
      {/* Hack to load initial marker images */}
      <Image style={{ width: 0, height: 0 }} source={require('../../assets/images/favourite.png')} />
      <ApartmentPreview
        selectedApartment={selectedApartment}
        setSelectedApartment={setSelectedApartment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
