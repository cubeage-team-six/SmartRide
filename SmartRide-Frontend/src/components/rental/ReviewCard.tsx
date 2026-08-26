import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform, Image } from 'react-native';
import { ReviewCardData } from './types';

interface ReviewCardProps {
  card: ReviewCardData;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ card }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [imageError, setImageError] = useState(false);

  // Render 5 lime stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < card.rating; i++) {
      stars.push(
        <Text key={i} style={styles.starText}>
          ★
        </Text>
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  // User initials for fallback avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <View style={[styles.cardContainer, isMobile && styles.cardContainerMobile]}>
      {/* Stars Header */}
      {renderStars()}

      {/* Quote Body */}
      <Text style={[styles.quoteText, isMobile && styles.quoteTextMobile]}>
        &quot;{card.quote}&quot;
      </Text>

      {/* User Info Footer */}
      <View style={styles.userFooter}>
        {card.avatarUrl && !imageError ? (
          <Image
            source={{ uri: card.avatarUrl }}
            style={styles.avatarImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarInitial}>{getInitials(card.userName)}</Text>
          </View>
        )}

        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{card.userName}</Text>
          <Text style={styles.userRole}>{card.userRole}</Text>
        </View>
      </View>
    </View>
  );
};

const fontFamily = Platform.OS === 'web' ? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" : undefined;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'space-between',
    minHeight: 280,
  },
  cardContainerMobile: {
    width: '100%',
    minHeight: undefined,
    padding: 24,
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 20,
  },
  starText: {
    color: '#B7F000',
    fontSize: 18,
    fontWeight: '900',
  },
  quoteText: {
    color: '#1F2421',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 23,
    marginBottom: 28,
    flex: 1,
    fontFamily,
  },
  quoteTextMobile: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  userFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '700',
    fontFamily,
  },
  userInfoText: {
    justifyContent: 'center',
  },
  userName: {
    color: '#090A09',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
    letterSpacing: -0.2,
    fontFamily,
  },
  userRole: {
    color: '#808580',
    fontSize: 13,
    fontWeight: '500',
    fontFamily,
  },
});

