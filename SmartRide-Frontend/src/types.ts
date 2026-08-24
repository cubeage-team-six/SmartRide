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