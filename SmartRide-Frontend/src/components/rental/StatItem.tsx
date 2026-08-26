import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { StatItemData } from './types';

interface StatItemProps {
  item: StatItemData;
}

export const StatItem: React.FC<StatItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      {/* Lime Accent Vertical Bar */}
      <View style={styles.limeBar} />

      {/* Content Container */}
      <View style={styles.textContainer}>
        <Text style={[styles.valueText, isMobile && styles.valueTextMobile]}>
          {item.value}
        </Text>
        <Text style={[styles.labelText, isMobile && styles.labelTextMobile]}>
          {item.label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    minWidth: 160,
    paddingRight: 16,
  },
  containerMobile: {
    minWidth: '45%',
    marginBottom: 20,
  },
  limeBar: {
    width: 2.5,
    backgroundColor: '#B7F000',
    borderRadius: 2,
    marginRight: 14,
  },
  textContainer: {
    justifyContent: 'center',
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 46,
    marginBottom: 4,
    fontFamily: Platform.OS === 'web' ? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" : undefined,
  },
  valueTextMobile: {
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 2,
  },
  labelText: {
    color: '#929792',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: Platform.OS === 'web' ? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" : undefined,
  },
  labelTextMobile: {
    fontSize: 13,
    lineHeight: 18,
  },
});

