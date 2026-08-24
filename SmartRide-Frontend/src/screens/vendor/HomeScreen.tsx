import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors} from '../theme';
import {filterLabels, processSteps, vehicleCards, vendorStats} from '../data';
import {ArrowRight, FilterChip, VehicleCard} from '../components';

const PAGE_PADDING = 16;
const SECTION_VERTICAL = 80;
const GRID_GAP = 16;
const STEP_GAP = 24;

function HomeScreen() {
  const {width} = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState(filterLabels[0]);

  const cardColumns = width >= 1024 ? 4 : width >= 768 ? 2 : 1;
  const cardWidth =
    (width - PAGE_PADDING * 2 - GRID_GAP * (cardColumns - 1)) / cardColumns;

  const stepColumns = width >= 900 ? 4 : width >= 600 ? 2 : 1;
  const stepWidth =
    (width - PAGE_PADDING * 2 - STEP_GAP * (stepColumns - 1)) / stepColumns;

  const isVendorRow = width >= 1024;
  const vendorBoxPadding = width >= 640 ? 64 : 40;
  const vendorBoxWidth = width - PAGE_PADDING * 2;
  const vendorBoxInner = vendorBoxWidth - vendorBoxPadding * 2;
  const statWidth = isVendorRow
    ? (vendorBoxInner - vendorBoxInner * 0.48 - 48 - GRID_GAP) / 2
    : (vendorBoxInner - GRID_GAP) / 2;

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.lineupSection}>
        <View
          style={[
            styles.header,
            width >= 768 ? styles.headerRow : styles.headerColumn,
          ]}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>Our Lineup</Text>
            <Text style={styles.title}>Built for every{'\n'}journey ahead.</Text>
          </View>
          <Pressable style={styles.viewAll} onPress={() => {}}>
            <Text style={styles.viewAllText}>View All Vehicles</Text>
            <ArrowRight size={16} color={colors.brand.text} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
          contentContainerStyle={styles.filtersContent}>
          {filterLabels.map(label => (
            <FilterChip
              key={label}
              label={label}
              active={label === activeFilter}
              onPress={() => setActiveFilter(label)}
            />
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {vehicleCards.map(card => (
            <VehicleCard key={card.id} card={card} width={cardWidth} />
          ))}
        </View>
      </View>

      <View style={styles.processSection}>
        <View style={styles.processHeader}>
          <Text style={styles.eyebrow}>The Process</Text>
          <Text style={styles.title}>Renting made simple.</Text>
        </View>

        <View style={styles.steps}>
          {processSteps.map(step => (
            <View key={step.number} style={[styles.step, {width: stepWidth}]}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.vendorBox, {padding: vendorBoxPadding}]}>
          <View
            style={[
              styles.vendorContent,
              isVendorRow ? styles.vendorContentRow : styles.vendorContentColumn,
            ]}>
            <View style={[styles.vendorCopy, isVendorRow && styles.vendorCopyRow]}>
              <Text style={styles.vendorEyebrow}>For Vendors</Text>
              <Text style={styles.vendorTitle}>
                Grow your rental business.
              </Text>
              <Text style={styles.vendorDescription}>
                List your fleet, set pricing, manage availability, and track
                earnings from one dashboard. KYC once — earn forever.
              </Text>
              <Pressable style={styles.vendorButton} onPress={() => {}}>
                <Text style={styles.vendorButtonText}>Become a Vendor</Text>
                <ArrowRight color={colors.brand.dark} size={20} />
              </Pressable>
            </View>
            <View
              style={[
                styles.stats,
                isVendorRow && styles.statsRow,
                {columnGap: GRID_GAP, rowGap: GRID_GAP},
              ]}>
              {vendorStats.map(stat => (
                <View key={stat.label} style={[styles.statTile, {width: statWidth}]}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.brand.gray,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  lineupSection: {
    paddingHorizontal: PAGE_PADDING,
    paddingVertical: SECTION_VERTICAL,
  },
  header: {
    marginBottom: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerColumn: {
    flexDirection: 'column',
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: colors.brand.green,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    color: colors.brand.dark,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 42,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  viewAllText: {
    color: colors.brand.text,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  filters: {
    marginBottom: 40,
    flexGrow: 0,
  },
  filtersContent: {
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: GRID_GAP,
    rowGap: 24,
  },
  processSection: {
    backgroundColor: colors.white,
    paddingHorizontal: PAGE_PADDING,
    paddingVertical: SECTION_VERTICAL,
  },
  processHeader: {
    alignItems: 'center',
    marginBottom: 64,
  },
  steps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: STEP_GAP,
    rowGap: 40,
    marginBottom: 96,
  },
  step: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brand.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
  },
  stepNumberText: {
    color: colors.brand.dark,
    fontSize: 16,
    fontWeight: '700',
  },
  stepTitle: {
    color: colors.brand.dark,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    color: colors.brand.muted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 280,
  },
  vendorBox: {
    backgroundColor: colors.brand.dark,
    borderRadius: 40,
    elevation: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 10},
  },
  vendorContent: {
    width: '100%',
    alignItems: 'center',
  },
  vendorContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 48,
  },
  vendorContentColumn: {
    flexDirection: 'column',
  },
  vendorCopy: {
    maxWidth: 512,
    marginBottom: 40,
  },
  vendorCopyRow: {
    width: '48%',
  },
  vendorEyebrow: {
    color: colors.brand.green,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  vendorTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 24,
  },
  vendorDescription: {
    color: colors.gray.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
  },
  vendorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.brand.green,
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },
  vendorButtonText: {
    color: colors.brand.dark,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statsRow: {
    flex: 1,
  },
  statTile: {
    height: 128,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  statValue: {
    color: colors.brand.green,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: colors.gray.muted,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HomeScreen;