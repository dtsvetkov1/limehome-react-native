import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './app/hooks/useCachedResources';
import useColorScheme from './app/hooks/useColorScheme';
import Navigation from './app/navigation';
import { StoreProvider } from './app/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
