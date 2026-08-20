import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Home
import CustomerHomeScreen      from '../screens/customer/home/CustomerHome';
import SearchVehicleScreen     from '../screens/customer/home/SearchVehicle';
import VehicleDetailsScreen    from '../screens/customer/home/VehicleDetails';
import FilterScreen            from '../screens/customer/home/FilterScreen';

// Booking
import SelectDateScreen        from '../screens/customer/booking/SelectData';
import BookingDetailsScreen    from '../screens/customer/booking/BookingDetails';
import UploadDocumentsScreen   from '../screens/customer/booking/UploadDocuments';
import BookingConfirmationScreen from '../screens/customer/booking/BookingConfirmation';
import MyBookingsScreen        from '../screens/customer/booking/MyBooking';
// Payment
import PaymentScreen           from '../screens/customer/payment/Payment';
import PaymentSuccessScreen    from '../screens/customer/payment/PaymentSuccess';

// Tracking
import LiveTrackingScreen      from '../screens/customer/tracking/LiveTracking';

// Reviews
import AddReviewScreen         from '../screens/customer/reviews/AddReview';
import ReviewsScreen           from '../screens/customer/reviews/Reviews';

// Profile
import ProfileScreen           from '../screens/customer/profile/Profile';
import EditProfileScreen       from '../screens/customer/profile/EditProfile';
import DocumentsScreen         from '../screens/customer/profile/Documents';
import SettingsScreen          from '../screens/customer/profile/Settings';

// Common
import NotificationsScreen     from '../screens/common/NotificationsScreen';
import HelpScreen              from '../screens/common/HelpScreen';
import TermsScreen             from '../screens/common/TermsScreen';
import PrivacyScreen           from '../screens/common/PrivacyScreen';

import { CustomerStackParamList } from './types';
import withRoleLayout from '../components/common/withRoleLayout';

const Stack = createNativeStackNavigator<CustomerStackParamList>();
const CustomerHomeWithNavigation = withRoleLayout(CustomerHomeScreen, 'customer', 'Home');

const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerHome"
      screenOptions={{ headerShown: false }}>

      {/* ── Home ─────────────────────────────────────────── */}
      <Stack.Screen name="CustomerHome"        component={CustomerHomeWithNavigation} />
      <Stack.Screen name="SearchVehicle"       component={SearchVehicleScreen} />
      <Stack.Screen name="VehicleDetails"      component={VehicleDetailsScreen} />
      <Stack.Screen name="Filter"              component={FilterScreen} />

      {/* ── Booking ──────────────────────────────────────── */}
      <Stack.Screen name="SelectDate"          component={SelectDateScreen} />
      <Stack.Screen name="BookingDetails"      component={BookingDetailsScreen} />
      <Stack.Screen name="UploadDocuments"     component={UploadDocumentsScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="MyBookings"          component={MyBookingsScreen} />

      {/* ── Payment ──────────────────────────────────────── */}
      <Stack.Screen name="Payment"             component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess"      component={PaymentSuccessScreen} />

      {/* ── Tracking ─────────────────────────────────────── */}
      <Stack.Screen name="LiveTracking"        component={LiveTrackingScreen} />

      {/* ── Reviews ──────────────────────────────────────── */}
      <Stack.Screen name="AddReview"           component={AddReviewScreen} />
      <Stack.Screen name="Reviews"             component={ReviewsScreen} />

      {/* ── Profile ──────────────────────────────────────── */}
      <Stack.Screen name="Profile"             component={ProfileScreen} />
      <Stack.Screen name="EditProfile"         component={EditProfileScreen} />
      <Stack.Screen name="Documents"           component={DocumentsScreen} />
      <Stack.Screen name="Settings"            component={SettingsScreen} />

      {/* ── Common ───────────────────────────────────────── */}
      <Stack.Screen name="Notifications"       component={NotificationsScreen} />
      <Stack.Screen name="Help"                component={HelpScreen} />
      <Stack.Screen name="Terms"               component={TermsScreen} />
      <Stack.Screen name="Privacy"             component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
