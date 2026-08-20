import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import VendorNavigator from './VendorNavigator';
import DriverNavigator from './DriverNavigator';

import { RootStackParamList } from './types';

const Root = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {/* Default entry point — swap to Customer/Vendor/Driver after auth */}
      <Root.Screen name="Auth" component={AuthNavigator} />
      <Root.Screen name="Customer" component={CustomerNavigator} />
      <Root.Screen name="Vendor" component={VendorNavigator} />
      <Root.Screen name="Driver" component={DriverNavigator} />
    </Root.Navigator>
  );
};

export default RootNavigator;
