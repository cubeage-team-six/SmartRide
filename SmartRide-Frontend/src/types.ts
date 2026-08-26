import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface Role {
    id: string;
    title: string;
    desc: string;
    badge: string;
    iconName: string;
    borderColor: string;
    bgSelected: string;
}

export type RootStackParamList = {
    Role: undefined;
    Phone: { selectedRole: Role };
    OTP: { selectedRole: Role; phoneNumber: string };
    Dashboard: { selectedRole?: Role };
};

export type RoleScreenProps = NativeStackScreenProps<RootStackParamList, 'Role'>;
export type PhoneScreenProps = NativeStackScreenProps<RootStackParamList, 'Phone'>;
export type OTPScreenProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

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
