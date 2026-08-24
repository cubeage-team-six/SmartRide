import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { VENDOR } from '../vendorTheme';

const GREEN = VENDOR.green;
const GRAY_900 = VENDOR.gray900;
const GRAY_800 = VENDOR.gray800;
const GRAY_700 = VENDOR.gray700;
const GRAY_500 = VENDOR.gray500;
const GRAY_400 = VENDOR.gray400;
const GRAY_200 = VENDOR.gray200;
const GRAY_100 = VENDOR.gray100;
const GRAY_50 = VENDOR.gray50;
const WHITE = VENDOR.white;
const EMERALD_700 = '#047857';
const EMERALD_100 = '#D1FAE5';
const AMBER_700 = '#B45309';
const YELLOW_100 = '#FEF9C3';

const TABS = [
  { key: 'profile', label: 'Business Profile' },
  { key: 'bank', label: 'Bank Details' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'availability', label: 'Availability' },
  { key: 'account', label: 'Account' },
];

const INITIAL_FORM_DATA = {
  businessName: 'GoWheels Rental',
  ownerName: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  email: 'rajesh@gowheels.in',
  gst: '29AABCG1234A1Z5',
  pinCode: '560025',
  city: 'Bangalore',
  state: 'Karnataka',
  pickupAddress: '12 Residency Road, Bangalore',
  description: 'GoWheels Rental is a premium car rental service offering well-maintained vehicles across Bangalore. We specialise in self-drive cars and chauffeured SUVs for both leisure and corporate travel.',
};

const INITIAL_BANK_DATA = {
  accountHolder: 'GoWheels Rental Pvt Ltd',
  accountNumber: '••••••••4821',
  ifsc: 'HDFC0001234',
  bankName: 'HDFC Bank',
  branch: 'Residency Road, Bangalore',
  upiId: 'gowheels@hdfcbank',
};

const INITIAL_NOTIFICATIONS = {
  newBooking: true,
  bookingCancelled: true,
  paymentReceived: true,
  docExpiry: true,
  platformUpdates: false,
  sms: true,
  whatsapp: true,
  email: true,
};

const INITIAL_AVAILABILITY = {
  minNotice: '4',
  maxAdvance: '60',
  cutoffTime: '22:00',
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ACCOUNT_ACTIONS = [
  {
    id: 'mobile',
    title: 'Change Mobile Number',
    subtitle: 'Currently +91 98765 43210',
    actionLabel: 'Change',
  },
  {
    id: 'email',
    title: 'Change Email',
    subtitle: 'Currently rajesh@gowheels.in',
    actionLabel: 'Change',
  },
  {
    id: 'pin',
    title: 'Set Account PIN',
    subtitle: 'Add a login PIN for extra security',
    actionLabel: 'Set Up',
  },
  {
    id: 'twoFactor',
    title: 'Two-Factor Auth',
    subtitle: 'OTP on every login',
    actionLabel: 'Enable',
  },
  {
    id: 'sessions',
    title: 'Active Sessions',
    subtitle: '2 devices logged in',
    actionLabel: 'Manage',
  },
];

function SettingsScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [bankData, setBankData] = useState(INITIAL_BANK_DATA);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [availability, setAvailability] = useState(INITIAL_AVAILABILITY);
  const [autoAccept, setAutoAccept] = useState(true);
  const [daysOff, setDaysOff] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (field: string, value: string) => {
    setBankData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof notifications],
    }));
  };

  const handleAvailabilityChange = (field: string, value: string) => {
    setAvailability(prev => ({ ...prev, [field]: value }));
  };

  const toggleDayOff = (day: string) => {
    setDaysOff(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  const renderTab = (tab: { key: string; label: string }) => (
    <Pressable
      key={tab.key}
      onPress={() => setActiveTab(tab.key)}
      style={[
        baseStyles.tab,
        activeTab === tab.key ? baseStyles.tabActive : baseStyles.tabInactive,
      ]}
    >
      <Text style={[
        baseStyles.tabText,
        activeTab === tab.key ? baseStyles.tabTextActive : baseStyles.tabTextInactive,
      ]}>
        {tab.label}
      </Text>
    </Pressable>
  );

  const renderInput = (label: string, field: string, placeholder = '', type = 'text') => (
    <View style={getFormFieldStyle(isDesktop)}>
      <Text style={baseStyles.label}>{label}</Text>
      <TextInput
        style={baseStyles.input}
        placeholder={placeholder}
        value={formData[field as keyof typeof formData]}
        onChangeText={value => handleChange(field, value)}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
      />
    </View>
  );

  const renderBankInput = (label: string, field: string, placeholder = '') => (
    <View style={getFormFieldStyle(isDesktop)}>
      <Text style={baseStyles.label}>{label}</Text>
      <TextInput
        style={baseStyles.input}
        placeholder={placeholder}
        value={bankData[field as keyof typeof bankData]}
        onChangeText={value => handleBankChange(field, value)}
      />
    </View>
  );

  const renderAvailInput = (label: string, field: string, numeric = false) => (
    <View style={getFormField3Style(isDesktop)}>
      <Text style={baseStyles.label}>{label}</Text>
      <TextInput
        style={baseStyles.input}
        value={availability[field as keyof typeof availability]}
        onChangeText={value => handleAvailabilityChange(field, value)}
        keyboardType={numeric ? 'number-pad' : 'default'}
      />
    </View>
  );

  const renderTextarea = (label: string, field: string) => (
    <View style={getFormFieldStyle(isDesktop)}>
      <Text style={baseStyles.label}>{label}</Text>
      <TextInput
        style={[baseStyles.input, baseStyles.textarea]}
        value={formData[field as keyof typeof formData]}
        onChangeText={value => handleChange(field, value)}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );

  return (
    <View style={baseStyles.container}>
      <ScrollView
        style={baseStyles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={baseStyles.scrollContent}>
        <View style={baseStyles.pageHeader}>
          <View>
            <Text style={baseStyles.pageTitle}>Settings</Text>
            <Text style={baseStyles.pageSubtitle}>
              Manage your vendor account and preferences
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={baseStyles.tabContainer}
          style={baseStyles.tabScroll}>
          {TABS.map(renderTab)}
        </ScrollView>

        {activeTab === 'bank' ? (
          <View style={baseStyles.formCard}>
            <Text style={baseStyles.cardTitle}>Payout Bank Account</Text>
            <Text style={baseStyles.sectionSubtitle}>
              Earnings are transferred to this account within 24 hours of
              booking completion.
            </Text>

            <View style={baseStyles.verifiedBanner}>
              <FontAwesome6 solid name="check" size={14} color={EMERALD_700} />
              <Text style={baseStyles.verifiedBannerText}>
                Bank account verified and linked
              </Text>
            </View>

            <View style={baseStyles.formGrid}>
              {renderBankInput('Account Holder Name', 'accountHolder', 'Enter account holder name')}
              {renderBankInput('Account Number', 'accountNumber', 'Enter account number')}
              {renderBankInput('IFSC Code', 'ifsc', 'Enter IFSC code')}
              {renderBankInput('Bank Name', 'bankName', 'Enter bank name')}
              {renderBankInput('Branch', 'branch', 'Enter branch')}
              {renderBankInput('UPI ID', 'upiId', 'Enter UPI ID')}
            </View>

            <View style={baseStyles.reverifyBox}>
              <Text style={baseStyles.reverifyText}>
                Changing bank details requires re-verification (24–48 hours).
              </Text>
            </View>
          </View>
        ) : activeTab === 'account' ? (
          <View style={baseStyles.formCard}>
            <Text style={baseStyles.cardTitle}>Account &amp; Security</Text>

            <View style={baseStyles.accountList}>
              {ACCOUNT_ACTIONS.map(item => (
                <View key={item.id} style={baseStyles.accountRow}>
                  <View style={baseStyles.toggleRowInfo}>
                    <Text style={baseStyles.toggleRowTitle}>{item.title}</Text>
                    <Text style={baseStyles.toggleRowSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <Pressable style={baseStyles.accountActionButton}>
                    <Text style={baseStyles.accountActionButtonText}>
                      {item.actionLabel}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>

            <View style={baseStyles.dangerBox}>
              <Text style={baseStyles.dangerTitle}>Danger Zone</Text>
              <Text style={baseStyles.dangerText}>
                Deactivating your account will hide all your listings and
                cancel pending bookings.
              </Text>
              <View style={baseStyles.dangerButtons}>
                <Pressable style={baseStyles.dangerButtonOutline}>
                  <Text style={baseStyles.dangerButtonOutlineText}>
                    Deactivate Account
                  </Text>
                </Pressable>
                <Pressable style={baseStyles.dangerButtonFilled}>
                  <Text style={baseStyles.dangerButtonFilledText}>
                    Delete Account
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : activeTab === 'availability' ? (
          <View style={baseStyles.formCard}>
            <Text style={baseStyles.cardTitle}>Booking Rules</Text>

            <View style={baseStyles.autoAcceptBox}>
              <View style={baseStyles.toggleRowInfo}>
                <Text style={baseStyles.toggleRowTitle}>
                  Auto-Accept Bookings
                </Text>
                <Text style={baseStyles.toggleRowSubtitle}>
                  Automatically confirm without manual review
                </Text>
              </View>
              <Toggle
                value={autoAccept}
                onToggle={() => setAutoAccept(prev => !prev)}
              />
            </View>

            <View style={[baseStyles.formGrid, baseStyles.gridSpaced]}>
              {renderAvailInput('Min Advance Notice (hrs)', 'minNotice', true)}
              {renderAvailInput('Max Booking Advance (days)', 'maxAdvance', true)}
              {renderAvailInput('Booking Cutoff Time', 'cutoffTime')}
            </View>

            <Text style={baseStyles.prefSectionLabel}>Regular Days Off</Text>
            <View style={baseStyles.dayChipRow}>
              {DAYS_OF_WEEK.map(day => {
                const selected = daysOff.includes(day);
                return (
                  <Pressable
                    key={day}
                    onPress={() => toggleDayOff(day)}
                    style={[
                      baseStyles.dayChip,
                      selected && baseStyles.dayChipSelected,
                    ]}>
                    <Text
                      style={[
                        baseStyles.dayChipText,
                        selected && baseStyles.dayChipTextSelected,
                      ]}>
                      {day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={baseStyles.helperText}>
              Vehicles marked as unavailable on selected days.
            </Text>
          </View>
        ) : activeTab === 'notifications' ? (
          <View style={baseStyles.formCard}>
            <Text style={baseStyles.cardTitle}>Notification Preferences</Text>

            <Text style={baseStyles.prefSectionLabel}>Booking Alerts</Text>
            <View style={baseStyles.prefList}>
              <ToggleRow
                title="New Booking Request"
                subtitle="Instant alert when a customer books"
                value={notifications.newBooking}
                onToggle={() => handleNotificationChange('newBooking')}
              />
              <ToggleRow
                title="Booking Cancelled"
                subtitle="When a customer cancels a booking"
                value={notifications.bookingCancelled}
                onToggle={() => handleNotificationChange('bookingCancelled')}
              />
              <ToggleRow
                title="Payment Received"
                subtitle="Confirmation of each payout"
                value={notifications.paymentReceived}
                onToggle={() => handleNotificationChange('paymentReceived')}
              />
              <ToggleRow
                title="Document Expiry Reminders"
                subtitle="30 days before any doc expires"
                value={notifications.docExpiry}
                onToggle={() => handleNotificationChange('docExpiry')}
              />
              <ToggleRow
                title="Platform Updates"
                subtitle="Feature announcements from RideAny"
                value={notifications.platformUpdates}
                onToggle={() => handleNotificationChange('platformUpdates')}
              />
            </View>

            <View style={baseStyles.prefDivider} />

            <Text style={baseStyles.prefSectionLabel}>Channels</Text>
            <View style={baseStyles.prefList}>
              <ToggleRow
                title="SMS"
                value={notifications.sms}
                onToggle={() => handleNotificationChange('sms')}
              />
              <ToggleRow
                title="WhatsApp"
                value={notifications.whatsapp}
                onToggle={() => handleNotificationChange('whatsapp')}
              />
              <ToggleRow
                title="Email"
                value={notifications.email}
                onToggle={() => handleNotificationChange('email')}
              />
            </View>
          </View>
        ) : (
          <View style={baseStyles.formCard}>
            <Text style={baseStyles.sectionTitle}>Business Information</Text>
            <View style={baseStyles.formGrid}>
              {renderInput('Business Name', 'businessName', 'Enter business name')}
              {renderInput("Owner's Name", 'ownerName', "Enter owner's name")}
              {renderInput('Phone Number', 'phone', 'Enter phone number')}
              {renderInput('Email Address', 'email', 'Enter email', 'email')}
              {renderInput('GST Number', 'gst', 'Enter GST number')}
              {renderInput('Pin Code', 'pinCode', 'Enter pin code')}
              {renderInput('City', 'city', 'Enter city')}
              {renderInput('State', 'state', 'Enter state')}
              {renderInput('Pickup Address', 'pickupAddress', 'Enter pickup address')}
              {renderTextarea('Business Description', 'description')}
            </View>
          </View>
        )}

        <View style={baseStyles.footer}>
          <View style={getFooterContentStyle(isDesktop)}>
            <Pressable style={baseStyles.saveButton}>
              <Text style={baseStyles.saveButtonText}>Save Changes</Text>
            </Pressable>
            <Text style={baseStyles.footerNote}>Changes take effect immediately.</Text>
          </View>
        </View>
      </ScrollView>

      <Pressable style={baseStyles.helpButton}>
        <FontAwesome6 solid name="circle-question" size={22} color={WHITE} />
      </Pressable>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_50,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 120,
  },
  pageHeader: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: GRAY_900,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: GRAY_500,
  },
  tabScroll: {
    marginBottom: 32,
  },
  tabContainer: {
    paddingBottom: 8,
    gap: 8,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: GRAY_900,
  },
  tabInactive: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_200,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: WHITE,
  },
  tabTextInactive: {
    color: '#374151',
  },
  formCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: GRAY_100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GRAY_900,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GRAY_900,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: GRAY_500,
    marginBottom: 20,
  },
  verifiedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EMERALD_100,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 28,
  },
  verifiedBannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: EMERALD_700,
    marginLeft: 10,
  },
  reverifyBox: {
    backgroundColor: YELLOW_100,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 28,
  },
  reverifyText: {
    fontSize: 14,
    fontWeight: '500',
    color: AMBER_700,
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridSpaced: {
    marginBottom: 28,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: GRAY_500,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: GRAY_900,
  },
  textarea: {
    paddingTop: 14,
    minHeight: 120,
  },
  footer: {
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 32,
  },
  saveButton: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    minWidth: 160,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: GRAY_900,
  },
  footerNote: {
    fontSize: 13,
    color: GRAY_400,
  },
  prefSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: GRAY_500,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  autoAcceptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7FEE7',
    borderWidth: 1,
    borderColor: '#BEF264',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 28,
  },
  dayChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  dayChip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: GRAY_100,
  },
  dayChipSelected: {
    backgroundColor: GRAY_900,
  },
  dayChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: GRAY_700,
  },
  dayChipTextSelected: {
    color: WHITE,
  },
  helperText: {
    fontSize: 13,
    color: GRAY_500,
  },
  accountList: {
    gap: 16,
    marginBottom: 24,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GRAY_50,
    borderWidth: 1,
    borderColor: GRAY_100,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  accountActionButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GRAY_200,
    backgroundColor: WHITE,
    marginLeft: 16,
  },
  accountActionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: GRAY_900,
  },
  dangerBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 24,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  dangerText: {
    fontSize: 14,
    color: '#DC2626',
    marginBottom: 20,
  },
  dangerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  dangerButtonOutline: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: WHITE,
  },
  dangerButtonOutlineText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  dangerButtonFilled: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FECACA',
  },
  dangerButtonFilledText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  prefList: {
    gap: 8,
  },
  prefDivider: {
    height: 1,
    backgroundColor: GRAY_100,
    marginTop: 20,
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  toggleRowInfo: {
    flex: 1,
    flexShrink: 1,
    paddingRight: 16,
  },
  toggleRowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: GRAY_900,
    marginBottom: 4,
  },
  toggleRowSubtitle: {
    fontSize: 13,
    color: GRAY_500,
  },
  toggle: {
    width: 52,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: GREEN,
    alignItems: 'flex-end',
  },
  toggleOff: {
    backgroundColor: GRAY_200,
    alignItems: 'flex-start',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  helpButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    backgroundColor: GRAY_800,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});

const getFormFieldStyle = (isDesktop: boolean) => ({
  flex: 1,
  minWidth: isDesktop ? '48%' : '100%',
  maxWidth: isDesktop ? '48%' : '100%',
});

const getFormField3Style = (isDesktop: boolean) => ({
  flex: 1,
  minWidth: isDesktop ? '31%' : '100%',
  maxWidth: isDesktop ? '31%' : '100%',
});

const getFooterContentStyle = (isDesktop: boolean) => ({
  maxWidth: isDesktop ? 800 : '100%',
  marginHorizontal: 'auto' as const,
  width: '100%',
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  justifyContent: 'space-between' as const,
  gap: 16,
  flexWrap: 'wrap' as const,
});

function Toggle({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      style={[baseStyles.toggle, value ? baseStyles.toggleOn : baseStyles.toggleOff]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}>
      <View style={baseStyles.toggleKnob} />
    </Pressable>
  );
}

function ToggleRow({
  title,
  subtitle,
  value,
  onToggle,
}: {
  title: string;
  subtitle?: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={baseStyles.toggleRow}>
      <View style={baseStyles.toggleRowInfo}>
        <Text style={baseStyles.toggleRowTitle}>{title}</Text>
        {subtitle ? (
          <Text style={baseStyles.toggleRowSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      <Toggle value={value} onToggle={onToggle} />
    </View>
  );
}

export default SettingsScreen;