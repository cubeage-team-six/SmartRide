import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {VENDOR} from '../vendorTheme';

const DARK = VENDOR.dark;
const GREEN = VENDOR.green;
const GRAY_900 = VENDOR.gray900;
const GRAY_700 = VENDOR.gray700;
const GRAY_600 = VENDOR.gray600;
const GRAY_500 = VENDOR.gray500;
const GRAY_400 = VENDOR.gray400;
const GRAY_200 = VENDOR.gray200;
const GRAY_100 = VENDOR.gray100;

const STATS = [
  {
    key: 'vehicles',
    icon: 'car',
    badge: '2 on rent',
    badgeStyle: 'muted',
    value: '4',
    label: 'Total Vehicles',
  },
  {
    key: 'month',
    badge: '+14% vs last',
    badgeStyle: 'dark',
    value: '₹29,400',
    label: 'This Month',
    highlighted: true,
  },
  {
    key: 'pending',
    icon: 'clock',
    badge: 'Needs action',
    badgeStyle: 'gray',
    value: '2',
    label: 'Pending Requests',
  },
  {
    key: 'rating',
    icon: 'star',
    badge: '229 reviews',
    badgeStyle: 'muted',
    value: '4.8',
    label: 'Avg. Rating',
  },
];

const CHART_BARS = [
  {label: 'Mar', value: '₹34k', pct: 40},
  {label: 'Apr', value: '₹42k', pct: 60},
  {label: 'May', value: '₹39k', pct: 50},
  {label: 'Jun', value: '₹52k', pct: 80},
  {label: 'Jul', value: '₹49k', pct: 75},
  {label: 'Aug', value: '₹29k', pct: 45, active: true},
];

const UTILIZATION = [
  {label: 'On Rent', value: '1/4', pct: 25, color: '#3B82F6'},
  {label: 'Available', value: '2/4', pct: 50, color: GREEN},
  {label: 'Maintenance', value: '1/4', pct: 25, color: '#FBBF24'},
];

const REQUESTS = [
  {
    name: 'Rohan Kapoor',
    vehicle: 'Innova Crysta · Aug 15–18',
    meta: 'BK-0887 · Requested 2 hours ago',
    amount: '₹6,900',
  },
  {
    name: 'Sneha Joshi',
    vehicle: 'Swift Dzire · Aug 16–17',
    meta: 'BK-0889 · Requested 45 min ago',
    amount: '₹999',
  },
];

const FLEET = [
  {
    name: 'Innova Crysta 2023',
    plate: 'KA-01-AB-1234',
    status: 'On Rent',
    price: '₹2,300',
    rating: '4.8',
    trips: '47 trips',
    statusBg: '#EFF6FF',
    statusColor: '#2563EB',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwqBeWJdgeMDfJtPIuIlN8njw6UFQVU1ZxNGj3XhGNqqUBG5qlAkUV0O98ZobTrlQp2a1M85W_inKYZTj7MmHRCyla6M6VcwMG5qWBs6EnqyOKZ1FFXCi7XZ7iUlbuiTtb-FjX2Iprnra3AehBuMQqtcWOa_IwHEsvQfaL-LHmkqWGsC6grOVPFcxHBm3RVYjxdsv9k9Pra5ilzKW-hAltWxvnr4O9FG-z9mmXAo4gfg29o8KlW8_P',
  },
  {
    name: 'Swift Dzire Tour',
    plate: 'KA-01-CD-5678',
    status: 'Available',
    price: '₹999',
    rating: '4.7',
    trips: '91 trips',
    statusBg: '#ECFDF5',
    statusColor: '#059669',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT7R0aLQgNkIIMIiCxJXlJYvP1rNe6lrq_fSMfQK7HzxINDP8I5ZIKtaKPdwuAXeAEh8V9Mcf_G8YteydZSsl7hxxnmCSmx7W3YZwyBBkuzehyBhXqCqfoA4bvMGtfU-sEhrSSoV7UWama96HfQ9bWxwuH61oNu_3239r4-Xwa_PZyaDYk5zQI2ImYVFNl1mBx5zzCMBNKwiGW6JmbyxJJ48ZaCGZ_vubwoQ43HCW2I3jj-vcTGFzB',
  },
  {
    name: 'Honda City 4th Gen',
    plate: 'KA-01-EF-9012',
    status: 'Maintenance',
    price: '₹1,100',
    rating: '4.6',
    trips: '58 trips',
    statusBg: '#FEFCE8',
    statusColor: '#CA8A04',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcuIwW-lmgUrEY7HfbQudR0G8fJ4ErjLCzLiYgi-kHXk3ifPmpalEae4TeUNpPuwIrxfULuM3sPBWmjmNE1xmH6jgrciQTnn5NZAApPa3zrKIe6FEsJsSDRd3uSkYgpWD-MufPlaIMcoAQngRK08L8JP5ugFgBD00RsNoUdkMwr-BCM1HMRhGQfGqjw8ZjTkgg6ScJW-jzlp5wHdS9-2018zUcyJZxnf05IlObni_ix_0-lu58OxXL',
  },
  {
    name: 'Mahindra Thar LX',
    plate: 'KA-01-GH-3456',
    status: 'Available',
    price: '₹1,950',
    rating: '4.9',
    trips: '33 trips',
    statusBg: '#ECFDF5',
    statusColor: '#059669',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4EA3T1MHJ7tePEW0lkxARZQYabTTOGjNQpV4X59nvuoL8XGfL0Gpkf5q41YFGlNklkv4j2W5kQCOPj3pFlVdEMrm3oqFG_Zmv3OyKtNvm9x4NtsgG5ca5paHocV6Y1iM6DMLUEGbQrmHjHvo76ccMhGGNT8n2z_uIh-hidpP8xlsDuuD_NF9yc89lhJ8YrPqrWi-uiXDLyNL1IHR7elouMKeIhQGqAI8Q13aiJNJ5kOEqSNnABkB',
  },
];

function VendorDashboard() {
  const {width} = useWindowDimensions();
  const isDesktop = width >= 1024;
  const statColumns = isDesktop ? 4 : width >= 768 ? 2 : 1;
  const statWidth = isDesktop
    ? (width - 32 - 24 * (statColumns - 1)) / statColumns
    : (width - 64 - 24 * (statColumns - 1)) / statColumns;
  const fleetColumns = isDesktop ? 4 : width >= 768 ? 2 : 1;
  const fleetWidth = isDesktop
    ? (width - 32 - 16 * (fleetColumns - 1)) / fleetColumns
    : (width - 64 - 16 * (fleetColumns - 1)) / fleetColumns;

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.pageTitle}>Vendor Dashboard</Text>
              <View style={styles.subtitleRow}>
                <Text style={styles.subtitle}>GoWheels Rentals · KYC Verified</Text>
                <FontAwesome6
                  solid
                  name="check"
                  size={12}
                  color={GREEN}
                  style={styles.check}
                />
              </View>
            </View>
            <Pressable style={styles.addButton}>
              <FontAwesome6
                solid
                name="plus"
                size={14}
                color={DARK}
                style={styles.addButtonIcon}
              />
              <Text style={styles.addButtonText}>Add Vehicle</Text>
            </Pressable>
          </View>

          <View style={styles.statGrid}>
            {STATS.map(stat => (
              <StatCard key={stat.key} stat={stat} width={statWidth} />
            ))}
          </View>

          <View
            style={[
              styles.chartRow,
              isDesktop ? styles.chartRowWide : styles.chartRowStacked,
            ]}>
            <View style={[styles.panel, isDesktop && styles.earningsPanel]}>
              <View style={styles.earningsHeader}>
                <View>
                  <Text style={styles.panelTitle}>Monthly Earnings</Text>
                  <Text style={styles.panelSubtitle}>Mar – Aug 2025</Text>
                </View>
                <View style={styles.earningsTotal}>
                  <Text style={styles.earningsAmount}>₹2,45,100</Text>
                  <Text style={styles.earningsGrowth}>+18% YTD</Text>
                </View>
              </View>
              <View style={styles.chart}>
                {CHART_BARS.map(bar => (
                  <View key={bar.label} style={styles.barColumn}>
                    <Text
                      style={[
                        styles.barValue,
                        bar.active && styles.barValueActive,
                      ]}>
                      {bar.value}
                    </Text>
                    <View
                      style={[
                        styles.bar,
                        bar.active ? styles.barActive : styles.barDefault,
                        {height: `${bar.pct}%`},
                      ]}
                    />
                    <Text style={[styles.barLabel, bar.active && styles.barLabelActive]}>
                      {bar.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.panel, isDesktop && styles.utilPanel]}>
              <Text style={styles.panelTitle}>Fleet Utilization</Text>
              <View style={styles.utilList}>
                {UTILIZATION.map(item => (
                  <View key={item.label} style={styles.utilItem}>
                    <View style={styles.utilRow}>
                      <Text style={styles.utilLabel}>{item.label}</Text>
                      <Text style={styles.utilValue}>{item.value}</Text>
                    </View>
                    <View style={styles.track}>
                      <View
                        style={[
                          styles.trackFill,
                          {width: `${item.pct}%`, backgroundColor: item.color},
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.utilFooter}>
                <Text style={styles.utilFooterLabel}>Overall utilization</Text>
                <Text style={styles.utilFooterValue}>75%</Text>
              </View>
            </View>
          </View>

          <View style={styles.requestsSection}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Pending Approval</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>2</Text>
              </View>
            </View>
            {REQUESTS.map(request => (
              <View key={request.name} style={styles.requestCard}>
                <View style={styles.requestInfo}>
                  <Text style={styles.requestName}>{request.name}</Text>
                  <Text style={styles.requestVehicle}>{request.vehicle}</Text>
                  <Text style={styles.requestMeta}>{request.meta}</Text>
                </View>
                <View style={styles.requestActions}>
                  <Text style={styles.requestAmount}>{request.amount}</Text>
                  <View style={styles.requestButtons}>
                    <Pressable style={styles.acceptButton}>
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </Pressable>
                    <Pressable style={styles.declineButton}>
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.fleetSection}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>My Fleet</Text>
              <Pressable>
                <Text style={styles.manageLink}>Manage all →</Text>
              </Pressable>
            </View>
            <View style={styles.fleetGrid}>
              {FLEET.map(vehicle => (
                <FleetCard key={vehicle.plate} vehicle={vehicle} width={fleetWidth} />
              ))}
            </View>
          </View>
        </ScrollView>
  );
}

function StatCard({stat, width}: {stat: (typeof STATS)[number]; width: number}) {
  return (
    <View
      style={[
        styles.statCard,
        stat.highlighted ? styles.statCardDark : styles.statCardLight,
        {width},
      ]}>
      {stat.highlighted ? (
        <View style={styles.statBadgeRow}>
          <View style={styles.statBadgeDark}>
            <Text style={styles.statBadgeDarkText}>{stat.badge}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.statBadgeRow}>
          {stat.icon && (
            <FontAwesome6 solid name={stat.icon} size={16} color={GRAY_600} />
          )}
          <View style={styles.statBadgeMuted}>
            <Text style={styles.statBadgeMutedText}>{stat.badge}</Text>
          </View>
        </View>
      )}
      <View>
        <Text
          style={[
            styles.statValue,
            stat.highlighted && styles.statValueDark,
          ]}>
          {stat.value}
        </Text>
        <Text
          style={[
            styles.statLabel,
            stat.highlighted && styles.statLabelDark,
          ]}>
          {stat.label}
        </Text>
      </View>
    </View>
  );
}

function FleetCard({
  vehicle,
  width,
}: {
  vehicle: (typeof FLEET)[number];
  width: number;
}) {
  return (
    <View style={[styles.fleetCard, {width}]}>
      <View style={styles.fleetImageWrap}>
        <Image source={{uri: vehicle.image}} style={styles.fleetImage} />
      </View>
      <View style={styles.fleetInfo}>
        <View style={styles.fleetTop}>
          <View style={styles.fleetNameWrap}>
            <Text style={styles.fleetName}>{vehicle.name}</Text>
            <Text style={styles.fleetPlate}>{vehicle.plate}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: vehicle.statusBg},
            ]}>
            <Text style={[styles.statusText, {color: vehicle.statusColor}]}>
              {vehicle.status}
            </Text>
          </View>
        </View>
        <View style={styles.fleetBottom}>
          <View>
            <Text style={styles.fleetPrice}>
              {vehicle.price}
              <Text style={styles.fleetPricePer}>/day</Text>
            </Text>
            <View style={styles.fleetRatingRow}>
              <FontAwesome6
                solid
                name="star"
                size={10}
                color={GRAY_400}
                style={styles.fleetRatingStar}
              />
              <Text style={styles.fleetRating}>
                {' '}{vehicle.rating} · {vehicle.trips}
              </Text>
            </View>
          </View>
          <View style={styles.fleetButtons}>
            <Pressable style={styles.fleetButton}>
              <Text style={styles.fleetButtonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.fleetButton}>
              <Text style={styles.fleetButtonText}>Availability</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 32,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 12,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: GRAY_900,
    letterSpacing: -0.5,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: GRAY_500,
  },
  check: {
    marginLeft: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 32,
  },
  statCard: {
    minHeight: 150,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  statCardLight: {
    backgroundColor: VENDOR.white,
    borderWidth: 1,
    borderColor: GRAY_100,
  },
  statCardDark: {
    backgroundColor: DARK,
  },
  statBadgeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBadgeMuted: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statBadgeMutedText: {
    fontSize: 12,
    color: GRAY_400,
  },
  statBadgeDark: {
    alignSelf: 'flex-end',
    backgroundColor: '#14532D',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statBadgeDarkText: {
    fontSize: 12,
    fontWeight: '600',
    color: GREEN,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '700',
    color: GRAY_900,
  },
  statValueDark: {
    color: VENDOR.white,
  },
  statLabel: {
    fontSize: 14,
    color: GRAY_500,
    marginTop: 4,
  },
  statLabelDark: {
    color: GRAY_400,
  },
  chartRow: {
    marginBottom: 32,
  },
  chartRowWide: {
    flexDirection: 'row',
    gap: 24,
  },
  chartRowStacked: {
    flexDirection: 'column',
    gap: 24,
  },
  panel: {
    backgroundColor: VENDOR.white,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: GRAY_100,
  },
  earningsPanel: {
    flex: 2,
  },
  utilPanel: {
    flex: 1,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GRAY_900,
  },
  panelSubtitle: {
    fontSize: 12,
    color: GRAY_500,
    marginTop: 2,
  },
  earningsTotal: {
    alignItems: 'flex-end',
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY_900,
  },
  earningsGrowth: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22C55E',
  },
  chart: {
    height: 192,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barValue: {
    fontSize: 10,
    color: GRAY_400,
    marginBottom: 4,
    opacity: 0,
  },
  barValueActive: {
    opacity: 1,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  barDefault: {
    backgroundColor: GRAY_200,
  },
  barActive: {
    backgroundColor: GREEN,
  },
  barLabel: {
    fontSize: 12,
    color: GRAY_500,
    marginTop: 8,
  },
  barLabelActive: {
    color: GRAY_900,
    fontWeight: '500',
  },
  utilList: {
    marginTop: 24,
  },
  utilItem: {
    marginBottom: 20,
  },
  utilRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  utilLabel: {
    fontSize: 12,
    color: GRAY_600,
  },
  utilValue: {
    fontSize: 12,
    fontWeight: '500',
    color: GRAY_900,
  },
  track: {
    height: 6,
    borderRadius: 999,
    backgroundColor: GRAY_100,
    overflow: 'hidden',
  },
  trackFill: {
    height: 6,
    borderRadius: 999,
  },
  utilFooter: {
    borderTopWidth: 1,
    borderTopColor: GRAY_100,
    marginTop: 24,
    paddingTop: 16,
  },
  utilFooterLabel: {
    fontSize: 12,
    color: GRAY_500,
    marginBottom: 4,
  },
  utilFooterValue: {
    fontSize: 24,
    fontWeight: '700',
    color: GRAY_900,
  },
  requestsSection: {
    marginBottom: 32,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY_900,
  },
  countBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  requestCard: {
    backgroundColor: 'rgba(254, 249, 195, 0.5)',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  requestInfo: {
    flex: 1,
    minWidth: 200,
  },
  requestName: {
    fontSize: 16,
    fontWeight: '700',
    color: GRAY_900,
  },
  requestVehicle: {
    fontSize: 14,
    color: GRAY_600,
    marginTop: 2,
  },
  requestMeta: {
    fontSize: 12,
    color: GRAY_400,
    marginTop: 4,
  },
  requestActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  requestAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY_900,
  },
  requestButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: DARK,
  },
  declineButton: {
    backgroundColor: VENDOR.white,
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: GRAY_700,
  },
  fleetSection: {
    marginBottom: 8,
  },
  manageLink: {
    fontSize: 14,
    color: GRAY_500,
  },
  fleetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  fleetCard: {
    height: 144,
    flexDirection: 'row',
    backgroundColor: VENDOR.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_100,
    overflow: 'hidden',
  },
  fleetImageWrap: {
    width: '33%',
    backgroundColor: GRAY_200,
  },
  fleetImage: {
    width: '100%',
    height: '100%',
  },
  fleetInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  fleetTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fleetNameWrap: {
    flex: 1,
    marginRight: 8,
  },
  fleetName: {
    fontSize: 16,
    fontWeight: '700',
    color: GRAY_900,
  },
  fleetPlate: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: GRAY_400,
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fleetBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  fleetPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: GRAY_900,
  },
  fleetPricePer: {
    fontSize: 12,
    color: GRAY_500,
  },
  fleetRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  fleetRatingStar: {
    marginRight: 4,
  },
  fleetRating: {
    fontSize: 12,
    color: GRAY_500,
  },
  fleetButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  fleetButton: {
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  fleetButtonText: {
    fontSize: 12,
    color: GRAY_600,
  },
});

export default VendorDashboard;