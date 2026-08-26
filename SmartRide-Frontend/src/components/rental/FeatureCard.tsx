import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
  Image,
} from 'react-native';

export const FeatureCards: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // EV charging high quality image
  const evImageUrl =
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80';

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.wrapper, isMobile && styles.wrapperMobile]}>
        {/* Left Feature Card - Image with Text Overlay */}
        <View style={[styles.leftCard, isMobile && styles.cardMobile]}>
          <Image
            source={{ uri: evImageUrl }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
          {/* Dark Overlay */}
          <View style={styles.darkOverlay} />

          {/* Text Container at bottom */}
          <View style={styles.leftCardContent}>
            <Text style={[styles.overlayText, isMobile && styles.overlayTextMobile]}>
              Future-ready with EV support, GPS, and{'\n'}digital document management.
            </Text>
          </View>
        </View>

        {/* Right Feature Card - Lime Green Background */}
        <Pressable
          style={({ pressed }) => [
            styles.rightCard,
            isMobile && styles.cardMobile,
            pressed && styles.pressed,
          ]}>
          <View style={styles.rightCardTop}>
            <Text style={[styles.limeNumber, isMobile && styles.limeNumberMobile]}>
              10+
            </Text>
            <Text style={styles.limeTitle}>Vehicle Categories</Text>
            <Text style={styles.limeSubtitle}>
              Cars to cranes — all on one platform.
            </Text>
          </View>

          <View style={styles.rightCardBottom}>
            <Text style={styles.ctaText}>View all types →</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const fontFamily = Platform.OS === 'web' ? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" : undefined;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#0B0F0D',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 64,
  },
  wrapper: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 48,
    flexDirection: 'row',
    gap: 24,
    minHeight: 310,
  },
  wrapperMobile: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    gap: 16,
    minHeight: undefined,
  },
  leftCard: {
    flex: 1.6,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 300,
    justifyContent: 'flex-end',
    backgroundColor: '#181E1B',
  },
  cardMobile: {
    width: '100%',
    minHeight: 250,
  },
  imageBackground: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 15, 13, 0.45)',
  },
  leftCardContent: {
    padding: 28,
    zIndex: 2,
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.3,
    fontFamily,
  },
  overlayTextMobile: {
    fontSize: 18,
    lineHeight: 25,
  },
  rightCard: {
    flex: 1,
    backgroundColor: '#B7F000',
    borderRadius: 20,
    padding: 32,
    justifyContent: 'space-between',
    minHeight: 300,
  },
  rightCardTop: {
    flex: 1,
  },
  limeNumber: {
    color: '#090A09',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 52,
    marginBottom: 16,
    fontFamily,
  },
  limeNumberMobile: {
    fontSize: 40,
    lineHeight: 44,
    marginBottom: 12,
  },
  limeTitle: {
    color: '#090A09',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.3,
    fontFamily,
  },
  limeSubtitle: {
    color: '#283203',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
    fontFamily,
  },
  rightCardBottom: {
    paddingTop: 24,
  },
  ctaText: {
    color: '#090A09',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
    fontFamily,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
});

