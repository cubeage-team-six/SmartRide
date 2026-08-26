import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { ReviewCard } from './ReviewCard';
import { ReviewCardData } from './types';

const REVIEWS_DATA: ReviewCardData[] = [
  {
    id: '1',
    rating: 5,
    quote:
      'Rented a Mahindra Thar for a Coorg trip through RideAny. The GPS tracking gave my family real-time peace of mind. Seamless experience.',
    userName: 'Arjun Mehta',
    userRole: 'SUV Renter, Bangalore',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  },
  {
    id: '2',
    rating: 5,
    quote:
      'I listed my fleet of 8 trucks on RideAny. Bookings doubled in the first month. The vendor dashboard is genuinely excellent.',
    userName: 'Priya Nair',
    userRole: 'Fleet Vendor, Chennai',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
  },
  {
    id: '3',
    rating: 5,
    quote:
      'Hired a JCB for site work — I never thought I could do that from an app. RideAny made industrial equipment rental accessible.',
    userName: 'Rohit Kapoor',
    userRole: 'Construction Manager, Pune',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
  },
];

export const ReviewSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.sectionContainer}>
      <View style={[styles.contentWrapper, isMobile && styles.contentWrapperMobile]}>
        {/* Header Row: Title & Top-Right CTA */}
        <View style={[styles.headerRow, isMobile && styles.headerRowMobile]}>
          <View style={styles.headerTitleArea}>
            <Text style={styles.sectionTag}>OUR COMMUNITY</Text>
            <Text style={[styles.mainHeading, isMobile && styles.mainHeadingMobile]}>
              Loved by renters.{'\n'}Trusted by vendors.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              isMobile && styles.ctaButtonMobile,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.ctaText}>See All Reviews →</Text>
          </Pressable>
        </View>

        {/* 3 Review Cards Grid / List */}
        <View style={[styles.cardsContainer, isMobile && styles.cardsContainerMobile]}>
          {REVIEWS_DATA.map((card) => (
            <ReviewCard key={card.id} card={card} />
          ))}
        </View>
      </View>
    </View>
  );
};

const fontFamily = Platform.OS === 'web' ? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" : undefined;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 64,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 48,
  },
  contentWrapperMobile: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  headerRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 32,
  },
  headerTitleArea: {
    flex: 1,
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
    color: '#090A09',
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
  ctaButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  ctaButtonMobile: {
    marginBottom: 0,
  },
  ctaText: {
    color: '#090A09',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
    fontFamily,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'stretch',
  },
  cardsContainerMobile: {
    flexDirection: 'column',
    gap: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});

