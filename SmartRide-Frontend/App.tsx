import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { CustomerProfileProvider } from './src/context/CustomerProfileContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomerProfileProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CustomerProfileProvider>
    </SafeAreaProvider>
  );
}

export default App;
