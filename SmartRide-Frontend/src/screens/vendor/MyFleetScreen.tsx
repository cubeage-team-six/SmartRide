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
const GRAY_500 = VENDOR.gray500;
const GRAY_400 = VENDOR.gray400;
const GRAY_200 = VENDOR.gray200;
const GRAY_100 = VENDOR.gray100;

const STATS = [
  {key: 'total', value: '4', label: 'Total'},
  {key: 'available', value: '2', label: 'Available'},
  {key: 'onrent', value: '1', label: 'On Rent'},
  {key: 'maintenance', value: '1', label: 'Maintenance'},
];

const FILTERS = ['All', 'Available', 'On Rent', 'Maintenance', 'Inactive'];

const VEHICLES = [
  {
    name: 'Innova Crysta 2023',
    plate: 'KA-01-AB-1234',
    status: 'On Rent',
    spec: 'SUV · Diesel · Automatic',
    price: '₹2,300',
    booking: 'BK-0871 · Returns Aug 17',
    rating: '4.8',
    trips: '47 trips',
    listed: 'Listed Mar 2024',
    statusBg: '#DBEAFE',
    statusColor: '#1D4ED8',
    statusDot: '#2563EB',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwqBeWJdgeMDfJtPIuIlN8njw6UFQVU1ZxNGj3XhGNqqUBG5qlAkUV0O98ZobTrlQp2a1M85W_inKYZTj7MmHRCyla6M6VcwMG5qWBs6EnqyOKZ1FFXCi7XZ7iUlbuiTtb-FjX2Iprnra3AehBuMQqtcWOa_IwHEsvQfaL-LHmkqWGsC6grOVPFcxHBm3RVYjxdsv9k9Pra5ilzKW-hAltWxvnr4O9FG-z9mmXAo4gfg29o8KlW8_P',
  },
  {
    name: 'Swift Dzire Tour',
    plate: 'KA-01-CD-5678',
    status: 'Available',
    spec: 'Sedan · Petrol · Manual',
    price: '₹999',
    rating: '4.7',
    trips: '91 trips',
    listed: 'Listed Jan 2024',
    statusBg: '#DCFCE7',
    statusColor: '#15803D',
    statusDot: '#16A34A',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT7R0aLQgNkIIMIiCxJXlJYvP1rNe6lrq_fSMfQK7HzxINDP8I5ZIKtaKPdwuAXeAEh8V9Mcf_G8YteydZSsl7hxxnmCSmx7W3YZwyBBkuzehyBhXqCqfoA4bvMGtfU-sEhrSSoV7UWama96HfQ9bWxwuH61oNu_3239r4-Xwa_PZyaDYk5zQI2ImYVFNl1mBx5zzCMBNKwiGW6JmbyxJJ48ZaCGZ_vubwoQ43HCW2I3jj-vcTGFzB',
  },
  {
    name: 'Honda City 4th Gen',
    plate: 'KA-01-EF-9012',
    status: 'Maintenance',
    spec: 'Sedan · Petrol · Automatic',
    price: '₹1,100',
    rating: '4.6',
    trips: '58 trips',
    listed: 'Listed Jul 2023',
    statusBg: '#FEF3C7',
    statusColor: '#B45309',
    statusDot: '#F59E0B',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcuIwW-lmgUrEY7HfbQudR0G8fJ4ErjLCzLiYgi-kHXk3ifPmpalEae4TeUNpPuwIrxfULuM3sPBWmjmNE1xmH6jgrciQTnn5NZAApPa3zrKIe6FEsJsSDRd3uSkYgpWD-MufPlaIMcoAQngRK08L8JP5ugFgBD00RsNoUdkMwr-BCM1HMRhGQfGqjw8ZjTkgg6ScJW-jzlp5wHdS9-2018zUcyJZxnf05IlObni_ix_0-lu58OxXL',
  },
  {
    name: 'Mahindra Thar LX',
    plate: 'KA-01-GH-3456',
    status: 'Available',
    spec: 'SUV · Diesel · Manual',
    price: '₹1,950',
    rating: '4.9',
    trips: '33 trips',
    listed: 'Listed Jun 2023',
    statusBg: '#DCFCE7',
    statusColor: '#15803D',
    statusDot: '#16A34A',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4EA3T1MHJ7tePEW0lkxARZQYabTTOGjNQpV4X59nvuoL8XGfL0Gpkf5q41YFGlNklkv4j2W5kQCOPj3pFlVdEMrm3oqFG_Zmv3OyKtNvm9x4NtsgG5ca5paHocV6Y1iM6DMLUEGbQrmHjHvo76ccMhGGNT8n2z_uIh-hidpP8xlsDuuD_NF9yc89lhJ8YrPqrWi-uiXDLyNL1IHR7elouMKeIhQGqAI8Q13aiJNJ5kOEqSNnABkB',
  },
];

function MyFleetScreen() {
  const {width} = useWindowDimensions();
  const [contentW, setContentW] = React.useState(0);
  const cw = contentW || width;
  const statColumns = width >= 768 ? 4 : 1;
  const isNarrow = cw < 640;
  const statWidth = (cw - 64 - 24 * (statColumns - 1)) / statColumns;
  const cardColumns = width >= 1024 ? 4 : width >= 768 ? 2 : 1;
  const cardWidth = (cw - 64 - 24 * (cardColumns - 1)) / cardColumns;
  const [activeFilter, setActiveFilter] = React.useState(FILTERS[0]);

  return (
    <View
      style={styles.root}
      onLayout={e => setContentW(e.nativeEvent.layout.width)}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isNarrow && styles.scrollContentNarrow,
        ]}>
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>My Fleet</Text>
            <Text style={styles.pageSubtitle}>4 vehicles listed</Text>
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
            <View key={stat.key} style={[styles.statCard, {width: statWidth}]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filters}>
            {FILTERS.map(filter => (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterPill,
                  filter === activeFilter
                    ? styles.filterPillActive
                    : styles.filterPillInactive,
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    filter === activeFilter
                      ? styles.filterTextActive
                      : styles.filterTextInactive,
                  ]}>
                  {filter}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.viewToggles}>
            <Pressable style={styles.viewToggleActive}>
              <FontAwesome6 solid name="table-cells" size={20} color={GRAY_900} />
            </Pressable>
            <Pressable style={styles.viewToggle}>
              <FontAwesome6 solid name="list" size={20} color={GRAY_400} />
            </Pressable>
          </View>
        </View>

        <View style={styles.grid}>
          {VEHICLES.map(vehicle => (
            <FleetVehicleCard
              key={vehicle.plate}
              vehicle={vehicle}
              width={cardWidth}
              narrow={cardWidth < 260}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.helpButton}>
        <FontAwesome6 solid name="question" size={20} color={VENDOR.white} />
      </Pressable>
    </View>
  );
}

function FleetVehicleCard({
  vehicle,
  width,
  narrow,
}: {
  vehicle: (typeof VEHICLES)[number];
  width: number;
  narrow: boolean;
}) {
  return (
    <View style={[styles.vehicleCard, {width}]}>
      <View style={styles.imageWrap}>
        <Image source={{uri: vehicle.image}} style={styles.vehicleImage} />
        <View style={[styles.statusBadge, {backgroundColor: vehicle.statusBg}]}>
          <View style={[styles.statusDot, {backgroundColor: vehicle.statusDot}]} />
          <Text style={[styles.statusText, {color: vehicle.statusColor}]}>
            {vehicle.status}
          </Text>
          <FontAwesome6
            solid
            name="chevron-down"
            size={10}
            color={vehicle.statusColor}
            style={styles.statusChevron}
          />
        </View>
        <View style={styles.plateBadge}>
          <Text style={styles.plateText}>{vehicle.plate}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <View style={styles.priceWrap}>
            <Text style={styles.price}>{vehicle.price}</Text>
            <Text style={styles.pricePer}>/day</Text>
          </View>
        </View>

        <Text style={styles.spec}>{vehicle.spec}</Text>

        {vehicle.booking && (
          <View style={styles.bookingBanner}>
            <FontAwesome6
              solid
              name="calendar"
              size={13}
              color="#3B82F6"
              style={styles.bookingIcon}
            />
            <Text style={styles.bookingText}>{vehicle.booking}</Text>
          </View>
        )}

        <View style={styles.metaRow}>
          <View style={styles.ratingWrap}>
            <FontAwesome6
              solid
              name="star"
              size={12}
              color={GRAY_400}
              style={styles.ratingStar}
            />
            <Text style={styles.metaText}>
              {vehicle.rating} · {vehicle.trips}
            </Text>
          </View>
          <Text style={styles.metaText}>{vehicle.listed}</Text>
        </View>

        <View style={[styles.actionRow, narrow && styles.actionRowNarrow]}>
          {narrow ? (
            <>
              <Pressable style={styles.actionButton}>
                <FontAwesome6
                  solid
                  name="pen"
                  size={13}
                  color={GRAY_400}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>Edit</Text>
              </Pressable>
              <Pressable style={styles.deleteButton}>
                <FontAwesome6 solid name="trash-can" size={15} color="#EF4444" />
              </Pressable>
              <Pressable style={[styles.actionButton, styles.actionButtonFull]}>
                <FontAwesome6
                  solid
                  name="calendar"
                  size={13}
                  color={GRAY_400}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>Availability</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={styles.actionButton}>
                <FontAwesome6
                  solid
                  name="pen"
                  size={13}
                  color={GRAY_400}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>Edit</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <FontAwesome6
                  solid
                  name="calendar"
                  size={13}
                  color={GRAY_400}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>Availability</Text>
              </Pressable>
              <Pressable style={styles.deleteButton}>
                <FontAwesome6 solid name="trash-can" size={15} color="#EF4444" />
              </Pressable>
            </>
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
  scrollContentNarrow: {
    padding: 20,
    paddingBottom: 40,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: GRAY_900,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: GRAY_500,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    paddingVertical: 10,
    paddingHorizontal: 24,
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
    backgroundColor: VENDOR.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GRAY_100,
    padding: 24,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    color: GRAY_900,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: GRAY_500,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPill: {
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
    color: GRAY_700,
  },
  viewToggles: {
    flexDirection: 'row',
    gap: 12,
  },
  viewToggle: {
    padding: 4,
  },
  viewToggleActive: {
    padding: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    paddingBottom: 40,
  },
  vehicleCard: {
    backgroundColor: VENDOR.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: GRAY_100,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 192,
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusChevron: {
    marginLeft: 6,
  },
  plateBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  plateText: {
    fontSize: 12,
    fontWeight: '700',
    color: GRAY_900,
  },
  cardBody: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY_900,
    flex: 1,
    marginRight: 8,
  },
  priceWrap: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY_900,
  },
  pricePer: {
    fontSize: 12,
    color: GRAY_500,
  },
  spec: {
    fontSize: 14,
    color: GRAY_500,
    marginBottom: 16,
  },
  bookingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  bookingIcon: {
    marginRight: 8,
  },
  bookingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D4ED8',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: GRAY_400,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionRowNarrow: {
    flexWrap: 'wrap',
  },
  actionButtonFull: {
    flexBasis: '100%',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: GRAY_700,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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

export default MyFleetScreen;