import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import OTPVerificationScreen from '../screens/auth/OTPVerification';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import SelectRoleScreen from '../screens/auth/SelectRole';

import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash"           component={SplashScreen} />
      <Stack.Screen name="Login"            component={Login} />
      <Stack.Screen name="Register"         component={Register} />
      <Stack.Screen name="OTPVerification"  component={OTPVerificationScreen} />
      <Stack.Screen name="ForgotPassword"   component={ForgotPasswordScreen} />
      <Stack.Screen name="SelectRole"       component={SelectRoleScreen} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
