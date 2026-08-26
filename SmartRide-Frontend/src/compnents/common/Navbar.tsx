import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type NavbarProps = {
  title: string;
  role: string;
  onMenuPress: () => void;
  onNotificationsPress: () => void;
};

const Navbar = ({ title, role, onMenuPress, onNotificationsPress }: NavbarProps) => (
  <View style={styles.navbar}>
    <Pressable accessibilityLabel="Open navigation menu" accessibilityRole="button" hitSlop={8} onPress={onMenuPress} style={styles.iconButton}>
      <MaterialCommunityIcons name="menu" size={26} color="#14213D" />
    </Pressable>
    <View style={styles.heading}>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <Text style={styles.role}>{role.toUpperCase()}</Text>
    </View>
    <Pressable accessibilityLabel="Open notifications" accessibilityRole="button" hitSlop={8} onPress={onNotificationsPress} style={styles.iconButton}>
      <MaterialCommunityIcons name="bell-outline" size={23} color="#14213D" />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  navbar: { alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomColor: '#E5E7EB', borderBottomWidth: 1, flexDirection: 'row', minHeight: 64, paddingHorizontal: 18 },
  iconButton: { alignItems: 'center', height: 40, justifyContent: 'center', width: 40 },
  heading: { flex: 1, marginLeft: 8 },
  title: { color: '#14213D', fontSize: 20, fontWeight: '700' },
  role: { color: '#1C7C70', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
});

export default Navbar;