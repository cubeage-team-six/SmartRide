import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import PhoneInputScreen from '../screens/PhoneInputScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import CustomerDashboardScreen from '../screens/CustomerDashboardScreen';
import BrowseScreen from '../screens/BrowseScreen';
import BookingsScreen from '../screens/BookingsScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/customer/profile/EditProfile';
import SettingsScreen from '../screens/customer/profile/Settings';
import NotificationsScreen from '../screens/common/NotificationsScreen';
import HelpScreen from '../screens/common/HelpScreen';
import TermsScreen from '../screens/common/TermsScreen';
import PrivacyScreen from '../screens/common/PrivacyScreen';

import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import VendorNavigator from './VendorNavigator';
import DriverNavigator from './DriverNavigator';
import AdminNavigator from './AdminNavigator';

import { RootStackParamList } from './types';

const Root = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Root.Navigator
      initialRouteName="Role"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Authentication */}
      <Root.Screen
        name="Role"
        component={RoleSelectionScreen}
      />

      <Root.Screen
        name="Phone"
        component={PhoneInputScreen}
      />

      <Root.Screen
        name="OTP"
        component={OTPVerificationScreen}
      />

      {/* Customer Dashboard & Sidebar Pages */}
      <Root.Screen
        name="Dashboard"
        component={CustomerDashboardScreen}
      />

      <Root.Screen
        name="Browse"
        component={BrowseScreen}
      />

      <Root.Screen
        name="Bookings"
        component={BookingsScreen}
      />

      <Root.Screen
        name="Documents"
        component={DocumentsScreen}
      />

      <Root.Screen
        name="Payments"
        component={PaymentsScreen}
      />

      <Root.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Root.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />

      <Root.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Root.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Root.Screen
        name="Help"
        component={HelpScreen}
      />

      <Root.Screen
        name="Terms"
        component={TermsScreen}
      />

      <Root.Screen
        name="Privacy"
        component={PrivacyScreen}
      />

      {/* Role Navigators */}
      <Root.Screen
        name="Auth"
        component={AuthNavigator}
      />

      <Root.Screen
        name="Customer"
        component={CustomerNavigator}
      />

      <Root.Screen
        name="Vendor"
        component={VendorNavigator}
      />

      <Root.Screen
        name="Driver"
        component={DriverNavigator}
      />

      <Root.Screen
        name="Admin"
        component={AdminNavigator}
      />
    </Root.Navigator>
  );
};

export default RootNavigator;