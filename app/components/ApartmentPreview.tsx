import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, Image, Text, StyleSheet, Pressable, ActivityIndicator,
} from 'react-native';
import Animated, {
  runOnJS, useAnimatedStyle, useSharedValue, withDecay, withTiming,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { useStore } from '../store';
import { typography } from '../constants/styles';
import { getPortraitPhoto } from '../utils/utils';
import { AddressLine } from './AddressLine';
import { Screens } from '../constants/navigation';
import { IApartment } from '../types/types';

const cardHeight = 120;

type ApartmentPreviewProps = {
  selectedApartment: number | undefined;
  setSelectedApartment: (id: number | undefined) => void;
}

export function ApartmentPreviewComponent(props: ApartmentPreviewProps) {
  const { selectedApartment, setSelectedApartment } = props;

  const [imageLoading, setImageLoading] = useState(true);
  const navigation = useNavigation();
  const { apartments } = useStore();

  const left = useSharedValue(0);
  // const top = useSharedValue(Layout.window.height - 140);
  const top = useSharedValue(20);
  const opacity = useSharedValue(0);
  const scrollLock = useSharedValue<'horizontal' | 'vertical' | undefined>(undefined);

  const apartment = selectedApartment ? apartments[selectedApartment] : {} as IApartment;

  useEffect(() => {
    top.value = withTiming(25);
    left.value = withTiming(0);
    opacity.value = 1;
    setImageLoading(true);
  }, [selectedApartment, left, opacity, top]);

  const apartmentPreviewStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
      bottom: top.value,
    };
  });

  const onPress = () => {
    navigation.navigate(Screens.ApartmentScreen, { id: selectedApartment! });
  };

  const clearMarkerIndex = () => {
    setSelectedApartment(undefined);
  };

  // Handle tap, on tap open apartment screen
  const tap = Gesture.Tap()
    .onBegin(() => {
      opacity.value = withTiming(0.3);
    })
    .onEnd(() => {
      opacity.value = withTiming(1);
      runOnJS(onPress)();
    })
    .onFinalize(() => {
      opacity.value = withTiming(1);
    });

  // logic for apartment preview swiping
  const pan = Gesture.Pan()
    .maxPointers(1)
    .onUpdate((e) => {
      if (!scrollLock.value && Math.abs(e.translationY) > 10) {
        scrollLock.value = 'vertical';
      } else if (!scrollLock.value && Math.abs(e.translationX) > 10) {
        scrollLock.value = 'horizontal';
      }

      if (scrollLock.value === 'horizontal') {
        left.value = e.translationX;
        opacity.value = (Layout.window.width
          - Math.abs(e.translationX)) / Math.abs(e.translationX);
      } else if (scrollLock.value === 'vertical') {
        const topPosition = Math.min(20, -e.translationY);
        top.value = topPosition;
        opacity.value = (100
        - Math.abs(topPosition)) / Math.abs(topPosition);
      }
    })
    .onEnd((e) => {
      // Handle cases where preview should be moved away
      if (Math.abs(left.value) > Layout.window.width / 2) {
        runOnJS(clearMarkerIndex)();
        left.value = withTiming(Math.sign(left.value) * Layout.window.width);
      } else if (Math.abs(e.velocityX) > 300) {
        left.value = withDecay({ velocity: e.velocityX });
        runOnJS(clearMarkerIndex)();
      } else if (Math.abs(top.value) > 70) {
        top.value = withTiming(-200);
        runOnJS(clearMarkerIndex)();
      } else if ((e.velocityY) > 500) {
        runOnJS(clearMarkerIndex)();
        top.value = withDecay({ velocity: -Math.abs(e.velocityY) });
      // Is velocity is insufficient or not enough distance leave preview there
      } else {
        opacity.value = withTiming(1);
        left.value = withTiming(0);
        top.value = withTiming(20);
      }

      scrollLock.value = undefined;
    });

  const onImageLoadEnd = () => {
    setImageLoading(false);
  };

  const renderPreviewCard = () => {
    const { id, name } = apartment;
    const uri = getPortraitPhoto(apartment?.images);

    return (
      <>
        {/* <View style={{ flexDirection: 'row', width: Layout.window.width * 0.9 }}> */}
        <SharedElement id={id.toString()}>
          {/* Change key to update image on iOS devices */}
          <Image
            key={Math.random()}
            style={styles.image}
            onLoadEnd={onImageLoadEnd}
            source={{
              uri,
              cache: 'force-cache',
            }}
            resizeMode="cover"
          />
        </SharedElement>
        {imageLoading ? <View style={{ position: 'absolute', left: 50, top: 50 }}>
          <ActivityIndicator />
        </View> : null}
        {/* </View> */}
        <View style={styles.infoContainer}>
          <View><Text style={[typography.heading2]}>{name}</Text></View>
          <View>
            <AddressLine apartment={apartment} type={'distance'} />
            <View style={styles.delimiter} />
            <Text style={{ flexWrap: 'wrap', fontStyle: 'italic' }}>An exceptional value for money =)</Text>
          </View>
        </View>
      </>
    );
  };

  // Console log to detect re-renders
  // console.log('re render preview , ', selectedApartment);

  return (selectedApartment
    ? (
      // <View>
      <GestureDetector gesture={Gesture.Race(pan, tap)}>
        <Animated.View style={[styles.container, apartmentPreviewStyle]}>
          {renderPreviewCard()}
        </Animated.View>
      </GestureDetector>
      // </View>
    )
    : null);
}

export const ApartmentPreview = React.memo(ApartmentPreviewComponent);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1001,
    marginHorizontal: Layout.window.width * 0.02,
    bottom: 20,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderColor: Colors.common.greyscale_500,
    width: Layout.window.width * 0.96,
    height: cardHeight,
    backgroundColor: Colors.common.primary_50_light,
    flexDirection: 'row',
  },
  image: {
    width: cardHeight,
    height: cardHeight,
    overflow: 'hidden',
  },
  marker: {
    width: 50,
    height: 50,
    backgroundColor: Colors.common.greyscale_900_dark,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  delimiter: {
    width: '100%',
    height: 1,
    marginVertical: 5,
    backgroundColor: Colors.common.primary_900_dark_main,
  },
});
