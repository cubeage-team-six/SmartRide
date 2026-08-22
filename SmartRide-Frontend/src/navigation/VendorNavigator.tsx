import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Placeholder components for screens not yet created
// Replace each import with actual screen once file is created

import NotificationsScreen from '../screens/common/NotificationsScreen';
import HelpScreen from '../screens/common/HelpScreen';
import TermsScreen from '../screens/common/TermsScreen';
import PrivacyScreen from '../screens/common/PrivacyScreen';

import { VendorStackParamList } from './types';
import withRoleLayout from '../compnents/common/withRoleLayout';

// ─── Placeholder factory ───────────────────────────────────────────────────
import { View, Text } from 'react-native';
const Placeholder = (name: string) => () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name} — Coming Soon</Text>
  </View>
);

const VendorDashboardScreen = withRoleLayout(Placeholder('Vendor Dashboard'), 'vendor', 'Dashboard');
const VehicleListScreen = Placeholder('Vehicle List');
const AddVehicleScreen = Placeholder('Add Vehicle');
const EditVehicleScreen = Placeholder('Edit Vehicle');
const VendorVehicleDetailsScreen = Placeholder('Vehicle Details');
const VehicleAvailabilityScreen = Placeholder('Vehicle Availability');
const VendorBookingsScreen = Placeholder('Vendor Bookings');
const VendorBookingDetailsScreen = Placeholder('Vendor Booking Details');
const EarningsScreen = Placeholder('Earnings');
const VendorDocumentsScreen = Placeholder('Vendor Documents');
const VendorProfileScreen = Placeholder('Vendor Profile');

// ─────────────────────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator<VendorStackParamList>();

const VendorNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="VendorDashboard"
      screenOptions={{ headerShown: false }}>

      {/* Dashboard */}
      <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />

      {/* Vehicles */}
      <Stack.Screen name="VehicleList" component={VehicleListScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
      <Stack.Screen name="VendorVehicleDetails" component={VendorVehicleDetailsScreen} />
      <Stack.Screen name="VehicleAvailability" component={VehicleAvailabilityScreen} />

      {/* Bookings */}
      <Stack.Screen name="VendorBookings" component={VendorBookingsScreen} />
      <Stack.Screen name="VendorBookingDetails" component={VendorBookingDetailsScreen} />

      {/* Earnings */}
      <Stack.Screen name="Earnings" component={EarningsScreen} />

      {/* Documents */}
      <Stack.Screen name="VendorDocuments" component={VendorDocumentsScreen} />

      {/* Profile */}
      <Stack.Screen name="VendorProfile" component={VendorProfileScreen} />

      {/* Common */}
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default VendorNavigator;
