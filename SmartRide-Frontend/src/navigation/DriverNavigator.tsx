import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Driver screens
import DriverDashboardScreen from '../screens/driver/dashboard/DriverDashboard';
import TripListScreen from '../screens/driver/trips/TripList';
import TripDetailsScreen from '../screens/driver/trips/TripDetails';
import ActiveTripScreen from '../screens/driver/trips/ActiveTrip';
import DriverMapScreen from '../screens/driver/navigation/DriverMap';
import DriverEarningsScreen from '../screens/driver/earnings/DriverEarnings';

// Common
import NotificationsScreen from '../screens/common/NotificationsScreen';
import HelpScreen from '../screens/common/HelpScreen';
import TermsScreen from '../screens/common/TermsScreen';
import PrivacyScreen from '../screens/common/PrivacyScreen';

import { DriverStackParamList } from './types';

const Stack = createNativeStackNavigator<DriverStackParamList>();

const DriverNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DriverDashboard"
      screenOptions={{ headerShown: false }}>

      {/* Dashboard */}
      <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />

      {/* Trips */}
      <Stack.Screen name="TripList" component={TripListScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />

      {/* Navigation / Map */}
      <Stack.Screen name="DriverMap" component={DriverMapScreen} />

      {/* Earnings */}
      <Stack.Screen name="DriverEarnings" component={DriverEarningsScreen} />

      {/* Common */}
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default DriverNavigator;
