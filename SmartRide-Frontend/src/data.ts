import {colors} from './theme';
import {ProcessStep, VehicleCard, VendorStat} from './types';

export const filterLabels = [
  'Cars & SUVs',
  'Two-Wheelers',
  'Commercial Fleet',
  'Heavy Equipment',
];

export const vehicleCards: VehicleCard[] = [
  {
    id: 'cars-suvs',
    badge: {
      label: 'Most Popular',
      backgroundColor: colors.brand.green,
      textColor: colors.brand.dark,
    },
    highlighted: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0aU60hR635ixrIW10YCxbwZnhVv8jOGWJsdf8z-0_W7qx77eqOPVcqPv9Av0CJ7rlOvIMixhEoDNCK3QfQ9g_-WyvjHcQyarAwOP2f5aHWB_3qr1VQjx7W5wVkBSLOYckC7hxaimSg3iE-bcLASApIvefMIFdNWSV8coCliQZxyfezKoReTizBX_wi-z8aagsH-NLX6fc1rgfErYDS8gz27C_AJ-8BlxP3wy1V9TIiK_-_ZublpgL',
    imageBackground: '#E5E7EB',
    title: 'Cars & SUVs',
    features: ['From ₹799/day', 'Self-drive', 'Hatchback → Luxury'],
  },
  {
    id: 'two-wheelers',
    badge: {
      label: 'Quick Rides',
      backgroundColor: colors.badge.dark,
      textColor: colors.brand.green,
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDe0OP8UxGJtEoItE7rapS8Wx-rcLmNEYrP7q7_hJGexL9oEaAJihX5bwLjJ7g6eEGS_uHAc4VVx73tEtBH-hLw6uVt9fzsPSmRWnb24ZnOi7268YKHpBHV-rtXdbw5suaTA62IpwoyB04xAM74s5XR8FRGt2aX5GWkt4YInWOVPpB4kpn9wbUGkMOapm6euGYC2npO42h5eNI2pSoiaB64TRFJmy3EOeZ3Fh159QK-ip7n53V6mjdC',
    imageBackground: '#DBEAFE',
    title: 'Two-Wheelers',
    features: ['From ₹249/day', 'Scooters & Bikes', 'City & Adventure'],
  },
  {
    id: 'commercial-fleet',
    badge: {
      label: 'Business',
      backgroundColor: colors.badge.blue,
      textColor: colors.white,
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABxZ4wb2RhE4MN67AeeWXI-q-8TcafngCmH8EpFFUMsHBHQpizz41zZNc1zzl-jJY6t8zcX48ZWL0m6fuW7bnFDVVBf8mMgcDlHY3PGPX7mRkwVGsmSaQq6ArfksjHUHeAGR6L_UXR473MxEFA2vfOTtaA-TeMRE8OACOcKhX4Nydb60rJPO4a8tWZgKBe4I3pvm15cW6ttwvNPCPQE1O-f5PDeh7gyb7ZH1HN8wmm5xBNSfg5i09u',
    imageBackground: '#E5E7EB',
    title: 'Commercial Fleet',
    features: ['From ₹1,499/day', 'Trucks & Vans', 'Driver available'],
  },
  {
    id: 'heavy-equipment',
    badge: {
      label: 'Industrial',
      backgroundColor: colors.badge.orange,
      textColor: colors.white,
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADhOdrO1SmeNGTauT2NvAXhLrnyB7IgUrz3svOOtNVVmDmvdHBOXhCjhtKL1SMTEh5Y-Ped6kM0fb-xV9lhnG9wzUrJIDTlNiM0Q75IDLzGOaBhjPXgw7Tj5XFsne9GtKfOb1SABF3hZND5xUft5U4mkKfqhE0rK30PoTYB5LaOhO9nfCOrK7xjZU9j0ColB8N4eEohFgpR1fQ1Iav6WCrxcMV4s1MfM4DL_DYI8h_BFT-56NNlTIn',
    imageBackground: '#E5E7EB',
    title: 'Heavy Equipment',
    features: ['From ₹4,999/day', 'JCBs & Cranes', 'Operator included'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Search your location',
    description:
      'Enter pickup city, date, and vehicle type. Filter by price, fuel, and category.',
  },
  {
    number: '02',
    title: 'Book & pay securely',
    description:
      'Choose a vendor, upload your driving license, and complete payment in one flow.',
  },
  {
    number: '03',
    title: 'Pick up & go',
    description:
      'Collect the vehicle from the vendor. GPS tracking activates automatically.',
  },
  {
    number: '04',
    title: 'Return & rate',
    description:
      'Drop off the vehicle, receive your security refund, and rate the experience.',
  },
];

export const vendorStats: VendorStat[] = [
  {value: '₹0', label: 'Listing Fee'},
  {value: '3%', label: 'Commission Only'},
  {value: '24h', label: 'Payout Cycle'},
  {value: '5min', label: 'Onboarding'},
];