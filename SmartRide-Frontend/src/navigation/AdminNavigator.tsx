import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotificationsScreen from '../screens/common/NotificationsScreen';
import HelpScreen from '../screens/common/HelpScreen';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminUsers from '../screens/admin/AdminUsers';
import AdminVendors from '../screens/admin/AdminVendors';
import AdminBookings from '../screens/admin/AdminBookings';
import AdminVehicles from '../screens/admin/AdminVehicles';
import AdminReports from '../screens/admin/AdminReports';
import AdminSettings from '../screens/admin/AdminSettings';
import withRoleLayout from '../compnents/common/withRoleLayout';
import { AdminStackParamList } from './types';

const Stack = createNativeStackNavigator<AdminStackParamList>();
const AdminNavigator = () => <Stack.Navigator initialRouteName="AdminDashboard" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="AdminDashboard" component={withRoleLayout(AdminDashboard, 'admin', 'Dashboard')} />
  <Stack.Screen name="AdminUsers" component={withRoleLayout(AdminUsers, 'admin', 'Users')} />
  <Stack.Screen name="AdminVendors" component={withRoleLayout(AdminVendors, 'admin', 'Vendors')} />
  <Stack.Screen name="AdminBookings" component={withRoleLayout(AdminBookings, 'admin', 'Bookings')} />
  <Stack.Screen name="AdminVehicles" component={withRoleLayout(AdminVehicles, 'admin', 'Vehicles')} />
  <Stack.Screen name="AdminReports" component={withRoleLayout(AdminReports, 'admin', 'Reports')} />
  <Stack.Screen name="AdminSettings" component={withRoleLayout(AdminSettings, 'admin', 'Settings')} />
  <Stack.Screen name="Notifications" component={withRoleLayout(NotificationsScreen, 'admin', 'Notifications')} />
  <Stack.Screen name="Help" component={withRoleLayout(HelpScreen, 'admin', 'Help centre')} />
</Stack.Navigator>;

export default AdminNavigator;
