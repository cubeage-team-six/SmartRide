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
const GRAY_900 = VENDOR.gray900;
const GRAY_700 = VENDOR.gray700;
const GRAY_500 = VENDOR.gray500;
const GRAY_400 = VENDOR.gray400;
const GRAY_200 = VENDOR.gray200;
const GRAY_100 = VENDOR.gray100;

const FILTERS = [
  {label: 'All', count: 6},
  {label: 'Pending', count: 2},
  {label: 'Active', count: 1},
  {label: 'Upcoming'},
  {label: 'Completed', count: 2},
  {label: 'Cancelled', count: 1},
];

const BOOKINGS = [
  {
    id: 'BK-0887',
    guest: 'Rohan Kapoor',
    vehicle: 'Innova Crysta 2023',
    dates: 'Aug 15, 2025 → Aug 18, 2025',
    days: '3 days',
    withDriver: true,
    amount: '₹6,900',
    status: 'Pending',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8wm4GT9E2J15zmaiOrY5h3ZvrzQmKOtrKwlor3WXFBio6oFHKLjIbMHOi1uizu-OLJdxieiqoTw7ihBny6umgY14j4OKPmHDZUleMB4zbXB9MeUF_OJi8AUJ-MRh8IiYat1OLKh8Z_lWwKgADDQJidKQe3c2yhttjNr_HeNfOS6QKHHN_CY111HDGlBWBh1CxiU77zCqGvFG709fPoCV3W2f7pJimGv1fppOl0rk5r1FBfFknir1V',
  },
  {
    id: 'BK-0889',
    guest: 'Sneha Joshi',
    vehicle: 'Swift Dzire Tour',
    dates: 'Aug 16, 2025 → Aug 17, 2025',
    days: '1 day',
    withDriver: false,
    amount: '₹999',
    status: 'Pending',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAc8PU-reCqi1P-ejldFgbcPcWgf_tgJCk-gWLIha4WIUy0TykOHrlbelGiinlqbAqHWmNkTh4ABOZy3T9545pPml75y6s8U9a0KJpMHAW9S4cw2YOMWjaam9cOX5pImnBwoGeFL2oguwnWXcpshW3YOi6Y_Sb3qUIpSjXKDUh9kNGNY8oDfZdwRJCWCmDCChhQI-FGFkzW3gjEQFHPYmbttpqfxKxPo5FLJMCcinQCAijQlY8rUEZK',
  },
  {
    id: 'BK-0871',
    guest: 'Arjun Mehta',
    vehicle: 'Mahindra Thar LX',
    dates: 'Aug 14, 2025 → Aug 17, 2025',
    days: '3 days',
    withDriver: false,
    amount: '₹5,850',
    status: 'Active',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCG74WK3A5LlH2Cfc575CPZh78HpFD2uGyqDzK9X-H-hvyAVlOOAvweJkQk6grkAieEfb9yuE7kEALzf0FdQeVbAESpkavlGFIDuRdDfQs0vCwamGbcuGRdyzTxW2qoedE_NlxzECT6z5PSUuCcIsXaA2vv9e24NdEOTO9LVbRi9_O9wOHDKl7FcMtzLAyCk9vv3x_Gkw8otaCDWRQoIFZkuM8lROoAphgNypa7tdzEZzhgGYrllkF',
  },
  {
    id: 'BK-0883',
    guest: 'Priya Sharma',
    vehicle: 'Honda City 4th Gen',
    dates: 'Aug 10, 2025 → Aug 12, 2025',
    days: '2 days',
    withDriver: false,
    amount: '₹2,200',
    status: 'Completed',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcuIwW-lmgUrEY7HfbQudR0G8fJ4ErjLCzLiYgi-kHXk3ifPmpalEae4TeUNpPuwIrxfULuM3sPBWmjmNE1xmH6jgrciQTnn5NZAApPa3zrKIe6FEsJsSDRd3uSkYgpWD-MufPlaIMcoAQngRK08L8JP5ugFgBD00RsNoUdkMwr-BCM1HMRhGQfGqjw8ZjTkgg6ScJW-jzlp5wHdS9-2018zUcyJZxnf05IlObni_ix_0-lu58OxXL',
  },
  {
    id: 'BK-0876',
    guest: 'Vikram Rao',
    vehicle: 'Mahindra Thar LX',
    dates: 'Aug 8, 2025 → Aug 10, 2025',
    days: '2 days',
    withDriver: true,
    amount: '₹3,900',
    status: 'Completed',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCG74WK3A5LlH2Cfc575CPZh78HpFD2uGyqDzK9X-H-hvyAVlOOAvweJkQk6grkAieEfb9yuE7kEALzf0FdQeVbAESpkavlGFIDuRdDfQs0vCwamGbcuGRdyzTxW2qoedE_NlxzECT6z5PSUuCcIsXaA2vv9e24NdEOTO9LVbRi9_O9wOHDKl7FcMtzLAyCk9vv3x_Gkw8otaCDWRQoIFZkuM8lROoAphgNypa7tdzEZzhgGYrllkF',
  },
  {
    id: 'BK-0885',
    guest: 'Ananya Iyer',
    vehicle: 'Innova Crysta 2023',
    dates: 'Aug 12, 2025 → Aug 14, 2025',
    days: '2 days',
    withDriver: false,
    amount: '₹4,600',
    status: 'Cancelled',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8wm4GT9E2J15zmaiOrY5h3ZvrzQmKOtrKwlor3WXFBio6oFHKLjIbMHOi1uizu-OLJdxieiqoTw7ihBny6umgY14j4OKPmHDZUleMB4zbXB9MeUF_OJi8AUJ-MRh8IiYat1OLKh8Z_lWwKgADDQJidKQe3c2yhttjNr_HeNfOS6QKHHN_CY111HDGlBWBh1CxiU77zCqGvFG709fPoCV3W2f7pJimGv1fppOl0rk5r1FBfFknir1V',
  },
];

const STAT_ROWS = [
  {label: 'New Bookings', value: '8'},
  {label: 'Accepted', value: '6'},
  {label: 'Declined', value: '1'},
  {label: 'Cancellations', value: '1'},
  {label: 'Acceptance Rate', value: '85%'},
];

const STATUS_STYLES: Record<
  string,
  {bg: string; color: string}
> = {
  Pending: {bg: '#FEF3C7', color: '#B45309'},
  Active: {bg: '#D1FAE5', color: '#047857'},
  Completed: {bg: '#DBEAFE', color: '#1D4ED8'},
  Cancelled: {bg: '#FEE2E2', color: '#B91C1C'},
};

function BookingsScreen() {
  const {width} = useWindowDimensions();
  const [contentW, setContentW] = React.useState(0);
  const cw = contentW || width;
  const isWide = cw >= 820;
  const [activeFilter, setActiveFilter] = React.useState('All');

  return (
    <View
      style={styles.root}
      onLayout={e => setContentW(e.nativeEvent.layout.width)}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Bookings</Text>
          <Text style={styles.pageSubtitle}>6 total bookings</Text>
        </View>

        <View style={styles.alertBanner}>
          <View style={styles.alertText}>
            <View style={styles.alertIconWrap}>
              <FontAwesome6 solid name="clock" size={20} color="#B45309" />
            </View>
            <View>
              <Text style={styles.alertTitle}>
                2 booking requests awaiting your response
              </Text>
              <Text style={styles.alertSubtitle}>
                Respond within 2 hours to maintain your acceptance rate
              </Text>
            </View>
          </View>
          <Pressable style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review Now</Text>
          </Pressable>
        </View>

        <View style={[styles.contentRow, !isWide && styles.contentRowNarrow]}>
          <View style={[styles.list, !isWide && styles.listNarrow]}>
            <View style={styles.filters}>
              {FILTERS.map(filter => (
                <Pressable
                  key={filter.label}
                  onPress={() => setActiveFilter(filter.label)}
                  style={[
                    styles.filterPill,
                    filter.label === activeFilter
                      ? styles.filterPillActive
                      : styles.filterPillInactive,
                  ]}>
                  <Text
                    style={[
                      styles.filterText,
                      filter.label === activeFilter
                        ? styles.filterTextActive
                        : styles.filterTextInactive,
                    ]}>
                    {filter.label}
                  </Text>
                  {filter.count != null && (
                    <View
                      style={[
                        styles.filterCount,
                        filter.label === activeFilter
                          ? styles.filterCountActive
                          : styles.filterCountInactive,
                      ]}>
                      <Text
                        style={[
                          styles.filterCountText,
                          filter.label === activeFilter
                            ? styles.filterCountTextActive
                            : styles.filterCountTextInactive,
                        ]}>
                        {filter.count}
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>

            <View style={styles.bookingsList}>
              {BOOKINGS.map(booking => (
                <BookingCard key={booking.id} booking={booking} isWide={isWide} />
              ))}
            </View>
          </View>

          <View style={[styles.widget, !isWide && styles.widgetNarrow]}>
            <Text style={styles.widgetTitle}>This Month</Text>
            <View style={styles.widgetRows}>
              {STAT_ROWS.map(row => (
                <View key={row.label} style={styles.widgetRow}>
                  <Text style={styles.widgetRowLabel}>{row.label}</Text>
                  <Text style={styles.widgetRowValue}>{row.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.helpButton}>
        <FontAwesome6 solid name="question" size={20} color={VENDOR.white} />
      </Pressable>
    </View>
  );
}

function BookingCard({
  booking,
  isWide,
}: {
  booking: (typeof BOOKINGS)[number];
  isWide: boolean;
}) {
  const status = STATUS_STYLES[booking.status] ?? STATUS_STYLES.Pending;
  return (
    <View style={[styles.card, !isWide && styles.cardNarrow]}>
      <Image
        source={{uri: booking.image}}
        style={[styles.cardImage, !isWide && styles.cardImageNarrow]}
      />
      <View style={[styles.cardInfo, !isWide && styles.cardInfoNarrow]}>
        <View style={[styles.cardLeft, !isWide && styles.cardLeftNarrow]}>
          <View>
            <Text style={styles.guestName}>{booking.guest}</Text>
            <Text style={styles.guestVehicle}>
              {booking.vehicle} • {booking.id}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <FontAwesome6
                solid
                name="calendar"
                size={13}
                color={GRAY_400}
                style={styles.metaIcon}
              />
              <Text style={styles.metaText}>{booking.dates}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome6
                solid
                name="clock"
                size={13}
                color={GRAY_400}
                style={styles.metaIcon}
              />
              <Text style={styles.metaText}>{booking.days}</Text>
            </View>
            {booking.withDriver && (
              <View style={styles.metaItem}>
                <FontAwesome6
                  solid
                  name="user-tie"
                  size={13}
                  color={GRAY_400}
                  style={styles.metaIcon}
                />
                <Text style={styles.metaText}>With driver</Text>
              </View>
            )}
          </View>

          <Text style={styles.amount}>{booking.amount}</Text>
        </View>

        <View style={[styles.cardRight, !isWide && styles.cardRightNarrow]}>
          <View style={[styles.statusBadge, {backgroundColor: status.bg}]}>
            <Text style={[styles.statusText, {color: status.color}]}>
              {booking.status}
            </Text>
          </View>
          {booking.status === 'Pending' && (
            <View style={styles.actions}>
              <Pressable style={styles.declineButton}>
                <FontAwesome6 solid name="xmark" size={13} color="#EF4444" />
                <Text style={styles.declineText}>Decline</Text>
              </Pressable>
              <Pressable style={styles.acceptButton}>
                <FontAwesome6 solid name="check" size={13} color={DARK} />
                <Text style={styles.acceptText}>Accept</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: VENDOR.pageBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 32,
    paddingBottom: 48,
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: GRAY_900,
    letterSpacing: 0.3,
  },
  pageSubtitle: {
    fontSize: 14,
    color: GRAY_500,
    marginTop: 4,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 16,
  },
  alertText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIconWrap: {
    marginRight: 16,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#78350F',
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#B45309',
    marginTop: 2,
  },
  reviewButton: {
    backgroundColor: '#FDE68A',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#78350F',
  },
  contentRow: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'flex-start',
  },
  contentRowNarrow: {
    flexDirection: 'column',
  },
  list: {
    flex: 1,
  },
  listNarrow: {
    flex: 0,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  filterPillActive: {
    backgroundColor: GRAY_900,
  },
  filterPillInactive: {
    backgroundColor: VENDOR.white,
    borderWidth: 1,
    borderColor: GRAY_200,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: VENDOR.white,
  },
  filterTextInactive: {
    color: GRAY_500,
  },
  filterCount: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    marginLeft: 8,
  },
  filterCountActive: {
    backgroundColor: GRAY_700,
  },
  filterCountInactive: {
    backgroundColor: GRAY_100,
  },
  filterCountText: {
    fontSize: 12,
  },
  filterCountTextActive: {
    color: GRAY_200,
  },
  filterCountTextInactive: {
    color: GRAY_500,
  },
  bookingsList: {
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: VENDOR.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GRAY_100,
    padding: 16,
    gap: 24,
    alignItems: 'center',
  },
  cardNarrow: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
  },
  cardImage: {
    width: 192,
    height: 128,
    borderRadius: 12,
  },
  cardImageNarrow: {
    width: '100%',
    height: 180,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfoNarrow: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
  },
  cardLeft: {
    flex: 1,
  },
  cardLeftNarrow: {
    flex: 0,
  },
  guestName: {
    fontSize: 18,
    fontWeight: '700',
    color: GRAY_900,
  },
  guestVehicle: {
    fontSize: 14,
    color: GRAY_500,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    color: GRAY_500,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY_900,
    marginTop: 12,
  },
  cardRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 128,
  },
  cardRightNarrow: {
    height: 'auto',
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  declineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: VENDOR.green,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK,
  },
  widget: {
    width: 288,
    flexShrink: 0,
    backgroundColor: VENDOR.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GRAY_100,
    padding: 24,
  },
  widgetNarrow: {
    width: '100%',
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GRAY_900,
    marginBottom: 16,
  },
  widgetRows: {
    gap: 12,
  },
  widgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  widgetRowLabel: {
    fontSize: 14,
    color: GRAY_500,
  },
  widgetRowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: GRAY_900,
  },
  helpButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GRAY_900,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingsScreen;