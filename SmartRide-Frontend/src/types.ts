import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, CustomerStackParamList } from './navigation/types';

export interface Role {
    id: string;
    title: string;
    desc: string;
    badge: string;
    iconName: string;
    borderColor: string;
    bgSelected: string;
}

export type { RootStackParamList, CustomerStackParamList };

export type RoleScreenProps = NativeStackScreenProps<RootStackParamList, 'Role'>;
export type PhoneScreenProps = NativeStackScreenProps<RootStackParamList, 'Phone'>;
export type OTPScreenProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type BrowseScreenProps = NativeStackScreenProps<RootStackParamList, 'Browse'>;
export type BookingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Bookings'>;
export type MyBookingsScreenProps = NativeStackScreenProps<CustomerStackParamList, 'MyBookings'>;
export type DocumentsScreenProps = NativeStackScreenProps<RootStackParamList, 'Documents'>;
export type PaymentsScreenProps = NativeStackScreenProps<RootStackParamList, 'Payments'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type NotificationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Notifications'>;
export type HelpScreenProps = NativeStackScreenProps<RootStackParamList, 'Help'>;
export type TermsScreenProps = NativeStackScreenProps<RootStackParamList, 'Terms'>;
export type PrivacyScreenProps = NativeStackScreenProps<RootStackParamList, 'Privacy'>;

export type CustomerBrowseProps = NativeStackScreenProps<CustomerStackParamList, 'Browse'>;

export type VehicleBadge = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

export type VehicleCard = {
  id: string;
  badge: VehicleBadge;
  highlighted?: boolean;
  image: string;
  imageBackground: string;
  title: string;
  features: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type VendorStat = {
  value: string;
  label: string;
};
