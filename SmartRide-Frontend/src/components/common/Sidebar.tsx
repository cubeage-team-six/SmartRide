import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type Role = 'customer' | 'driver' | 'vendor' | 'admin';
export type SidebarItem = { label: string; route: string; icon: string };

type SidebarProps = {
  role: Role | string;
  items: SidebarItem[];
  onClose: () => void;
  onNavigate: (route: string) => void;
};

const Sidebar = ({ role, items, onClose, onNavigate }: SidebarProps) => {
  const { width } = useWindowDimensions();
  const sidebarWidth = Math.min(286, width * 0.84);

  return (
    <View style={styles.overlay}>
      <Pressable accessibilityLabel="Close navigation menu" onPress={onClose} style={styles.backdrop} />
      <View style={[styles.sidebar, { width: sidebarWidth }]}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark}><MaterialCommunityIcons name="car-side" size={22} color="#FFFFFF" /></View>
        <Text style={styles.brand}>SmartRide</Text>
        <Pressable accessibilityLabel="Close navigation menu" accessibilityRole="button" hitSlop={8} onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={22} color="#64748B" />
        </Pressable>
      </View>
      <Text style={styles.sectionLabel}>{role} workspace</Text>
        {items.map(item => (
          <Pressable accessibilityRole="button" key={item.route} onPress={() => onNavigate(item.route)} style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
            <MaterialCommunityIcons name={item.icon} size={21} color="#1C7C70" />
            <Text style={styles.itemLabel}>{item.label}</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color="#94A3B8" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFill, flexDirection: 'row', zIndex: 10 },
  backdrop: { backgroundColor: 'rgba(15, 23, 42, 0.42)', flex: 1 },
  sidebar: { backgroundColor: '#FFFFFF', elevation: 8, paddingHorizontal: 18, paddingTop: 22, shadowColor: '#0F172A', shadowOffset: { width: 3, height: 0 }, shadowOpacity: 0.18, shadowRadius: 8 },
  brandRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 30 },
  brandMark: { alignItems: 'center', backgroundColor: '#1C7C70', borderRadius: 8, height: 38, justifyContent: 'center', width: 38 },
  brand: { color: '#14213D', fontSize: 19, fontWeight: '800', marginLeft: 10 },
  closeButton: { alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' },
  sectionLabel: { color: '#94A3B8', fontSize: 11, fontWeight: '700', letterSpacing: 0.7, marginBottom: 10, textTransform: 'uppercase' },
  item: { alignItems: 'center', borderRadius: 8, flexDirection: 'row', minHeight: 48, paddingHorizontal: 10 },
  itemPressed: { backgroundColor: '#EFF7F5' },
  itemLabel: { color: '#334155', flex: 1, fontSize: 15, fontWeight: '600', marginLeft: 12 },
});

export default Sidebar;
