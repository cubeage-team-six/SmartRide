import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type FooterTab = 'home' | 'bookings' | 'profile';

type FooterProps = {
  activeTab: FooterTab;
  onTabPress: (tab: FooterTab) => void;
};

const tabs: Array<{ key: FooterTab; label: string; icon: string }> = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'bookings', label: 'Bookings', icon: 'clipboard-text-outline' },
  { key: 'profile', label: 'Profile', icon: 'account-outline' },
];

const Footer = ({ activeTab, onTabPress }: FooterProps) => {
  return (
    <View style={styles.footer}>
      {tabs.map(tab => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabPress(tab.key)}
            style={styles.tab}>
            <MaterialCommunityIcons
              name={tab.icon}
              size={22}
              color={isActive ? '#1D4ED8' : '#6B7280'}
            />
            <Text style={[styles.label, isActive && styles.activeText]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    minHeight: 68,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  activeText: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
});

export default Footer;