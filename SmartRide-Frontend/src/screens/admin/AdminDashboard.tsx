import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isSmallMobile = width < 480;

  const bookingData = [
    { day: "Mon", value: 142 },
    { day: "Tue", value: 189 },
    { day: "Wed", value: 204 },
    { day: "Thu", value: 176 },
    { day: "Fri", value: 231 },
    { day: "Sat", value: 298 },
    { day: "Sun", value: 267 },
  ];

  return (
    <View style={styles.container}>
      {isMobile && !collapsed && (
        <Pressable style={styles.overlay} onPress={() => setCollapsed(true)} />
      )}

      <AdminSidebar collapsed={collapsed} isMobile={isMobile} />

      <View style={styles.main}>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
        >
          <View
            style={[styles.dashboardTop, isMobile && styles.mobileDashboardTop]}
          >
            <View style={styles.titleContainer}>
              <Text style={[styles.title, isMobile && styles.mobileTitle]}>
                Admin Dashboard
              </Text>

              <Text style={styles.subtitle}>
                Platform overview · Last updated just now
              </Text>
            </View>

            <View
              style={[
                styles.actionButtons,
                isMobile && styles.mobileActionButtons,
              ]}
            >
              <Pressable
                style={[styles.exportButton, isMobile && styles.mobileButton]}
              >
                <Text style={styles.exportText}>Export Report</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.announcementButton,
                  isMobile && styles.mobileAnnouncementButton,
                ]}
              >
                <Text style={styles.announcementText}>+ Send Announcement</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.tabs, isMobile && styles.mobileTabs]}
          >
            <Pressable
              onPress={() => setActiveTab("Overview")}
              style={[styles.tab, activeTab === "Overview" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Overview" && styles.activeTabText,
                ]}
              >
                Overview
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("Users")}
              style={[styles.tab, activeTab === "Users" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Users" && styles.activeTabText,
                ]}
              >
                Users
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("Vendors")}
              style={[styles.tab, activeTab === "Vendors" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Vendors" && styles.activeTabText,
                ]}
              >
                Vendors
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("Bookings")}
              style={[styles.tab, activeTab === "Bookings" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Bookings" && styles.activeTabText,
                ]}
              >
                Bookings
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("Payments")}
              style={[styles.tab, activeTab === "Payments" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Payments" && styles.activeTabText,
                ]}
              >
                Payments
              </Text>
            </Pressable>
          </ScrollView>

          <View style={[styles.statsRow, isMobile && styles.mobileStatsRow]}>
            <View style={[styles.statCard, isMobile && styles.mobileStatCard]}>
              <View style={styles.statCardTop}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>+124 today</Text>
                </View>
              </View>

              <Text style={styles.statNumber}>18,432</Text>

              <Text style={styles.statLabel}>Total Users</Text>
            </View>

            <View style={[styles.statCard, isMobile && styles.mobileStatCard]}>
              <View style={styles.statCardTop}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name="storefront-outline"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.pendingBadge}>
                  <Text style={styles.pendingBadgeText}>34 pending KYC</Text>
                </View>
              </View>

              <Text style={styles.statNumber}>1,247</Text>

              <Text style={styles.statLabel}>Active Vendors</Text>
            </View>

            <View style={[styles.statCard, isMobile && styles.mobileStatCard]}>
              <View style={styles.statCardTop}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name="calendar-check-outline"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>↑ 12% vs last week</Text>
                </View>
              </View>

              <Text style={styles.statNumber}>3,891</Text>

              <Text style={styles.statLabel}>Live Bookings</Text>
            </View>

            <View style={[styles.statCard, isMobile && styles.mobileStatCard]}>
              <View style={styles.statCardTop}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name="currency-inr"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Aug 2025 (MTD)</Text>
                </View>
              </View>

              <Text style={styles.statNumber}>₹8.4L</Text>

              <Text style={styles.statLabel}>Platform Revenue</Text>
            </View>
          </View>

          <View style={isMobile ? styles.mobileBottomRow : styles.bottomRow}>
            <View
              style={[styles.bookingCard, isMobile && styles.mobileBookingCard]}
            >
              <View
                style={[
                  styles.bookingHeader,
                  isSmallMobile && styles.smallMobileBookingHeader,
                ]}
              >
                <View>
                  <Text style={styles.bookingTitle}>Booking Volume</Text>

                  <Text style={styles.bookingSubtitle}>This week · Daily</Text>
                </View>

                <View style={styles.bookingTotal}>
                  <Text style={styles.totalNumber}>1,507</Text>

                  <Text style={styles.totalChange}>+18% vs last week</Text>
                </View>
              </View>

              <View style={[styles.chart, isMobile && styles.mobileChart]}>
                {bookingData.map((item) => (
                  <View
                    style={[
                      styles.barColumn,
                      isMobile && styles.mobileBarColumn,
                    ]}
                    key={item.day}
                  >
                    <Text
                      style={[
                        styles.barValue,
                        isSmallMobile && styles.smallMobileBarValue,
                      ]}
                    >
                      {item.value}
                    </Text>

                    <View
                      style={[
                        styles.bar,
                        {
                          height: (item.value / 298) * (isMobile ? 130 : 150),
                        },
                        item.day === "Sat" && styles.activeBar,
                      ]}
                    />

                    <Text
                      style={[
                        styles.dayText,
                        isSmallMobile && styles.smallMobileDayText,
                      ]}
                    >
                      {item.day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={[styles.healthCard, isMobile && styles.mobileHealthCard]}
            >
              <Text style={styles.healthTitle}>Platform Health</Text>

              <View style={styles.healthItem}>
                <View style={styles.healthItemHeader}>
                  <Text style={styles.healthLabel}>API Uptime</Text>

                  <Text style={styles.healthValue}>99.97%</Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      styles.apiFill,
                      { width: "99.97%" },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.healthItem}>
                <View style={styles.healthItemHeader}>
                  <Text style={styles.healthLabel}>Payment Success</Text>

                  <Text style={styles.healthValue}>98.4%</Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      styles.paymentFill,
                      { width: "98.4%" },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.healthItem}>
                <View style={styles.healthItemHeader}>
                  <Text style={styles.healthLabel}>Booking Fulfillment</Text>

                  <Text style={styles.healthValue}>96.1%</Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      styles.bookingFill,
                      { width: "96.1%" },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.healthItem}>
                <View style={styles.healthItemHeader}>
                  <Text style={styles.healthLabel}>Driver Acceptance</Text>

                  <Text style={styles.healthValue}>88.2%</Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      styles.driverFill,
                      { width: "88.2%" },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.systemStatus}>
                <View style={styles.statusDot} />

                <Text style={styles.statusText}>All systems operational</Text>
              </View>
            </View>
          </View>

          <View
            style={[styles.pendingSection, isMobile && styles.mobileSection]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Pending Actions</Text>

                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>3</Text>
                </View>
              </View>

              <Text style={styles.viewAllText}>View all →</Text>
            </View>

            <View
              style={[styles.pendingCard, isMobile && styles.mobilePendingCard]}
            >
              <View style={styles.pendingLeft}>
                <View style={styles.actionIcon}>
                  <MaterialCommunityIcons
                    name="office-building-outline"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.pendingTextContainer}>
                  <Text style={styles.actionTitle}>RideMax Fleet Co.</Text>

                  <Text style={styles.actionSubtitle}>
                    KYC submitted · 4 vehicles · 2h ago
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.pendingButtons,
                  isMobile && styles.mobilePendingButtons,
                ]}
              >
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>Vendor</Text>
                </View>

                <Pressable style={styles.greenActionButton}>
                  <Text style={styles.greenActionText}>Verify</Text>
                </Pressable>

                <Pressable style={styles.rejectButton}>
                  <Text style={styles.rejectText}>Reject</Text>
                </Pressable>
              </View>
            </View>

            <View
              style={[styles.pendingCard, isMobile && styles.mobilePendingCard]}
            >
              <View style={styles.pendingLeft}>
                <View style={styles.actionIcon}>
                  <MaterialCommunityIcons
                    name="car-outline"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.pendingTextContainer}>
                  <Text style={styles.actionTitle}>Volvo B11R Bus</Text>

                  <Text style={styles.actionSubtitle}>
                    By SkyTours Pvt. Ltd. · 4h ago
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.pendingButtons,
                  isMobile && styles.mobilePendingButtons,
                ]}
              >
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>Vehicle</Text>
                </View>

                <Pressable style={styles.greenActionButton}>
                  <Text style={styles.greenActionText}>Approve</Text>
                </Pressable>

                <Pressable style={styles.rejectButton}>
                  <Text style={styles.rejectText}>Reject</Text>
                </Pressable>
              </View>
            </View>

            <View
              style={[styles.pendingCard, isMobile && styles.mobilePendingCard]}
            >
              <View style={styles.pendingLeft}>
                <View style={styles.actionIcon}>
                  <MaterialCommunityIcons
                    name="scale-balance"
                    size={24}
                    color="#090B0A"
                  />
                </View>

                <View style={styles.pendingTextContainer}>
                  <Text style={styles.actionTitle}>
                    BK-0812 — Damage Dispute
                  </Text>

                  <Text style={styles.actionSubtitle}>
                    Customer vs GoWheels · 1d ago
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.pendingButtons,
                  isMobile && styles.mobilePendingButtons,
                ]}
              >
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>Complaint</Text>
                </View>

                <Pressable style={styles.greenActionButton}>
                  <Text style={styles.greenActionText}>Resolve</Text>
                </Pressable>

                <Pressable style={styles.rejectButton}>
                  <Text style={styles.rejectText}>Reject</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={[styles.recentSection, isMobile && styles.mobileSection]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Users</Text>

              <Text style={styles.viewAllText}>Manage users →</Text>
            </View>

            <ResponsiveTable isMobile={isMobile}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>NAME</Text>

                <Text style={styles.tableHeaderText}>ROLE</Text>

                <Text style={styles.tableHeaderText}>JOINED</Text>

                <Text style={styles.tableHeaderText}>STATUS</Text>

                <Text style={styles.tableHeaderText}>BOOKINGS</Text>

                <View style={styles.tableHeaderAction} />
              </View>

              <View style={styles.userRow}>
                <View style={styles.userNameCell}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>P</Text>
                  </View>

                  <Text style={styles.userName}>Priya Menon</Text>
                </View>

                <View style={styles.roleBadge}>
                  <Text style={styles.roleBadgeText}>Customer</Text>
                </View>

                <Text style={styles.tableText}>Aug 11, 2025</Text>

                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>

                <Text style={styles.bookingCount}>3</Text>

                <Text style={styles.viewText}>View</Text>
              </View>

              <View style={styles.userRow}>
                <View style={styles.userNameCell}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>R</Text>
                  </View>

                  <Text style={styles.userName}>Rahul Gupta</Text>
                </View>

                <View style={styles.vendorBadge}>
                  <Text style={styles.vendorBadgeText}>Vendor</Text>
                </View>

                <Text style={styles.tableText}>Aug 10, 2025</Text>

                <View style={styles.pendingUserBadge}>
                  <Text style={styles.pendingUserBadgeText}>Pending KYC</Text>
                </View>

                <Text style={styles.bookingCount}>0</Text>

                <Text style={styles.viewText}>View</Text>
              </View>

              <View style={styles.userRow}>
                <View style={styles.userNameCell}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>S</Text>
                  </View>

                  <Text style={styles.userName}>Suresh K.</Text>
                </View>

                <View style={styles.driverBadge}>
                  <Text style={styles.driverBadgeText}>Driver</Text>
                </View>

                <Text style={styles.tableText}>Aug 10, 2025</Text>

                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>

                <Text style={styles.bookingCount}>12</Text>

                <Text style={styles.viewText}>View</Text>
              </View>

              <View style={styles.userRow}>
                <View style={styles.userNameCell}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>M</Text>
                  </View>

                  <Text style={styles.userName}>Meena Sharma</Text>
                </View>

                <View style={styles.roleBadge}>
                  <Text style={styles.roleBadgeText}>Customer</Text>
                </View>

                <Text style={styles.tableText}>Aug 9, 2025</Text>

                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>

                <Text style={styles.bookingCount}>1</Text>

                <Text style={styles.viewText}>View</Text>
              </View>

              <View style={styles.userRow}>
                <View style={styles.userNameCell}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>V</Text>
                  </View>

                  <Text style={styles.userName}>Vikram Nair</Text>
                </View>

                <View style={styles.vendorBadge}>
                  <Text style={styles.vendorBadgeText}>Vendor</Text>
                </View>

                <Text style={styles.tableText}>Aug 8, 2025</Text>

                <View style={styles.suspendedBadge}>
                  <Text style={styles.suspendedBadgeText}>Suspended</Text>
                </View>

                <Text style={styles.bookingCount}>0</Text>

                <Text style={styles.viewText}>View</Text>
              </View>
            </ResponsiveTable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function ResponsiveTable({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: React.ReactNode;
}) {
  if (isMobile) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.mobileUsersTable}>{children}</View>
      </ScrollView>
    );
  }

  return <View style={styles.usersTable}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
  },

  main: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },

  scrollArea: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#F7F7F5",
  },

  scrollContent: {
    paddingBottom: 50,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 5,
  },

  dashboardTop: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mobileDashboardTop: {
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },

  titleContainer: {
    flexShrink: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#090B0A",
  },

  mobileTitle: {
    fontSize: 26,
  },

  subtitle: {
    fontSize: 16,
    color: "#687084",
    marginTop: 6,
  },

  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  mobileActionButtons: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  exportButton: {
    height: 54,
    paddingHorizontal: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E1E3E6",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileButton: {
    height: 48,
    paddingHorizontal: 20,
  },

  exportText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#465064",
  },

  announcementButton: {
    height: 54,
    paddingHorizontal: 27,
    borderRadius: 28,
    backgroundColor: "#B5ED19",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileAnnouncementButton: {
    height: 50,
    paddingHorizontal: 22,
  },

  announcementText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#090B0A",
  },

  tabs: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 30,
  },

  mobileTabs: {
    paddingHorizontal: 20,
  },

  tab: {
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E2E5",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: "#090B0A",
    borderColor: "#090B0A",
  },

  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#465064",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingHorizontal: 30,
    marginTop: 36,
  },

  mobileStatsRow: {
    flexDirection: "column",
    paddingHorizontal: 20,
    gap: 20,
  },

  statCard: {
    flexGrow: 1,
    flexBasis: 220,
    minWidth: 200,
    height: 170,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
  },

  mobileStatCard: {
    width: "100%",
    minWidth: 0,
    flexBasis: "auto",
  },

  statCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F2EF",
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    backgroundColor: "#E9FBF3",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  badgeText: {
    color: "#00A878",
    fontSize: 13,
    fontWeight: "500",
  },

  pendingBadge: {
    backgroundColor: "#FFF8E6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  pendingBadgeText: {
    color: "#F28C00",
    fontSize: 13,
    fontWeight: "500",
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: "#090B0A",
    marginTop: 18,
  },

  statLabel: {
    fontSize: 14,
    color: "#687084",
    marginTop: 5,
  },

  bottomRow: {
    flexDirection: "row",
    gap: 30,
    paddingHorizontal: 30,
    marginTop: 30,
  },

  mobileBottomRow: {
    flexDirection: "column",
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  bookingCard: {
    flex: 2,
    height: 365,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 0,
    overflow: "hidden",
  },
  mobileBookingCard: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    height: 390,
    alignSelf: "stretch",
    marginBottom: 0,
  },

  healthCard: {
    flex: 1,
    height: 365,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
  },

  mobileHealthCard: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    height: 365,
    alignSelf: "stretch",
  },

  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 32,
    paddingTop: 26,
    paddingBottom: 8,
  },

  smallMobileBookingHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 6,
  },

  bookingTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#090B0A",
  },

  bookingSubtitle: {
    fontSize: 15,
    color: "#687084",
    marginTop: 7,
  },

  bookingTotal: {
    alignItems: "flex-end",
  },

  totalNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: "#090B0A",
  },

  totalChange: {
    fontSize: 14,
    color: "#00A878",
    marginTop: 4,
  },

  chart: {
    height: 245,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 5,
  },

  mobileChart: {
    height: 230,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  barColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 220,
    marginHorizontal: 4,
  },

  mobileBarColumn: {
    flex: 1,
    height: 180,
    marginHorizontal: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  barValue: {
    fontSize: 14,
    color: "#8A91A0",
    marginBottom: 8,
  },

  smallMobileBarValue: {
    fontSize: 11,
    marginBottom: 6,
  },

  bar: {
    width: "90%",
    backgroundColor: "#E3E3E0",
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },

  activeBar: {
    backgroundColor: "#B5ED19",
  },

  dayText: {
    fontSize: 14,
    color: "#8A91A0",
    marginTop: 10,
  },

  smallMobileDayText: {
    fontSize: 12,
    marginTop: 6,
  },

  healthTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#090B0A",
    padding: 26,
  },

  healthItem: {
    paddingHorizontal: 26,
    marginBottom: 20,
  },

  healthItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  healthLabel: {
    fontSize: 14,
    color: "#687084",
  },

  healthValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#090B0A",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E8EAE7",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  apiFill: {
    backgroundColor: "#00B77A",
  },

  paymentFill: {
    backgroundColor: "#B5ED19",
  },

  bookingFill: {
    backgroundColor: "#3D82F6",
  },

  driverFill: {
    backgroundColor: "#FF8500",
  },

  systemStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 2,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#ECEDEB",
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#5DD3AA",
    marginRight: 9,
  },

  statusText: {
    fontSize: 13,
    color: "#687084",
    fontWeight: "500",
  },

  pendingSection: {
    paddingHorizontal: 30,
    marginTop: 36,
  },

  recentSection: {
    paddingHorizontal: 30,
    marginTop: 36,
  },

  mobileSection: {
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#090B0A",
  },

  countBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFE3E5",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  countBadgeText: {
    color: "#F04444",
    fontSize: 13,
    fontWeight: "700",
  },

  viewAllText: {
    color: "#8A91A0",
    fontSize: 14,
  },

  pendingCard: {
    minHeight: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mobilePendingCard: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
  },

  pendingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F1F2EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  pendingTextContainer: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#090B0A",
  },

  actionSubtitle: {
    fontSize: 14,
    color: "#8A91A0",
    marginTop: 4,
  },

  pendingButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  mobilePendingButtons: {
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  typeBadge: {
    backgroundColor: "#F3F3F4",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  typeBadgeText: {
    fontSize: 14,
    color: "#687084",
  },

  greenActionButton: {
    backgroundColor: "#B5ED19",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },

  greenActionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#090B0A",
  },

  rejectButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E2E5",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },

  rejectText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#465064",
  },
  usersTable: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
  },

  mobileUsersTable: {
    width: 900,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
  },

  tableHeader: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEDEB",
  },

  tableHeaderText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#8A91A0",
  },

  tableHeaderAction: {
    flex: 1,
  },

  roleColumn: {
    flex: 1,
    alignItems: "flex-start",
  },

  statusColumn: {
    flex: 1,
    alignItems: "flex-start",
  },

  userRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1EF",
  },

  userNameCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6E7E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  userAvatarText: {
    fontSize: 14,
    color: "#687084",
    fontWeight: "600",
  },

  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#090B0A",
  },

  tableText: {
    flex: 1,
    fontSize: 14,
    color: "#687084",
  },

  bookingCount: {
    flex: 1,
    fontSize: 15,
    color: "#687084",
    textAlign: "center",
  },

  viewText: {
    flex: 1,
    fontSize: 14,
    color: "#8A91A0",
    textAlign: "center",
  },

  roleBadge: {
    flex: 1,
    alignItems: "flex-start",
  },

  roleBadgeText: {
    backgroundColor: "#EAF8C9",
    color: "#608000",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  vendorBadge: {
    flex: 1,
    alignItems: "flex-start",
  },

  vendorBadgeText: {
    backgroundColor: "#DCE9FF",
    color: "#2864C7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  driverBadge: {
    flex: 1,
    alignItems: "flex-start",
  },

  driverBadgeText: {
    backgroundColor: "#F4E1D8",
    color: "#D48920",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  activeBadge: {
    flex: 1,
    alignItems: "flex-start",
  },

  activeBadgeText: {
    backgroundColor: "#D8F7EA",
    color: "#009B68",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  pendingUserBadge: {
    flex: 1,
    alignItems: "flex-start",
  },

  pendingUserBadgeText: {
    backgroundColor: "#FFF0BE",
    color: "#D77A00",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  suspendedBadge: {
    flex: 1,
    alignItems: "flex-start",
  },

  suspendedBadgeText: {
    backgroundColor: "#F8D0D0",
    color: "#E55555",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "600",
  },
});
