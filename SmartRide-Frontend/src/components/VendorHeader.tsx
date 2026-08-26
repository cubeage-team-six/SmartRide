import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {VENDOR} from '../vendorTheme';

function VendorHeader() {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.header, width < 768 && styles.headerCompact]}>
      <View style={[styles.searchBox, width < 768 && styles.searchBoxCompact]}>
        <FontAwesome6
          solid
          name="magnifying-glass"
          size={14}
          color={VENDOR.gray400}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={VENDOR.gray400}
        />
      </View>
      <View style={styles.headerRight}>
        <Pressable style={styles.bellButton}>
          <FontAwesome6 solid name="bell" size={18} color={VENDOR.gray400} />
          <View style={styles.bellDot} />
        </Pressable>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>F</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: VENDOR.white,
    borderBottomWidth: 1,
    borderBottomColor: VENDOR.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  headerCompact: {
    paddingHorizontal: 16,
  },
  searchBox: {
    width: 384,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VENDOR.gray50,
    borderRadius: 999,
    paddingHorizontal: 12,
  },
  searchBoxCompact: {
    flex: 1,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: VENDOR.gray700,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    position: 'relative',
    marginRight: 24,
  },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: VENDOR.green,
    borderWidth: 2,
    borderColor: VENDOR.white,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: VENDOR.white,
  },
});

export default VendorHeader;