import React, { useEffect, useRef, useState } from 'react';
import {
  Image, StyleSheet, PixelRatio,
} from 'react-native';
import Animated, {
  interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { Callout, Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

import { IApartment } from '../types/types';

const favouriteSelectedIcon = require('../../assets/images/favouriteFilled.png');
const favouriteIcon = require('../../assets/images/favourite.png');

type CustomMarkerProps = {
  isActive: boolean,
  onPress: (id: number) => void,
  marker: IApartment,
}

function CustomMarkerView({ isActive }: { isActive: boolean }) {
  const isActiveAnim = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      isActiveAnim.value = withTiming(1);
    } else {
      isActiveAnim.value = withTiming(0);
    }
  }, [isActive, isActiveAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isActiveAnim.value,
        [0, 1],
        [Colors.common.greyscale_900_dark, Colors.common.secondary_500_main],
      ),
      borderRadius: interpolate(
        isActiveAnim.value,
        [0, 1],
        [3, 10],
      ),
      zIndex: interpolate(
        isActiveAnim.value,
        [0, 1],
        [1000, 0],
      ),
    };
  });

  return (
    <Animated.View
      style={[styles.marker, animatedStyle]}
    >
      <Image
        style={styles.markerIcon}
        source={isActive ? favouriteSelectedIcon : favouriteIcon}
      />
    </Animated.View>
  );
}

export function CustomMapMarkerFunction(props: CustomMarkerProps) {
  const [tracksViewChanges, setTrackChanges] = useState(true);
  const {
    isActive, marker, onPress,
  } = props;
  const prevIsActive = useRef(isActive);
  const skipFirstRender = useRef(true);

  const coordinate = { latitude: marker.location.lat, longitude: marker.location.lng };

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
    } else {
      if (prevIsActive.current !== isActive) {
        setTrackChanges(true);
        prevIsActive.current = isActive;
      } else {
        setTrackChanges(false);
      }
    }
  }, [isActive]);

  const onCalloutPress = () => null;

  const onMarkerPress = () => {
    onPress(marker.id);
  };

  // console Log to detect re-renders
  // console.log('Marker re-render, ', isActive, marker.id);

  return (
    <Marker
      identifier={marker.id.toString()}
      key={marker.id.toString()}
      style={{ zIndex: isActive ? 1000 : 0 }}
      tracksViewChanges={tracksViewChanges}
      onPress={onMarkerPress}
      coordinate={coordinate}
    >
      <CustomMarkerView isActive={isActive} />
      <Callout onPress={onCalloutPress} tooltip />
    </Marker>
  );
}

export const CustomMapMarker = React.memo(CustomMapMarkerFunction);

const styles = StyleSheet.create({
  calloutImage: {
    width: 100,
    height: 100,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: PixelRatio.roundToNearestPixel(0.25),
    borderColor: Colors.common.primary_50_light,
    backgroundColor: Colors.common.greyscale_900_dark,
  },
  markerIcon: { width: '80%', height: '80%', tintColor: 'white' },
  activeMarker: {
    // width: 40,
    // height: 40,
    borderRadius: 10,
    // zIndex: 10000,
    backgroundColor: Colors.common.secondary_500_main,
  },
});
