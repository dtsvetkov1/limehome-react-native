# Intro

Welcome to limehome React Native - Coding Challenge

Project is available at: https://expo.dev/@dtsvetkov/limehome-react-native-coding-challenge?serviceType=classic&distribution=expo-go

To run this project locally, first run

```
expo install
```

and then

```
expo start
```

## Additional information

### General

- Three screens: map view, list view, apartment screen
- Expo SDK 44 used, at the moment of writing version 45 was in beta
- TypeScript included
- Custom fonts
- Basic custom animations for apartment preview - based on react-native-gesture-handler and reanimated 2 (because reanimated is too good to leave it behind)
- eslint initial setup


### Drawbacks:

Because of time and Expo Go limitations some things are missing, for example

- map clustering (not important in this case but should be used for a large number of markers)
- some images may flicker because of basic Image component limitations (can be replaced with a custom image component like react-native-fast-image)

