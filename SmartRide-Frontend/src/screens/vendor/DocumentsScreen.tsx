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

const BLACK = '#111111';
const PAGE_BG = '#F4F5F7';
const LIME = '#B4E63B';
const GREEN = '#22C55E';
const GREEN_LIGHT = '#DCFCE7';
const RED = '#EF4444';
const YELLOW_200 = '#FEF08A';
const YELLOW_100 = '#FEF9C3';
const YELLOW_700 = '#A16207';
const ORANGE_600 = '#EA580C';
const GRAY_800 = '#1F2937';
const GRAY_700 = '#374151';
const GRAY_600 = '#4B5563';
const GRAY_500 = '#6B7280';
const GRAY_400 = '#9CA3AF';
const GRAY_200 = '#E5E7EB';
const GRAY_100 = '#F3F4F6';
const GRAY_50 = '#F9FAFB';
const WHITE = '#FFFFFF';

type DocStatus = 'verified' | 'review' | 'missing';

type DocItem = {
  id: string;
  title: string;
  required?: boolean;
  expiry: string;
  icon: string;
  status: DocStatus;
  action: 'view' | 'upload';
};

const STATUS_BADGES: Record<
  DocStatus,
  {label: string; bg: string; color: string}
> = {
  verified: {label: 'Verified', bg: GREEN_LIGHT, color: GREEN},
  review: {label: 'Verified', bg: YELLOW_100, color: YELLOW_700},
  missing: {label: 'Not Uploaded', bg: GRAY_100, color: GRAY_500},
};

const BUSINESS_DOCS: DocItem[] = [
  {
    id: 'gst',
    title: 'GST Certificate',
    required: true,
    expiry: 'Expiry: Lifetime',
    icon: 'building-columns',
    status: 'verified',
    action: 'view',
  },
  {
    id: 'pan',
    title: 'Business PAN',
    required: true,
    expiry: 'Expiry: Lifetime',
    icon: 'file-lines',
    status: 'verified',
    action: 'view',
  },
  {
    id: 'licence',
    title: 'Trade Licence',
    required: true,
    expiry: 'Expiry: Mar 2026',
    icon: 'clipboard-list',
    status: 'verified',
    action: 'view',
  },
  {
    id: 'bank',
    title: 'Bank Statement (3 months)',
    required: true,
    expiry: 'Expiry: Jun 2025',
    icon: 'building-user',
    status: 'review',
    action: 'view',
  },
];

const OWNER_DOCS: DocItem[] = [
  {
    id: 'aadhaar',
    title: "Owner's Aadhaar",
    expiry: 'Expiry: Lifetime',
    icon: 'id-card-clip',
    status: 'verified',
    action: 'view',
  },
  {
    id: 'owner-pan',
    title: "Owner's PAN",
    expiry: 'Expiry: Lifetime',
    icon: 'file-lines',
    status: 'verified',
    action: 'view',
  },
  {
    id: 'address',
    title: 'Address Proof',
    expiry: 'Expiry: —',
    icon: 'house-chimney',
    status: 'missing',
    action: 'upload',
  },
];

type VehicleDocStatus = 'verified' | 'expiring' | 'expired';

type VehicleDocRow = {
  id: string;
  title: string;
  expiry: string;
  status: VehicleDocStatus;
};

type VehicleDocument = {
  id: string;
  name: string;
  reg: string;
  docs: VehicleDocRow[];
};

const VEHICLE_BADGES: Record<
  VehicleDocStatus,
  {label: string; bg: string; color: string}
> = {
  verified: {label: 'Verified', bg: GREEN_LIGHT, color: GREEN},
  expiring: {label: 'Expiring Soon', bg: '#FEF3C7', color: '#D97706'},
  expired: {label: 'Expired', bg: '#FEE2E2', color: '#DC2626'},
};

const VEHICLE_DOCUMENTS: VehicleDocument[] = [
  {
    id: 'v1',
    name: 'Innova Crysta 2023',
    reg: 'KA-01-AB-1234',
    docs: [
      {id: 'rc', title: 'RC Book', expiry: 'Lifetime', status: 'verified'},
      {id: 'ins', title: 'Insurance', expiry: 'Nov 2025', status: 'verified'},
      {
        id: 'puc',
        title: 'Pollution (PUC)',
        expiry: 'Sep 2025',
        status: 'expiring',
      },
      {
        id: 'fit',
        title: 'Fitness Certificate',
        expiry: 'Jun 2026',
        status: 'verified',
      },
    ],
  },
  {
    id: 'v2',
    name: 'Swift Dzire Tour',
    reg: 'KA-01-CD-5678',
    docs: [
      {id: 'rc', title: 'RC Book', expiry: 'Lifetime', status: 'verified'},
      {id: 'ins', title: 'Insurance', expiry: 'Jan 2026', status: 'verified'},
      {id: 'puc', title: 'Pollution (PUC)', expiry: 'Dec 2025', status: 'verified'},
      {
        id: 'fit',
        title: 'Fitness Certificate',
        expiry: 'Jul 2025',
        status: 'expired',
      },
    ],
  },
  {
    id: 'v3',
    name: 'Honda City 4th Gen',
    reg: 'KA-05-EF-9012',
    docs: [
      {id: 'rc', title: 'RC Book', expiry: 'Lifetime', status: 'verified'},
      {id: 'ins', title: 'Insurance', expiry: 'Mar 2026', status: 'verified'},
      {
        id: 'puc',
        title: 'Pollution (PUC)',
        expiry: 'Aug 2025',
        status: 'expiring',
      },
      {
        id: 'fit',
        title: 'Fitness Certificate',
        expiry: 'Feb 2027',
        status: 'verified',
      },
    ],
  },
  {
    id: 'v4',
    name: 'Mahindra Thar LX',
    reg: 'KA-09-GH-3456',
    docs: [
      {id: 'rc', title: 'RC Book', expiry: 'Lifetime', status: 'verified'},
      {id: 'ins', title: 'Insurance', expiry: 'Oct 2025', status: 'verified'},
      {id: 'puc', title: 'Pollution (PUC)', expiry: 'Jan 2026', status: 'verified'},
      {
        id: 'fit',
        title: 'Fitness Certificate',
        expiry: 'Apr 2026',
        status: 'verified',
      },
    ],
  },
];

const ACTION_ITEMS = [
  {
    id: 'puc',
    vehicle: 'Innova Crysta 2023',
    doc: 'Pollution (PUC)',
    state: 'Expiring Soon',
    stateColor: ORANGE_600,
    detail: '(exp. Sep 2025)',
  },
  {
    id: 'fitness',
    vehicle: 'Swift Dzire Tour',
    doc: 'Fitness Certificate',
    state: 'Expired',
    stateColor: RED,
    detail: '(exp. Jul 2025)',
  },
];

function DocumentsScreen() {
  const {width} = useWindowDimensions();
  const isNarrow = width < 640;
  const [activeTab, setActiveTab] = React.useState<'business' | 'vehicle'>(
    'business',
  );

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isNarrow && styles.scrollContentNarrow,
        ]}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Documents</Text>
          <Text style={styles.pageSubtitle}>
            KYC and vehicle compliance documents
          </Text>
        </View>

        <View style={[styles.verifyBanner, isNarrow && styles.verifyBannerNarrow]}>
          <View
            style={[
              styles.bannerLeft,
              isNarrow && styles.bannerLeftNarrow,
            ]}>
            <View style={styles.bannerIconBox}>
              <FontAwesome6 solid name="check" size={20} color={BLACK} />
            </View>
            <View style={styles.bannerCopy}>
              <Text style={styles.bannerTitle}>KYC Verified</Text>
              <Text style={styles.bannerDescription}>
                Your business is fully verified. You can list vehicles and
                accept bookings.
              </Text>
            </View>
          </View>
          <View
            style={[styles.bannerRight, isNarrow && styles.bannerRightNarrow]}>
            <Text style={styles.bannerLabel}>Verified on</Text>
            <Text style={styles.bannerDate}>Jan 15, 2024</Text>
          </View>
        </View>

        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <FontAwesome6
              solid
              name="triangle-exclamation"
              size={16}
              color={YELLOW_700}
            />
            <Text style={styles.alertHeaderText}> Action Required</Text>
          </View>
          <View style={styles.alertRows}>
            {ACTION_ITEMS.map(item => (
              <View key={item.id} style={styles.alertRow}>
                <Text style={styles.alertText}>
                  <Text style={styles.alertVehicle}>{item.vehicle}</Text>
                  {' — '}
                  {item.doc} is{' '}
                  <Text style={[styles.alertState, {color: item.stateColor}]}>
                    {item.state}
                  </Text>{' '}
                  <Text style={styles.alertDetail}>{item.detail}</Text>
                </Text>
                <Pressable style={styles.renewButton}>
                  <Text style={styles.renewButtonText}>Renew</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tabsRow}>
          <Pressable
            onPress={() => setActiveTab('business')}
            style={[
              styles.tab,
              activeTab === 'business' ? styles.tabActive : styles.tabInactive,
            ]}>
            <FontAwesome6
              solid
              name="building"
              size={13}
              color={activeTab === 'business' ? WHITE : GRAY_600}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'business'
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
              ]}>
              Business &amp; Owner
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('vehicle')}
            style={[
              styles.tab,
              activeTab === 'vehicle' ? styles.tabActive : styles.tabInactive,
            ]}>
            <FontAwesome6
              solid
              name="car"
              size={13}
              color={activeTab === 'vehicle' ? WHITE : GRAY_600}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'vehicle'
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
              ]}>
              Vehicle Documents
            </Text>
          </Pressable>
        </View>

        {activeTab === 'business' ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Business Documents</Text>
              <View style={styles.docList}>
                {BUSINESS_DOCS.map(doc => (
                  <DocCard key={doc.id} doc={doc} />
                ))}
              </View>
            </View>

            <View>
              <Text style={styles.sectionHeading}>
                Owner / Director Documents
              </Text>
              <View style={styles.docList}>
                {OWNER_DOCS.map(doc => (
                  <DocCard key={doc.id} doc={doc} />
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.vehicleList}>
            {VEHICLE_DOCUMENTS.map(vehicle => (
              <VehicleDocCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </View>
        )}
      </ScrollView>

      <Pressable style={styles.helpButton}>
        <FontAwesome6 solid name="question" size={20} color={WHITE} />
      </Pressable>
    </View>
  );
}

function DocCard({doc}: {doc: DocItem}) {
  const badge = STATUS_BADGES[doc.status];
  return (
    <View style={styles.docCard}>
      <View style={styles.docLeft}>
        <View style={styles.iconBox}>
          <FontAwesome6 solid name={doc.icon} size={16} color={GRAY_600} />
        </View>
        <View style={styles.docInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.docTitle}>{doc.title}</Text>
            {doc.required && (
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Required</Text>
              </View>
            )}
          </View>
          <Text style={styles.expiryText}>{doc.expiry}</Text>
        </View>
      </View>
      <View style={styles.docActions}>
        <View style={[styles.statusBadge, {backgroundColor: badge.bg}]}>
          <Text style={[styles.statusText, {color: badge.color}]}>
            {badge.label}
          </Text>
        </View>
        {doc.action === 'view' ? (
          <Pressable style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function VehicleDocCard({vehicle}: {vehicle: VehicleDocument}) {
  return (
    <View style={styles.vehicleCard}>
      <View style={styles.vHeader}>
        <View style={styles.vHeaderInfo}>
          <Text style={styles.vName}>{vehicle.name}</Text>
          <Text style={styles.vReg}>{vehicle.reg}</Text>
        </View>
        <Pressable style={styles.addDocButton}>
          <Text style={styles.addDocButtonText}>+ Add Document</Text>
        </Pressable>
      </View>
      {vehicle.docs.map((doc, index) => {
        const badge = VEHICLE_BADGES[doc.status];
        const isLast = index === vehicle.docs.length - 1;
        return (
          <View key={doc.id} style={[styles.vRow, isLast && styles.vRowLast]}>
            <Text style={styles.vDocTitle}>{doc.title}</Text>
            <View style={styles.vRowRight}>
              <Text style={styles.vExp}>Exp: {doc.expiry}</Text>
              <View style={[styles.statusBadge, {backgroundColor: badge.bg}]}>
                <Text style={[styles.statusText, {color: badge.color}]}>
                  {badge.label}
                </Text>
              </View>
              {doc.status === 'verified' ? (
                <Pressable style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.renewOutline}>
                  <Text style={styles.renewOutlineText}>Renew</Text>
                </Pressable>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 32,
    paddingBottom: 96,
    maxWidth: 1024,
    width: '100%',
    alignSelf: 'center',
  },
  scrollContentNarrow: {
    padding: 20,
    paddingBottom: 72,
  },
  verifyBannerNarrow: {
    flexDirection: 'column',
  },
  pageHeader: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: BLACK,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: GRAY_500,
  },
  verifyBanner: {
    backgroundColor: BLACK,
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexShrink: 1,
    flex: 1,
  },
  bannerLeftNarrow: {
    flex: 0,
  },
  bannerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: LIME,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  bannerCopy: {
    flexShrink: 1,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: WHITE,
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 14,
    color: GRAY_400,
  },
  bannerRight: {
    alignItems: 'flex-end',
  },
  bannerRightNarrow: {
    alignItems: 'flex-start',
  },
  bannerLabel: {
    fontSize: 12,
    color: GRAY_400,
    marginBottom: 4,
  },
  bannerDate: {
    fontWeight: '700',
    color: WHITE,
  },
  alertBox: {
    backgroundColor: YELLOW_100,
    borderWidth: 1,
    borderColor: YELLOW_200,
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: YELLOW_700,
    marginLeft: 8,
  },
  alertRows: {
    gap: 12,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  alertText: {
    fontSize: 14,
    lineHeight: 20,
    color: GRAY_500,
    flexShrink: 1,
    marginRight: 12,
  },
  alertVehicle: {
    fontWeight: '500',
    color: GRAY_800,
  },
  alertState: {
    fontWeight: '700',
  },
  alertDetail: {
    color: GRAY_500,
  },
  renewButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: YELLOW_200,
    borderRadius: 999,
  },
  renewButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: YELLOW_700,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: BLACK,
  },
  tabInactive: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_200,
  },
  tabText: {
    fontSize: 14,
    marginLeft: 8,
  },
  tabTextActive: {
    color: WHITE,
    fontWeight: '700',
  },
  tabTextInactive: {
    color: GRAY_600,
    fontWeight: '600',
  },
  section: {
    marginBottom: 40,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: GRAY_400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  docList: {
    gap: 16,
  },
  docCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_100,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: GRAY_50,
    borderWidth: 1,
    borderColor: GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  docInfo: {
    flexShrink: 1,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BLACK,
    marginRight: 8,
  },
  requiredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: GRAY_100,
    borderRadius: 4,
  },
  requiredText: {
    fontSize: 12,
    fontWeight: '500',
    color: GRAY_500,
  },
  expiryText: {
    fontSize: 12,
    color: GRAY_400,
  },
  docActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 999,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: GRAY_700,
  },
  uploadButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 999,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: GREEN,
  },
  emptyCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_200,
    padding: 48,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: GRAY_800,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: GRAY_500,
    textAlign: 'center',
    maxWidth: 360,
    lineHeight: 22,
  },
  vehicleList: {
    gap: 24,
  },
  vehicleCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  vHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 12,
    padding: 20,
    backgroundColor: GRAY_50,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_100,
  },
  vHeaderInfo: {
    flexShrink: 1,
  },
  vName: {
    fontSize: 16,
    fontWeight: '800',
    color: BLACK,
    marginBottom: 2,
  },
  vReg: {
    fontSize: 13,
    color: GRAY_500,
    letterSpacing: 0.5,
  },
  addDocButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 999,
    backgroundColor: WHITE,
  },
  addDocButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: GRAY_700,
  },
  vRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_100,
  },
  vRowLast: {
    borderBottomWidth: 0,
  },
  vDocTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
    flexShrink: 1,
    marginRight: 12,
  },
  vRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vExp: {
    fontSize: 13,
    color: GRAY_500,
  },
  renewOutline: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 999,
    backgroundColor: WHITE,
  },
  renewOutlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: RED,
  },
  helpButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
  },
});

export default DocumentsScreen;
