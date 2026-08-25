import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const BRAND = '#B4E83F';
const SIDEBAR = '#111111';
const BG_MAIN = '#F7F9F6';
const CARD_BG = '#FFFFFF';
const TEXT_MAIN = '#1A1A1A';
const TEXT_MUTED = '#737373';
const BORDER_COL = '#E5E5E5';
const PROCESSING_BG = '#FEF3C7';
const PROCESSING_TEXT = '#D97706';
const PAID_BG = '#D1FAE5';
const PAID_TEXT = '#059669';
const GRAY_300 = '#D1D5DB';
const GRAY_200 = '#E5E7EB';
const GRAY_100 = '#F3F4F6';
const GRAY_400 = '#9CA3AF';
const RED_500 = '#EF4444';
const TIER_BORDER = '#E6F4CC';
const ORANGE_50 = '#FFF7ED';
const ORANGE_400 = '#FB923C';
const GREEN_50 = '#F0FDF4';
const GREEN_500 = '#22C55E';
const GREEN_100 = '#DCFCE7';

type Metric = {
  id: string;
  value: string;
  label: string;
  note: string;
  dark?: boolean;
};

const METRICS: Metric[] = [
  {
    id: 'gross',
    value: '₹3.05L',
    label: 'Gross Revenue (YTD)',
    note: '2025 Jan–Aug',
    dark: true,
  },
  {
    id: 'net',
    value: '₹2.96L',
    label: 'Net Earnings (YTD)',
    note: 'After 3% commission',
  },
  {
    id: 'avg',
    value: '₹36,945',
    label: 'Avg / Month',
    note: '8 months avg',
  },
  {
    id: 'trips',
    value: '229',
    label: 'Total Trips',
    note: 'All vehicles',
  },
];

const MONTHLY_REVENUE = [
  {month: 'Jan', gross: 30, net: 28},
  {month: 'Feb', gross: 35, net: 33},
  {month: 'Mar', gross: 40, net: 38},
  {month: 'Apr', gross: 50, net: 48},
  {month: 'May', gross: 45, net: 43},
  {month: 'Jun', gross: 80, net: 77},
  {month: 'Jul', gross: 75, net: 72},
  {month: 'Aug', gross: 32, net: 30},
];

const VEHICLE_EARNINGS = [
  {name: 'Innova Crysta 2023', amount: '₹104,857', trips: 47, share: 35.5},
  {name: 'Swift Dzire Tour', amount: '₹88,182', trips: 91, share: 29.8},
  {name: 'Honda City 4th Gen', amount: '₹61,886', trips: 58, share: 20.9},
  {name: 'Mahindra Thar LX', amount: '₹62,420', trips: 33, share: 21.1},
];

type Payout = {
  id: string;
  period: string;
  meta: string;
  status: 'Processing' | 'Paid';
  amount: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  iconBordered: boolean;
};

const PAYOUTS: Payout[] = [
  {
    id: 'PAY-0041',
    period: 'Aug 1–10, 2025',
    meta: 'PAY-0041 · HDFC Bank ••4821 · Aug 12, 2025',
    status: 'Processing',
    amount: '₹28,518',
    icon: 'clock',
    iconColor: ORANGE_400,
    iconBg: ORANGE_50,
    iconBordered: false,
  },
  {
    id: 'PAY-0040',
    period: 'Jul 2025',
    meta: 'PAY-0040 · HDFC Bank ••4821 · Aug 1, 2025',
    status: 'Paid',
    amount: '₹47,433',
    icon: 'check',
    iconColor: GREEN_500,
    iconBg: GREEN_50,
    iconBordered: true,
  },
  {
    id: 'PAY-0039',
    period: 'Jun 2025',
    meta: 'PAY-0039 · HDFC Bank ••4821 · Jul 1, 2025',
    status: 'Paid',
    amount: '₹50,731',
    icon: 'check',
    iconColor: GREEN_500,
    iconBg: GREEN_50,
    iconBordered: true,
  },
  {
    id: 'PAY-0038',
    period: 'May 2025',
    meta: 'PAY-0038 · HDFC Bank ••4821 · Jun 1, 2025',
    status: 'Paid',
    amount: '₹41,268',
    icon: 'check',
    iconColor: GREEN_500,
    iconBg: GREEN_50,
    iconBordered: true,
  },
];

const STATUS_STYLES: Record<string, {bg: string; color: string}> = {
  Processing: {bg: PROCESSING_BG, color: PROCESSING_TEXT},
  Paid: {bg: PAID_BG, color: PAID_TEXT},
};

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function EarningsScreen() {
  const {width: winW} = useWindowDimensions();
  const [contentW, setContentW] = React.useState(0);
  const cw = contentW || winW;

  const isWide = cw >= 1024;
  const isTablet = cw >= 680 && !isWide;
  const isNarrow = !isWide && !isTablet;

  const pad = isNarrow ? 16 : 40;
  const cardPad = isNarrow ? 16 : 28;
  const sectionGap = isNarrow ? 14 : 24;
  const innerGap = isNarrow ? 10 : 16;
  const chartH = isNarrow ? 128 : 184;
  const barW = isNarrow ? 11 : 18;

  const metricCols = isWide ? 4 : isTablet ? 2 : 1;
  const metricRows = chunk(METRICS, metricCols);

  return (
    <View
      style={styles.root}
      onLayout={e => setContentW(e.nativeEvent.layout.width)}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: pad,
            paddingTop: pad,
            paddingBottom: pad * 2 + 24,
            gap: sectionGap,
          },
        ]}>
        <View>
          <Text style={[styles.pageTitle, isNarrow && styles.pageTitleSmall]}>
            Earnings
          </Text>
          <Text style={styles.pageSubtitle}>Jan – Aug 2025</Text>
        </View>

        <View style={{gap: innerGap}}>
          {metricRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.metricRow}>
              {row.map(metric => (
                <MetricTile
                  key={metric.id}
                  metric={metric}
                  compact={isNarrow}
                />
              ))}
            </View>
          ))}
        </View>

        <Card padding={cardPad}>
          <View style={styles.chartHeader}>
            <Text style={styles.cardTitle}>Monthly Revenue</Text>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendSwatch, {backgroundColor: BRAND}]} />
                <Text style={styles.legendText}>Gross</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendSwatch, {backgroundColor: SIDEBAR}]}
                />
                <Text style={styles.legendText}>Net</Text>
              </View>
            </View>
          </View>

          <View style={[styles.chartArea, {height: chartH}]}>
            {MONTHLY_REVENUE.map(item => (
              <View key={item.month} style={styles.chartGroup}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: barW,
                      height: Math.max((item.gross / 100) * chartH, 2),
                      backgroundColor: BRAND,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.bar,
                    {
                      width: barW,
                      height: Math.max((item.net / 100) * chartH, 2),
                      backgroundColor: SIDEBAR,
                    },
                  ]}
                />
              </View>
            ))}
          </View>

          <View style={styles.chartLabels}>
            {MONTHLY_REVENUE.map(item => (
              <Text key={item.month} style={styles.chartLabel}>
                {item.month}
              </Text>
            ))}
          </View>
        </Card>

        <View style={isWide ? styles.splitRowWide : styles.splitRowStacked}>
          <Card
            padding={cardPad}
            style={isWide ? styles.flex3 : undefined}>
            <Text style={styles.cardTitle}>By Vehicle</Text>
            <View style={[styles.list, {gap: innerGap, marginTop: innerGap}]}>
              {VEHICLE_EARNINGS.map(vehicle => (
                <View key={vehicle.name}>
                  <View style={styles.vehicleRowTop}>
                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                    <Text style={styles.vehicleAmount}>{vehicle.amount}</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[styles.progressFill, {width: `${vehicle.share}%`}]}
                    />
                  </View>
                  <Text style={styles.vehicleMeta}>
                    {vehicle.trips} trips · {vehicle.share}% of earnings
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          <View
            style={
              isWide ? [styles.sideColWide, {gap: innerGap + 8}] : {gap: innerGap}
            }>
            <Card padding={cardPad} style={isWide ? styles.flex2 : undefined}>
              <Text style={styles.cardTitle}>Commission Breakdown</Text>
              <View
                style={[styles.list, {gap: innerGap, marginTop: innerGap}]}>
                <View style={styles.commissionRow}>
                  <Text style={styles.commissionLabel}>Gross Collected</Text>
                  <Text style={styles.commissionValue}>₹304,700</Text>
                </View>
                <View style={styles.commissionRow}>
                  <Text style={styles.commissionLabel}>
                    RideAny Commission (3%)
                  </Text>
                  <Text style={[styles.commissionValue, styles.commissionFee]}>
                    -₹9,141
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.commissionRow}>
                  <Text style={styles.commissionNetLabel}>
                    Your Net Earnings
                  </Text>
                  <Text style={[styles.commissionValue, styles.commissionNet]}>
                    ₹295,559
                  </Text>
                </View>
              </View>
            </Card>

            <TierCard />
          </View>
        </View>

        <View>
          <View style={[styles.payoutHeader, {marginBottom: innerGap}]}>
            <Text style={styles.cardTitle}>Payout History</Text>
            <Pressable style={styles.bankButton}>
              <Text style={styles.bankButtonText}>Update Bank Details</Text>
            </Pressable>
          </View>
          <View style={styles.payoutCard}>
            {PAYOUTS.map((payout, index) => (
              <PayoutItem
                key={payout.id}
                payout={payout}
                isLast={index === PAYOUTS.length - 1}
                stacked={!isWide}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <Pressable style={[styles.helpButton, isNarrow && styles.helpButtonSmall]}>
        <FontAwesome6 solid name="question" size={20} color={CARD_BG} />
      </Pressable>
    </View>
  );
}

function Card({
  children,
  padding,
  style,
}: {
  children: React.ReactNode;
  padding: number;
  style?: object;
}) {
  return (
    <View style={[styles.card, {padding}, style]}>{children}</View>
  );
}

function TierCard() {
  return (
    <View style={styles.tierCard}>
      <Text style={styles.tierTitle}>Tier: Standard</Text>
      <Text style={styles.tierDescription}>
        Earn 50+ trips/month to unlock{' '}
        <Text style={styles.tierHighlight}>
          Premium Tier (2.5% commission)
        </Text>
      </Text>
      <View style={[styles.progressTrack, styles.tierProgressTrack]}>
        <View style={[styles.progressFill, styles.tierProgressFill]} />
      </View>
      <Text style={styles.tierFootnote}>23 more trips to Premium</Text>
    </View>
  );
}

function MetricTile({metric, compact}: {metric: Metric; compact?: boolean}) {
  return (
    <View
      style={[
        styles.metricTile,
        metric.dark ? styles.metricTileDark : styles.metricTileLight,
        compact && styles.metricTileCompact,
      ]}>
      <Text style={[styles.metricValue, metric.dark && styles.metricValueDark, compact && styles.metricValueCompact]}>
        {metric.value}
      </Text>
      <Text style={[styles.metricLabel, metric.dark && styles.metricLabelDark]}>
        {metric.label}
      </Text>
      <Text style={[styles.metricNote, metric.dark && styles.metricNoteDark]}>
        {metric.note}
      </Text>
    </View>
  );
}

function PayoutItem({
  payout,
  isLast,
  stacked,
}: {
  payout: Payout;
  isLast: boolean;
  stacked: boolean;
}) {
  const status = STATUS_STYLES[payout.status] ?? STATUS_STYLES.Paid;
  return (
    <View
      style={[
        styles.payoutItem,
        !isLast && styles.payoutItemBordered,
        stacked && styles.payoutItemStacked,
      ]}>
      <View style={styles.payoutLeft}>
        <View
          style={[
            styles.payoutIcon,
            {backgroundColor: payout.iconBg},
            payout.iconBordered && styles.payoutIconBordered,
          ]}>
          <FontAwesome6
            solid
            name={payout.icon}
            size={20}
            color={payout.iconColor}
          />
        </View>
        <View style={styles.payoutInfo}>
          <Text style={styles.payoutPeriod}>{payout.period}</Text>
          <Text style={styles.payoutMeta}>{payout.meta}</Text>
        </View>
      </View>
      <View style={[styles.payoutRight, stacked && styles.payoutRightStacked]}>
        <View style={[styles.statusBadge, {backgroundColor: status.bg}]}>
          <Text style={[styles.statusText, {color: status.color}]}>
            {payout.status}
          </Text>
        </View>
        <Text style={styles.payoutAmount}>{payout.amount}</Text>
        <Pressable style={styles.invoiceButton}>
          <Text style={styles.invoiceButtonText}>Invoice</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG_MAIN,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {},
  pageTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  pageTitleSmall: {
    fontSize: 24,
  },
  pageSubtitle: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricTile: {
    flex: 1,
    borderRadius: 16,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  metricTileCompact: {
    borderRadius: 14,
    padding: 16,
  },
  metricTileDark: {
    backgroundColor: SIDEBAR,
  },
  metricTileLight: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER_COL,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '900',
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  metricValueCompact: {
    fontSize: 22,
  },
  metricValueDark: {
    color: CARD_BG,
  },
  metricLabel: {
    fontSize: 14,
    color: TEXT_MAIN,
    marginBottom: 6,
  },
  metricLabelDark: {
    color: GRAY_300,
  },
  metricNote: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  metricNoteDark: {
    color: BRAND,
    fontWeight: '500',
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER_COL,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_MAIN,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendSwatch: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_MUTED,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  chartGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
  },
  bar: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  chartLabels: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: GRAY_100,
  },
  chartLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_MUTED,
  },
  splitRowWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 20,
  },
  splitRowStacked: {
    flexDirection: 'column',
    gap: 14,
  },
  flex3: {
    flex: 3,
  },
  flex2: {
    flex: 2,
  },
  sideColWide: {
    flex: 2,
    justifyContent: 'space-between',
  },
  list: {},
  vehicleRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_MAIN,
    flexShrink: 1,
    marginRight: 8,
  },
  vehicleAmount: {
    fontSize: 14,
    fontWeight: '900',
    color: TEXT_MAIN,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: GRAY_100,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: BRAND,
  },
  vehicleMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_MUTED,
  },
  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commissionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
    flexShrink: 1,
    marginRight: 8,
  },
  commissionValue: {
    fontSize: 14,
    fontWeight: '900',
    color: TEXT_MAIN,
  },
  commissionFee: {
    fontWeight: '700',
    color: RED_500,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: GRAY_100,
  },
  commissionNetLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_MAIN,
  },
  commissionNet: {
    color: '#10B981',
  },
  tierCard: {
    backgroundColor: CARD_BG,
    borderWidth: 2,
    borderColor: TIER_BORDER,
    borderRadius: 20,
    padding: 20,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: TEXT_MUTED,
    marginBottom: 14,
  },
  tierHighlight: {
    color: TEXT_MAIN,
    fontWeight: '700',
  },
  tierProgressTrack: {
    marginBottom: 8,
  },
  tierProgressFill: {
    width: '54%',
  },
  tierFootnote: {
    fontSize: 12,
    fontWeight: '500',
    color: GRAY_400,
  },
  payoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  bankButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  bankButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MAIN,
  },
  payoutCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER_COL,
    overflow: 'hidden',
  },
  payoutItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  payoutItemStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 16,
    rowGap: 10,
  },
  payoutItemBordered: {
    borderBottomWidth: 1,
    borderBottomColor: GRAY_100,
  },
  payoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
  },
  payoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payoutIconBordered: {
    borderWidth: 1,
    borderColor: GREEN_100,
  },
  payoutInfo: {
    flexShrink: 1,
  },
  payoutPeriod: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  payoutMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: GRAY_400,
  },
  payoutRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  payoutRightStacked: {
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  payoutAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: TEXT_MAIN,
  },
  invoiceButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 999,
  },
  invoiceButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_MUTED,
  },
  helpButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: SIDEBAR,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
  },
  helpButtonSmall: {
    bottom: 20,
    right: 20,
  },
});

export default EarningsScreen;
