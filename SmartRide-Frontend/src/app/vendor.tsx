import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import RideAnyNavbar from "../components/RideAnyNavbar";

const VendorNavbar = RideAnyNavbar as React.ComponentType<
  React.PropsWithChildren<{
    role: string;
    onNavigate: (page: string) => void;
    onRoleChange: (newRole: any) => void;
    onSignOut: () => void;
  }>
>;

const vehicles = [
  {
    name: "Innova Crysta 2023",
    number: "KA-01-AB-1234",
    price: "₹2,300/day",
    rating: "4.8",
    trips: "47 trips",
    status: "On Rent",
    statusColor: "#2879F6",
    image:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800",
  },
  {
    name: "Swift Dzire Tour",
    number: "KA-01-CD-5678",
    price: "₹999/day",
    rating: "4.7",
    trips: "91 trips",
    status: "Available",
    statusColor: "#18B981",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
  },
  {
    name: "Honda City 4th Gen",
    number: "KA-01-EF-9012",
    price: "₹1,100/day",
    rating: "4.6",
    trips: "58 trips",
    status: "Maintenance",
    statusColor: "#F59E0B",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
  },
  {
    name: "Mahindra Thar LX",
    number: "KA-01-GH-3456",
    price: "₹1,950/day",
    rating: "4.9",
    trips: "33 trips",
    status: "Available",
    statusColor: "#18B981",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
  },
];

export default function VendorDashboard() {
  const { width } = useWindowDimensions();

  const isMobile = width < 700;
  const isTablet = width >= 700 && width < 1100;

  const vehicleColumns = isMobile ? 1 : isTablet ? 1 : 2;

  return (
    <VendorNavbar
      role="vendor"
      onNavigate={(page: string) => {
        console.log("Vendor page:", page);
      }}
      onRoleChange={(newRole) => {
        console.log("Role changed:", newRole);
      }}
      onSignOut={() => {
        console.log("Sign out");
      }}
    >
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View
          style={[
            styles.header,
            isMobile && styles.mobileHeader,
          ]}
        >
          <View>
            <Text style={styles.title}>
              Vendor Dashboard
            </Text>

            <Text style={styles.subtitle}>
              GoWheels Rentals · KYC Verified ✓
            </Text>
          </View>

          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>
              + Add Vehicle
            </Text>
          </Pressable>
        </View>

        {/* STATS */}
        <View
          style={[
            styles.stats,
            isMobile && styles.statsMobile,
          ]}
        >
          <StatCard
            icon="car-outline"
            value="4"
            label="Total Vehicles"
            badge="2 on rent"
          />

          <StatCard
            dark
            icon="card-outline"
            value="₹29,400"
            label="This Month"
            badge="+14% vs last"
          />

          <StatCard
            icon="time-outline"
            value="2"
            label="Pending Requests"
            badge="Needs action"
          />

          <StatCard
            icon="star-outline"
            value="4.8★"
            label="Avg. Rating"
            badge="229 reviews"
          />
        </View>

        {/* MAIN DASHBOARD */}
        <View
          style={[
            styles.mainGrid,
            isMobile && styles.mobileMainGrid,
          ]}
        >
          {/* EARNINGS */}
          <View style={styles.earningsCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>
                  Monthly Earnings
                </Text>

                <Text style={styles.cardSubtitle}>
                  Mar – Aug 2025
                </Text>
              </View>

              <View style={styles.earningsTotal}>
                <Text style={styles.totalValue}>
                  ₹2,45,100
                </Text>

                <Text style={styles.ytd}>
                  +18% YTD
                </Text>
              </View>
            </View>

            <EarningsChart />
          </View>

          {/* FLEET UTILIZATION */}
          <View style={styles.utilizationCard}>
            <Text style={styles.cardTitle}>
              Fleet Utilization
            </Text>

            <ProgressRow
              label="On Rent"
              value="1/4"
              percent={25}
              type="blue"
            />

            <ProgressRow
              label="Available"
              value="2/4"
              percent={50}
              type="green"
            />

            <ProgressRow
              label="Maintenance"
              value="1/4"
              percent={25}
              type="orange"
            />

            <View style={styles.overall}>
              <Text style={styles.overallLabel}>
                Overall utilization
              </Text>

              <Text style={styles.overallValue}>
                75%
              </Text>
            </View>
          </View>
        </View>

        {/* PENDING APPROVAL */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>
              Pending Approval
            </Text>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>2</Text>
            </View>
          </View>

          <ApprovalCard
            name="Rohan Kapoor"
            car="Innova Crysta · Aug 15–18"
            id="BK-0887 · Requested 2 hours ago"
            price="₹6,900"
          />

          <ApprovalCard
            name="Sneha Joshi"
            car="Swift Dzire · Aug 16–17"
            id="BK-0889 · Requested 45 min ago"
            price="₹999"
          />
        </View>

        {/* MY FLEET */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>
              My Fleet
            </Text>

            <Pressable>
              <Text style={styles.manage}>
                Manage all →
              </Text>
            </Pressable>
          </View>

          <View style={styles.vehicleGrid}>
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.number}
                vehicle={vehicle}
                columns={vehicleColumns}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </VendorNavbar>
  );
}

function StatCard({
  icon,
  value,
  label,
  badge,
  dark = false,
}: {
  icon: string;
  value: string;
  label: string;
  badge: string;
  dark?: boolean;
}) {
  return (
    <View
      style={[
        styles.statCard,
        dark && styles.darkStatCard,
      ]}
    >
      <View style={styles.statTop}>
        <Ionicons
          name={icon}
          size={25}
          color={dark ? "#FFFFFF" : "#111111"}
        />

        <View
          style={[
            styles.statBadge,
            dark && styles.darkBadge,
          ]}
        >
          <Text
            style={[
              styles.statBadgeText,
              dark && styles.darkBadgeText,
            ]}
          >
            {badge}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.statValue,
          dark && styles.darkText,
        ]}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.statLabel,
          dark && styles.darkSubText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function EarningsChart() {
  const bars = [
    ["₹34k", 55, "Mar"],
    ["₹42k", 68, "Apr"],
    ["₹39k", 62, "May"],
    ["₹52k", 88, "Jun"],
    ["₹49k", 78, "Jul"],
    ["₹29k", 45, "Aug"],
  ];

  return (
    <View style={styles.chart}>
      {bars.map(([value, height, month], index) => (
        <View
          key={month}
          style={styles.barColumn}
        >
          <Text style={styles.barValue}>
            {value}
          </Text>

          <View style={styles.barArea}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Number(height)}%`,
                  backgroundColor:
                    index === bars.length - 1
                      ? "#B4EC17"
                      : "#E3E3E0",
                },
              ]}
            />
          </View>

          <Text style={styles.month}>
            {month}
          </Text>
        </View>
      ))}
    </View>
  );
}

function ProgressRow({
  label,
  value,
  percent,
  type,
}: {
  label: string;
  value: string;
  percent: number;
  type: "blue" | "green" | "orange";
}) {
  const color =
    type === "blue"
      ? "#2879F6"
      : type === "green"
      ? "#B4EC17"
      : "#F59E0B";

  return (
    <View style={styles.progressRow}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>
          {label}
        </Text>

        <Text style={styles.progressValue}>
          {value}
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${percent}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

function ApprovalCard({
  name,
  car,
  id,
  price,
}: {
  name: string;
  car: string;
  id: string;
  price: string;
}) {
  return (
    <View style={styles.approvalCard}>
      <View style={styles.approvalInfo}>
        <Text style={styles.approvalName}>
          {name}
        </Text>

        <Text style={styles.approvalCar}>
          {car}
        </Text>

        <Text style={styles.approvalId}>
          {id}
        </Text>
      </View>

      <View style={styles.approvalActions}>
        <Text style={styles.approvalPrice}>
          {price}
        </Text>

        <Pressable style={styles.acceptButton}>
          <Text style={styles.acceptText}>
            Accept
          </Text>
        </Pressable>

        <Pressable style={styles.declineButton}>
          <Text style={styles.declineText}>
            Decline
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function VehicleCard({
  vehicle,
  columns,
}: {
  vehicle: (typeof vehicles)[number];
  columns: number;
}) {
  return (
    <View style={styles.vehicleCard}>
      <Image
        source={{ uri: vehicle.image }}
        style={styles.vehicleImage}
      />

      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleTop}>
          <View style={styles.vehicleNameArea}>
            <Text style={styles.vehicleName}>
              {vehicle.name}
            </Text>

            <Text style={styles.vehicleNumber}>
              {vehicle.number}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  vehicle.status === "On Rent"
                    ? "#DCE8FF"
                    : vehicle.status === "Maintenance"
                    ? "#FFF0C7"
                    : "#D6F8E9",
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: vehicle.statusColor,
                },
              ]}
            >
              {vehicle.status}
            </Text>
          </View>
        </View>

        <View style={styles.vehicleBottom}>
          <Text style={styles.vehiclePrice}>
            {vehicle.price}
          </Text>

          <Text style={styles.rating}>
            ★ {vehicle.rating} · {vehicle.trips}
          </Text>
        </View>

        <View style={styles.vehicleActions}>
          <Pressable style={styles.smallButton}>
            <Text style={styles.smallButtonText}>
              Edit
            </Text>
          </Pressable>

          <Pressable style={styles.smallButton}>
            <Text style={styles.smallButtonText}>
              Availability
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  pageContent: {
    padding: 24,
    paddingBottom: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  mobileHeader: {
    alignItems: "flex-start",
    flexDirection: "column",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#080808",
  },

  subtitle: {
    fontSize: 17,
    color: "#657083",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#B4EC17",
    paddingHorizontal: 26,
    paddingVertical: 15,
    borderRadius: 28,
    marginTop: 5,
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#080808",
  },

  stats: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 28,
  },

  statsMobile: {
    flexDirection: "column",
  },

  statCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
  },

  darkStatCard: {
    backgroundColor: "#0B0D0C",
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statBadge: {
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  darkBadge: {
    backgroundColor: "#2D4400",
  },

  statBadgeText: {
    fontSize: 13,
    color: "#9CA3AF",
  },

  darkBadgeText: {
    color: "#B4EC17",
  },

  statValue: {
    fontSize: 31,
    fontWeight: "800",
    color: "#080808",
    marginTop: 22,
  },

  darkText: {
    color: "#FFFFFF",
  },

  statLabel: {
    fontSize: 15,
    color: "#657083",
    marginTop: 4,
  },

  darkSubText: {
    color: "#A8AFBC",
  },

  mainGrid: {
    flexDirection: "row",
    gap: 22,
    marginBottom: 30,
  },

  mobileMainGrid: {
    flexDirection: "column",
  },

  earningsCard: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 28,
    minWidth: 0,
  },

  utilizationCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 28,
    minWidth: 260,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#080808",
  },

  cardSubtitle: {
    fontSize: 15,
    color: "#8A92A1",
    marginTop: 5,
  },

  earningsTotal: {
    alignItems: "flex-end",
  },

  totalValue: {
    fontSize: 29,
    fontWeight: "800",
    color: "#080808",
  },

  ytd: {
    color: "#00A878",
    fontSize: 14,
    marginTop: 3,
  },

  chart: {
    height: 220,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },

  barColumn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  barValue: {
    color: "#8A92A1",
    fontSize: 13,
    marginBottom: 7,
  },

  barArea: {
    height: 150,
    width: "60%",
    justifyContent: "flex-end",
  },

  bar: {
    width: "100%",
    borderRadius: 11,
  },

  month: {
    color: "#8A92A1",
    fontSize: 14,
    marginTop: 8,
  },

  progressRow: {
    marginTop: 25,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  progressLabel: {
    color: "#657083",
    fontSize: 15,
  },

  progressValue: {
    color: "#111111",
    fontWeight: "700",
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 10,
  },

  overall: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    marginTop: 25,
    paddingTop: 20,
  },

  overallLabel: {
    color: "#8A92A1",
    fontSize: 14,
  },

  overallValue: {
    fontSize: 31,
    fontWeight: "800",
    marginTop: 7,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#080808",
  },

  countBadge: {
    backgroundColor: "#FFF0C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginLeft: 8,
  },

  countText: {
    color: "#F59E0B",
    fontWeight: "800",
  },

  manage: {
    color: "#8A92A1",
    fontSize: 14,
  },

  approvalCard: {
    backgroundColor: "#FFFBEF",
    borderWidth: 1,
    borderColor: "#F1D77C",
    borderRadius: 20,
    padding: 22,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  approvalInfo: {
    flex: 1,
    minWidth: 0,
  },

  approvalName: {
    fontSize: 18,
    fontWeight: "800",
  },

  approvalCar: {
    color: "#657083",
    fontSize: 15,
    marginTop: 5,
  },

  approvalId: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 5,
  },

  approvalActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginLeft: 20,
  },

  approvalPrice: {
    fontSize: 20,
    fontWeight: "800",
  },

  acceptButton: {
    backgroundColor: "#B4EC17",
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  acceptText: {
    fontWeight: "800",
  },

  declineButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },

  declineText: {
    color: "#657083",
    fontWeight: "600",
  },

  vehicleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
  },

  vehicleCard: {
    width: "48%",
    minWidth: 360,
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
  },

  vehicleImage: {
    width: 145,
    height: 165,
  },

  vehicleInfo: {
    flex: 1,
    padding: 17,
    minWidth: 0,
  },

  vehicleTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  vehicleNameArea: {
    flex: 1,
    minWidth: 0,
  },

  vehicleName: {
    fontSize: 17,
    fontWeight: "800",
  },

  vehicleNumber: {
    color: "#8A92A1",
    fontSize: 14,
    marginTop: 4,
  },

  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  vehicleBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },

  vehiclePrice: {
    color: "#657083",
    fontSize: 14,
  },

  rating: {
    color: "#657083",
    fontSize: 13,
  },

  vehicleActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  smallButton: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  smallButtonText: {
    fontSize: 13,
    color: "#222222",
  },
});