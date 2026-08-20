import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { Role } from './Sidebar';

export type ShellNavigation = { navigate: (route: string) => void };

const roleLabels: Record<Role, string> = {
  customer: 'Customer portal',
  driver: 'Driver portal',
  vendor: 'Vendor portal',
  admin: 'Admin portal',
};

type Props = {
  role: Role;
  title: string;
  navigation: ShellNavigation;
  onMenuPress: () => void;
};

const Navbar = ({ role, title, navigation, onMenuPress }: Props) => (
  <View style={styles.container}>
    <Pressable accessibilityLabel="Open navigation" onPress={onMenuPress} style={styles.iconButton}>
      <Ionicons color="#14213D" name="menu-outline" size={25} />
    </Pressable>
    <View style={styles.heading}>
      <Text style={styles.brand}>SmartRide</Text>
      <Text style={styles.title}>{title || roleLabels[role]}</Text>
    </View>
    <Pressable accessibilityLabel="Open notifications" onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
      <Ionicons color="#14213D" name="notifications-outline" size={22} />
      <View style={styles.dot} />
    </Pressable>
    <View style={styles.avatar}><Text style={styles.avatarText}>{role[0].toUpperCase()}</Text></View>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomColor: '#E7EAF0', borderBottomWidth: 1, flexDirection: 'row', height: 70, paddingHorizontal: 18 },
  iconButton: { alignItems: 'center', height: 42, justifyContent: 'center', position: 'relative', width: 42 },
  heading: { flex: 1, marginLeft: 8 },
  brand: { color: '#14213D', fontSize: 16, fontWeight: '800' },
  title: { color: '#7B8496', fontSize: 12, marginTop: 2 },
  dot: { backgroundColor: '#F45B69', borderColor: '#FFF', borderRadius: 5, borderWidth: 1, height: 10, position: 'absolute', right: 7, top: 7, width: 10 },
  avatar: { alignItems: 'center', backgroundColor: '#E7F4F1', borderRadius: 18, height: 36, justifyContent: 'center', marginLeft: 4, width: 36 },
  avatarText: { color: '#1C7C70', fontSize: 15, fontWeight: '800' },
});

export default Navbar;
