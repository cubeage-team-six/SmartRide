import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {VENDOR, VendorPage} from '../vendorTheme';

const NAV_ITEMS: {key: string; icon: string; label: string}[] = [
  {key: 'dashboard', icon: 'border-all', label: 'Dashboard'},
  {key: 'fleet', icon: 'car', label: 'My Fleet'},
  {key: 'bookings', icon: 'clipboard-list', label: 'Bookings'},
  {key: 'earnings', icon: 'money-bill-wave', label: 'Earnings'},
  {key: 'documents', icon: 'file-lines', label: 'Documents'},
  {key: 'settings', icon: 'gear', label: 'Settings'},
];

const ROLES = ['Customer', 'Driver', 'Admin'];

function VendorSidebar({
  active,
  onNavigate,
}: {
  active: VendorPage;
  onNavigate: (page: VendorPage) => void;
}) {
  return (
    <View style={styles.sidebar}>
      <View>
        <Pressable style={styles.logoRow} onPress={() => onNavigate('dashboard')}>
          <View style={styles.logoBox}>
            <FontAwesome6 solid name="car" size={14} color={VENDOR.dark} />
          </View>
          <Text style={styles.logoName}>RideAny</Text>
        </Pressable>

        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>F</Text>
          </View>
          <View>
            <Text style={styles.profileName}>Fleet Co.</Text>
            <Text style={styles.profileRole}>Vendor</Text>
          </View>
        </View>

        <View style={styles.nav}>
          {NAV_ITEMS.map(item => {
            const isActive = item.key === active;
            return (
              <Pressable
                key={item.key}
                onPress={() => {
                  if (
                    item.key === 'dashboard' ||
                    item.key === 'fleet' ||
                    item.key === 'bookings' ||
                    item.key === 'earnings' ||
                    item.key === 'documents' ||
                    item.key === 'settings'
                  ) {
                    onNavigate(item.key as VendorPage);
                  }
                }}
                style={[
                  styles.navItem,
                  isActive ? styles.navItemActive : styles.navItemInactive,
                ]}>
                <View style={styles.navIcon}>
                  <FontAwesome6
                    solid
                    name={item.icon}
                    size={16}
                    color={isActive ? VENDOR.dark : VENDOR.gray400}
                  />
                </View>
                <Text style={[styles.navLabel, isActive && styles.navTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.roleSection}>
          <Text style={styles.roleHeading}>Switch Role</Text>
          {ROLES.map(role => (
            <View key={role} style={styles.roleItem}>
              <View style={styles.roleDot} />
              <Text style={styles.roleText}>{role}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.signOut}>
        <Pressable style={styles.signOutLink}>
          <FontAwesome6
            solid
            name="arrow-right-from-bracket"
            size={14}
            color={VENDOR.gray400}
            style={styles.signOutIcon}
          />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 256,
    backgroundColor: VENDOR.dark,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoRow: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoBox: {
    backgroundColor: VENDOR.green,
    padding: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  logoName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: VENDOR.white,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: VENDOR.gray800,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: VENDOR.white,
  },
  profileName: {
    fontWeight: '600',
    fontSize: 14,
    color: VENDOR.white,
  },
  profileRole: {
    fontSize: 12,
    color: '#60A5FA',
  },
  nav: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: VENDOR.green,
  },
  navItemInactive: {
    backgroundColor: 'transparent',
  },
  navIcon: {
    width: 24,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: VENDOR.gray400,
  },
  navTextActive: {
    color: VENDOR.dark,
  },
  roleSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  roleHeading: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: VENDOR.gray500,
    marginBottom: 12,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: VENDOR.gray600,
    marginRight: 12,
  },
  roleText: {
    fontSize: 14,
    color: VENDOR.gray400,
  },
  signOut: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: VENDOR.gray800,
  },
  signOutLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutIcon: {
    marginRight: 12,
  },
  signOutText: {
    fontSize: 14,
    color: VENDOR.gray400,
  },
});

export default VendorSidebar;