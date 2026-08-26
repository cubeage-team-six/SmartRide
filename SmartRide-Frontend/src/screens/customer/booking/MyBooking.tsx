import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookingsScreen from '../../BookingsScreen';
import { CustomerStackParamList } from '../../../navigation/types';

export type MyBookingsScreenProps = NativeStackScreenProps<CustomerStackParamList, 'MyBookings'>;

const MyBooking = ({ navigation, route }: MyBookingsScreenProps) => {
  return <BookingsScreen navigation={navigation as any} route={route as any} />;
};

export default MyBooking;
