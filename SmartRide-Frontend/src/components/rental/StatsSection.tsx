import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { StatItem } from './StatItem';
import { StatItemData } from './types';

const STATS_DATA: StatItemData[] = [
  {
    id: '1',
    value: '50+',
    label: 'Vehicle Types',
  },
  {
    id: '2',
    value: '12,000+',
    label: 'Listings Nationwide',
  },
  {
    id: '3',
    value: '98%',
    label: 'Booking Success Rate',
  },
  {
    id: '4',
    value: '4.8★',
    label: 'Average Rating',
  },
];

export const StatsSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.sectionContainer}>
      <View style={[styles.contentWrapper, isMobile && styles.contentWrapperMobile]}>
        {/* Section Header */}
        <View style={styles.headerArea}>
          <Text style={styles.sectionTag}>BY THE NUMBERS</Text>
          <Text style={[styles.mainHeading, isMobile && styles.mainHeadingMobile]}>
            Driving India&apos;s rental{'\n'}future.
          </Text>
        </View>

        {/* Stats Row / Grid */}
        <View style={[styles.statsRow, isMobile && styles.statsGridMobile]}>
          {STATS_DATA.map((item) => (
            <StatItem key={item.id} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

const fontFamily = Platform.OS === 'web' ? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" : undefined;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#0B0F0D',
    width: '100%',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 48,
    paddingTop: 64,
    paddingBottom: 40,
  },
  contentWrapperMobile: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerArea: {
    marginBottom: 48,
  },
  sectionTag: {
    color: '#B7F000',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: 'uppercase',
    fontFamily,
  },
  mainHeading: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 58,
    fontFamily,
  },
  mainHeadingMobile: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 8,
  },
  statsGridMobile: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

