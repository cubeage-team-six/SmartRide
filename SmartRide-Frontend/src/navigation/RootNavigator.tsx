import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import PhoneInputScreen from '../screens/PhoneInputScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import DashboardScreen from '../screens/DashboardScreen';

import { RootStackParamList } from '../types';

const Root = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Root.Navigator initialRouteName="Role" screenOptions={{ headerShown: false }}>
      <Root.Screen name="Role" component={RoleSelectionScreen} />
      <Root.Screen name="Phone" component={PhoneInputScreen} />
      <Root.Screen name="OTP" component={OTPVerificationScreen} />
      <Root.Screen name="Dashboard" component={DashboardScreen} />
    </Root.Navigator>
  );
};

export default RootNavigator;
