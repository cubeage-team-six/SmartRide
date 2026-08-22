import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { ShellNavigation } from './Navbar';

export type Role = 'customer' | 'driver' | 'vendor' | 'admin';

type Item = { label: string; icon: string; route: string };
type Props = { role: Role; items: Item[]; visible: boolean; navigation: ShellNavigation; onClose: () => void };

const Sidebar = ({ role, items, visible, navigation, onClose }: Props) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
    <View style={styles.backdrop}>
      <Pressable onPress={onClose} style={styles.dismiss} />
      <View style={styles.panel}>
        <View style={styles.logoRow}><View style={styles.logo}><Ionicons color="#FFFFFF" name="car-sport" size={20} /></View><Text style={styles.logoText}>SmartRide</Text></View>
        <Text style={styles.role}>{role.toUpperCase()} MENU</Text>
        <View style={styles.items}>{items.map(item => <Pressable key={item.route} onPress={() => { onClose(); navigation.navigate(item.route); }} style={styles.item}><Ionicons color="#687386" name={item.icon} size={20} /><Text style={styles.itemText}>{item.label}</Text><Ionicons color="#B6BFCC" name="chevron-forward" size={16} /></Pressable>)}</View>
        <View style={styles.footer}><Pressable onPress={() => { onClose(); navigation.navigate('Notifications'); }} style={styles.item}><Ionicons color="#687386" name="notifications-outline" size={20} /><Text style={styles.itemText}>Notifications</Text></Pressable><Pressable onPress={() => { onClose(); navigation.navigate('Help'); }} style={styles.item}><Ionicons color="#687386" name="help-circle-outline" size={20} /><Text style={styles.itemText}>Help centre</Text></Pressable></View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: { backgroundColor: 'rgba(20, 33, 61, 0.38)', flex: 1, flexDirection: 'row' },
  dismiss: { flex: 1 },
  panel: { backgroundColor: '#FFFFFF', elevation: 12, paddingHorizontal: 18, paddingTop: 28, shadowColor: '#14213D', shadowOpacity: 0.2, shadowRadius: 12, width: 286 },
  logoRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 38 },
  logo: { alignItems: 'center', backgroundColor: '#1C7C70', borderRadius: 10, height: 38, justifyContent: 'center', width: 38 },
  logoText: { color: '#14213D', fontSize: 20, fontWeight: '800', marginLeft: 10 },
  role: { color: '#A1A9B8', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  items: { gap: 6 },
  item: { alignItems: 'center', borderRadius: 10, flexDirection: 'row', minHeight: 48, paddingHorizontal: 12 },
  itemText: { color: '#354052', flex: 1, fontSize: 14, fontWeight: '600', marginLeft: 12 },
  footer: { borderTopColor: '#E7EAF0', borderTopWidth: 1, gap: 6, marginTop: 24, paddingTop: 18 },
});

export default Sidebar;
