import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatsSection } from './StatsSection';
import { FeatureCards } from './FeatureCard';
import { ReviewSection } from './ReviewSection';

export const RentalPlatformScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Section 1: BY THE NUMBERS */}
      <View style={styles.darkSection}>
        <StatsSection />
        <FeatureCards />
      </View>

      {/* Section 2: OUR COMMUNITY */}
      <View style={styles.lightSection}>
        <ReviewSection />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0D',
  },
  contentContainer: {
    flexGrow: 1,
  },
  darkSection: {
    backgroundColor: '#0B0F0D',
    width: '100%',
  },
  lightSection: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
});

export default RentalPlatformScreen;
