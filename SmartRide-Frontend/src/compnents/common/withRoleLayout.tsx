import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Navbar from './Navbar';
import Sidebar, { SidebarItem } from './Sidebar';

type Role = 'admin' | 'customer' | 'driver' | 'vendor';

const sidebarItems: Record<Role, SidebarItem[]> = {
  admin: [
    { label: 'Dashboard', route: 'AdminDashboard', icon: 'view-dashboard-outline' },
    { label: 'Users', route: 'AdminUsers', icon: 'account-group-outline' },
    { label: 'Vendors', route: 'AdminVendors', icon: 'store-outline' },
    { label: 'Bookings', route: 'AdminBookings', icon: 'clipboard-text-outline' },
    { label: 'Vehicles', route: 'AdminVehicles', icon: 'car-multiple' },
    { label: 'Reports', route: 'AdminReports', icon: 'chart-line' },
    { label: 'Settings', route: 'AdminSettings', icon: 'cog-outline' },
  ],
  customer: [
    { label: 'Home', route: 'CustomerHome', icon: 'home-outline' },
    { label: 'Search vehicles', route: 'SearchVehicle', icon: 'car-search' },
    { label: 'My bookings', route: 'MyBookings', icon: 'clipboard-text-outline' },
    { label: 'Profile', route: 'Profile', icon: 'account-outline' },
    { label: 'Settings', route: 'Settings', icon: 'cog-outline' },
  ],
  driver: [
    { label: 'Dashboard', route: 'DriverDashboard', icon: 'view-dashboard-outline' },
    { label: 'Trips', route: 'TripList', icon: 'map-marker-path' },
    { label: 'Earnings', route: 'DriverEarnings', icon: 'cash-multiple' },
  ],
  vendor: [
    { label: 'Dashboard', route: 'VendorDashboard', icon: 'view-dashboard-outline' },
    { label: 'Vehicles', route: 'VehicleList', icon: 'car-multiple' },
    { label: 'Bookings', route: 'VendorBookings', icon: 'clipboard-text-outline' },
    { label: 'Earnings', route: 'Earnings', icon: 'cash-multiple' },
    { label: 'Profile', route: 'VendorProfile', icon: 'account-outline' },
  ],
};

const withRoleLayout = <Props extends object>(
  ScreenComponent: React.ComponentType<Props>,
  role: Role,
  title: string,
) => {
  const RoleLayout = (props: Props) => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const [isSidebarVisible, setSidebarVisible] = React.useState(false);

    const navigate = (route: string) => {
      setSidebarVisible(false);
      navigation.navigate(route);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Navbar onMenuPress={() => setSidebarVisible(true)} onNotificationsPress={() => navigate('Notifications')} role={role} title={title} />
        <View style={styles.content}><ScreenComponent {...props} /></View>
        {isSidebarVisible && <Sidebar items={sidebarItems[role]} onClose={() => setSidebarVisible(false)} onNavigate={navigate} role={role} />}
      </SafeAreaView>
    );
  };

  RoleLayout.displayName = `withRoleLayout(${ScreenComponent.displayName || ScreenComponent.name || 'Screen'})`;

  return RoleLayout;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    flex: 1,
  },
});

export default withRoleLayout;