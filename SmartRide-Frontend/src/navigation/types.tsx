// ─── Auth Stack ──────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  OTPVerification: { phone: string };
  ForgotPassword: undefined;
  SelectRole: undefined;
};

// ─── Customer Stack ─────────────────────────────────────────────────────────

export type CustomerStackParamList = {
  // Main Customer Pages
  Dashboard: undefined;
  CustomerHome: undefined;
  Browse: undefined;
  Bookings: undefined;
  Documents: undefined;
  Payments: undefined;
  Profile: undefined;

  // Home & Vehicles
  SearchVehicle: undefined;
  VehicleDetails: { vehicleId: string };
  Filter: undefined;

  // Booking
  SelectDate: { vehicleId: string };
  BookingDetails: { bookingId: string };
  UploadDocuments: { bookingId: string };
  BookingConfirmation: { bookingId: string };
  MyBookings: undefined;

  // Payment
  Payment: { bookingId: string };
  PaymentSuccess: { bookingId: string };
  Refund: { bookingId: string };

  // Tracking
  LiveTracking: { bookingId: string };

  // Reviews
  AddReview: {
    vehicleId: string;
    bookingId: string;
  };

  Reviews: {
    vehicleId: string;
  };

  // Profile Details
  EditProfile: undefined;
  Settings: undefined;

  // Common
  Notifications: undefined;
  Help: undefined;
  Terms: undefined;
  Privacy: undefined;
};

// ─── Vendor Stack ───────────────────────────────────────────────────────────

export type VendorStackParamList = {
  VendorDashboard: undefined;

  // Vehicles
  VehicleList: undefined;
  AddVehicle: undefined;
  EditVehicle: { vehicleId: string };
  VendorVehicleDetails: { vehicleId: string };
  VehicleAvailability: { vehicleId: string };

  // Bookings
  VendorBookings: undefined;
  VendorBookingDetails: { bookingId: string };

  // Earnings
  Earnings: undefined;

  // Documents
  VendorDocuments: undefined;

  // Profile
  VendorProfile: undefined;

  // Common
  Notifications: undefined;
  Help: undefined;
  Terms: undefined;
  Privacy: undefined;
};

// ─── Driver Stack ───────────────────────────────────────────────────────────

export type DriverStackParamList = {
  DriverDashboard: undefined;

  // Trips
  TripList: undefined;
  TripDetails: { tripId: string };
  ActiveTrip: { tripId: string };

  // Navigation
  DriverMap: { tripId: string };

  // Earnings
  DriverEarnings: undefined;

  // Common
  Notifications: undefined;
  Help: undefined;
  Terms: undefined;
  Privacy: undefined;
};

// ─── Admin Stack ─────────────────────────────────────────────────────────────

export type AdminStackParamList = {
  AdminDashboard: undefined;
  AdminUsers: undefined;
  AdminVendors: undefined;
  AdminBookings: undefined;
  AdminVehicles: undefined;
  AdminReports: undefined;
  AdminSettings: undefined;

  Notifications: undefined;
  Help: undefined;
};

// ─── Root Stack ──────────────────────────────────────────────────────────────
// These are the routes that RootNavigator directly controls.

export type RootStackParamList = {
  // Existing authentication flow
  Role: { selectedRole?: any } | undefined;
  Phone: { selectedRole?: any } | undefined;
  OTP: { selectedRole?: any; phoneNumber?: string } | undefined;

  // Customer Dashboard & Pages
  Dashboard: { selectedRole?: any } | undefined;
  Browse: undefined;
  Bookings: undefined;
  Documents: undefined;
  Payments: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Notifications: undefined;
  Help: undefined;
  Terms: undefined;
  Privacy: undefined;

  // Role-based navigators
  Auth: undefined;
  Customer: undefined;
  Vendor: undefined;
  Driver: undefined;
  Admin: undefined;
};