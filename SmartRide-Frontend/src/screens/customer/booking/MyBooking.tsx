import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Footer, { FooterTab } from '../../../compnents/common/Footer';
import type { CustomerStackParamList } from '../../../navigation/types';

type CustomerNavigation = NativeStackNavigationProp<CustomerStackParamList>;

const MyBookings = () => {
  const navigation = useNavigation<CustomerNavigation>();

  const handleTabPress = (tab: FooterTab) => {
    if (tab === 'home') {
      navigation.navigate('CustomerHome');
    } else if (tab === 'profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.text}>My bookings</Text>
      </View>
      <Footer activeTab="bookings" onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default MyBookings;
