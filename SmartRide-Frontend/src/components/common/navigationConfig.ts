import type { Role } from './Sidebar';

export type NavigationItem = {
  label: string;
  icon: string;
  route: string;
};

export const navigationItems: Record<Role, NavigationItem[]> = {
  customer: [
    { label: 'Home', icon: 'home-outline', route: 'CustomerHome' },
    { label: 'Search vehicles', icon: 'car-outline', route: 'SearchVehicle' },
    { label: 'My bookings', icon: 'calendar-outline', route: 'MyBookings' },
    { label: 'Reviews', icon: 'star-outline', route: 'Reviews' },
    { label: 'Profile', icon: 'person-outline', route: 'Profile' },
  ],
  driver: [
    { label: 'Dashboard', icon: 'grid-outline', route: 'DriverDashboard' },
    { label: 'My trips', icon: 'navigate-outline', route: 'TripList' },
    { label: 'Map', icon: 'map-outline', route: 'DriverMap' },
    { label: 'Earnings', icon: 'wallet-outline', route: 'DriverEarnings' },
  ],
  vendor: [
    { label: 'Dashboard', icon: 'grid-outline', route: 'VendorDashboard' },
    { label: 'Vehicles', icon: 'car-sport-outline', route: 'VehicleList' },
    { label: 'Bookings', icon: 'calendar-outline', route: 'VendorBookings' },
    { label: 'Earnings', icon: 'wallet-outline', route: 'Earnings' },
    { label: 'Profile', icon: 'person-outline', route: 'VendorProfile' },
  ],
  admin: [
    { label: 'Dashboard', icon: 'grid-outline', route: 'AdminDashboard' },
    { label: 'Users', icon: 'people-outline', route: 'AdminUsers' },
    { label: 'Vendors', icon: 'business-outline', route: 'AdminVendors' },
    { label: 'Bookings', icon: 'calendar-outline', route: 'AdminBookings' },
    { label: 'Vehicles', icon: 'car-outline', route: 'AdminVehicles' },
    { label: 'Reports', icon: 'bar-chart-outline', route: 'AdminReports' },
    { label: 'Settings', icon: 'settings-outline', route: 'AdminSettings' },
  ],
};
