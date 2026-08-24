import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';
import {VehicleCard as VehicleCardType} from '../types';
import ArrowRight from './ArrowRight';

type Props = {
  card: VehicleCardType;
  width: number;
};

function VehicleCard({card, width}: Props) {
  return (
    <View
      style={[
        styles.card,
        {width},
        card.highlighted && styles.cardHighlighted,
      ]}>
      <View
        style={[styles.badge, {backgroundColor: card.badge.backgroundColor}]}>
        <Text style={[styles.badgeText, {color: card.badge.textColor}]}>
          {card.badge.label.toUpperCase()}
        </Text>
      </View>
      <View style={[styles.imageContainer, {backgroundColor: card.imageBackground}]}>
        <Image source={{uri: card.image}} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{card.title}</Text>
        <View style={styles.features}>
          {card.features.map(feature => (
            <View key={feature} style={styles.featureRow}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.bookingLabel}>Instant booking</Text>
          <Pressable style={styles.arrowButton}>
            <ArrowRight color={colors.brand.dark} size={16} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  cardHighlighted: {
    borderWidth: 1,
    borderColor: colors.brand.green,
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: '100%',
    height: 192,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.brand.text,
    marginBottom: 16,
  },
  features: {
    flex: 1,
    gap: 8,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand.green,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.brand.muted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.brand.gray,
  },
  bookingLabel: {
    fontSize: 12,
    color: colors.brand.muted,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brand.green,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});

export default VehicleCard;