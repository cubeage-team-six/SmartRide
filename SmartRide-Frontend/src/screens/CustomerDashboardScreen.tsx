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
import AppShell from "../components/AppShell";
import { useCustomerProfile } from "../context/CustomerProfileContext";
import type { DashboardScreenProps } from "../types";

/* =========================================================
   COLORS
========================================================= */

const BLACK = "#090B0A";
const WHITE = "#FFFFFF";
const LIME = "#B7F000";
const BG = "#F7F7F5";
const MUTED = "#8A93A3";
const BORDER = "#E6E7E9";

/* =========================================================
   DATA
========================================================= */

const recentBookings = [
  {
    name: "Honda Activa 6G",
    date: "Aug 8–9, 2025 · BK-0856",
    status: "Completed",
    amount: "₹498",
  },
  {
    name: "Toyota Innova Crysta",
    date: "Jul 22–26, 2025 · BK-0812",
    status: "Completed",
    amount: "₹9,200",
  },
  {
    name: "Tata Ace Mini Truck",
    date: "Jul 5, 2025 · BK-0790",
    status: "Cancelled",
    amount: "₹1,499",
  },
];

const recommendedVehicles = [
  {
    name: "Swift Dzire",
    type: "Sedan",
    price: "₹799/day",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Royal Enfield Classic",
    type: "Bike",
    price: "₹649/day",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Force Traveller",
    type: "Bus · 17-seater",
    price: "₹3,200/day",
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=85",
  },
];

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  badge,
  value,
  label,
}: {
  icon: string;
  badge: string;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTopRow}>
        <View style={styles.statIcon}>
          <Ionicons name={icon} size={24} color={BLACK} />
        </View>

        <View style={styles.statBadge}>
          <Text style={styles.statBadgeText}>{badge}</Text>
        </View>
      </View>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* =========================================================
   ACTIVE BOOKING CARD
========================================================= */

function ActiveBookingCard({
  onDetails,
  onTrack,
}: {
  onDetails: () => void;
  onTrack: () => void;
}) {
  return (
    <View style={styles.activeBookingCard}>
      {/* IMAGE */}

      <View style={styles.activeImageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85",
          }}
          style={styles.activeImage}
          resizeMode="cover"
        />
      </View>

      {/* DETAILS */}

      <View style={styles.activeDetails}>
        <View style={styles.bookingTopRow}>
          <View style={styles.bookingHeading}>
            <Text style={styles.bookingId}>
              BK-2024-0871
            </Text>

            <Text style={styles.bookingVehicle}>
              Mahindra Thar LX
            </Text>

            <Text style={styles.bookingDescription}>
              SUV · 4WD · GoWheels Rental, Bangalore
            </Text>
          </View>

          <View style={styles.confirmedBadge}>
            <Text style={styles.confirmedText}>
              Confirmed
            </Text>
          </View>
        </View>

        {/* BOOKING INFO */}

        <View style={styles.bookingInfoRow}>
          <View style={styles.bookingInfo}>
            <Text style={styles.bookingInfoLabel}>
              Pickup
            </Text>

            <Text style={styles.bookingInfoValue}>
              Aug 14, 2025
            </Text>
          </View>

          <View style={styles.bookingInfo}>
            <Text style={styles.bookingInfoLabel}>
              Return
            </Text>

            <Text style={styles.bookingInfoValue}>
              Aug 17, 2025
            </Text>
          </View>

          <View style={styles.bookingInfo}>
            <Text style={styles.bookingInfoLabel}>
              Amount
            </Text>

            <Text style={styles.bookingInfoValue}>
              ₹5,850
            </Text>
          </View>
        </View>

        {/* BUTTONS */}

        <View style={styles.bookingButtons}>
          <Pressable
            style={styles.outlineButton}
            onPress={onDetails}
          >
            <Text style={styles.outlineButtonText}>
              View Details
            </Text>
          </Pressable>

          <Pressable
            style={styles.outlineButton}
            onPress={onTrack}
          >
            <Ionicons
              name="location-outline"
              size={17}
              color={BLACK}
            />

            <Text style={styles.outlineButtonText}>
              Track Vehicle
            </Text>
          </Pressable>

          <Pressable style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* =========================================================
   RECENT BOOKINGS
========================================================= */

function RecentBookings() {
  return (
    <View style={styles.recentCard}>
      {recentBookings.map((booking, index) => {
        const isCancelled = booking.status === "Cancelled";

        return (
          <View
            key={booking.name}
            style={[
              styles.recentRow,
              index === recentBookings.length - 1 && styles.recentRowLast,
            ]}
          >
            <View style={styles.recentInfo}>
              <Text style={styles.recentName}>
                {booking.name}
              </Text>

              <Text style={styles.recentDate}>
                {booking.date}
              </Text>
            </View>

            <View style={styles.recentRight}>
              <View
                style={[
                  styles.statusBadge,
                  isCancelled && styles.cancelledBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    isCancelled && styles.cancelledText,
                  ]}
                >
                  {booking.status}
                </Text>
              </View>

              <Text style={styles.recentAmount}>
                {booking.amount}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* =========================================================
   RECOMMENDED VEHICLES
========================================================= */

function RecommendedVehicles({
  onBrowse,
}: {
  onBrowse: () => void;
}) {
  return (
    <View style={styles.recommendedContainer}>
      {recommendedVehicles.map((vehicle) => (
        <Pressable
          key={vehicle.name}
          onPress={onBrowse}
          style={styles.recommendedCard}
        >
          <Image
            source={{ uri: vehicle.image }}
            style={styles.recommendedImage}
            resizeMode="cover"
          />

          <View style={styles.recommendedInfo}>
            <Text style={styles.recommendedName}>
              {vehicle.name}
            </Text>

            <Text style={styles.recommendedType}>
              {vehicle.type}
            </Text>
          </View>

          <View style={styles.recommendedPrice}>
            <Text style={styles.priceText}>
              {vehicle.price}
            </Text>

            <View style={styles.ratingRow}>
              <Ionicons
                name="star"
                size={14}
                color={LIME}
              />

              <Text style={styles.ratingText}>
                {vehicle.rating}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}

      {/* Mobile fallback button */}
      <Pressable
        style={styles.browseAllButton}
        onPress={onBrowse}
      >
        <Text style={styles.browseAllText}>
          Browse all
        </Text>

        <Ionicons
          name="arrow-forward"
          size={17}
          color={MUTED}
        />
      </Pressable>
    </View>
  );
}

/* =========================================================
   MAIN DASHBOARD SCREEN
========================================================= */

export default function CustomerDashboardScreen({ navigation }: DashboardScreenProps) {
  const { width } = useWindowDimensions();
  const { profile } = useCustomerProfile();

  const isMobile = width < 700;
  const isTablet = width >= 700 && width < 1100;

  const firstName = profile.fullName ? profile.fullName.split(" ")[0] : "Arjun";

  return (
    <AppShell placeholder="Search...">
      <View style={styles.page}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            isMobile && styles.scrollContentMobile,
          ]}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {/* =================================================
              WELCOME HEADER
          ================================================= */}

          <View
            style={[
              styles.welcomeRow,
              isMobile && styles.welcomeRowMobile,
            ]}
          >
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeTitle}>
                Good morning, {firstName}
              </Text>

              <Text style={styles.dateText}>
                Monday, August 11, 2025
              </Text>
            </View>

            <Pressable
              style={styles.bookVehicleButton}
              onPress={() => navigation.navigate("Browse")}
            >
              <Text style={styles.bookVehicleText}>
                + Book a Vehicle
              </Text>
            </Pressable>
          </View>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <View
            style={[
              styles.statsGrid,
              isMobile && styles.statsGridMobile,
            ]}
          >
            <StatCard
              icon="calendar-outline"
              badge="+2 this month"
              value={String(profile.totalBookings || 14)}
              label="Total Bookings"
            />

            <StatCard
              icon="car-outline"
              badge="Returns Aug 17"
              value="1"
              label="Active Rentals"
            />

            <StatCard
              icon="card-outline"
              badge="Lifetime"
              value={profile.totalSpent || "₹41,280"}
              label="Total Spent"
            />

            <StatCard
              icon="star-outline"
              badge="≈ ₹234 credit"
              value={String(profile.loyaltyPoints || 2340)}
              label="Loyalty Points"
            />
          </View>

          {/* =================================================
              ACTIVE BOOKING HEADER
          ================================================= */}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Active Booking
            </Text>

            <Pressable
              style={styles.viewAllButton}
              onPress={() => navigation.navigate("Bookings")}
            >
              <Text style={styles.viewAllText}>
                View all
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color={MUTED}
              />
            </Pressable>
          </View>

          {/* =================================================
              ACTIVE BOOKING
          ================================================= */}

          <ActiveBookingCard
            onDetails={() => navigation.navigate("Bookings")}
            onTrack={() => {}}
          />

          {/* =================================================
              RECENT + RECOMMENDED
          ================================================= */}

          <View
            style={[
              styles.bottomGrid,
              (isMobile || isTablet) && styles.bottomGridStacked,
            ]}
          >
            {/* RECENT BOOKINGS */}

            <View style={styles.bottomColumn}>
              <Text style={styles.bottomTitle}>
                Recent Bookings
              </Text>

              <RecentBookings />
            </View>

            {/* RECOMMENDED */}

            <View style={styles.bottomColumn}>
              <View style={styles.recommendedHeader}>
                <Text style={styles.bottomTitle}>
                  Recommended for You
                </Text>

                <Pressable onPress={() => navigation.navigate("Browse")}>
                  <Text style={styles.browseAllTop}>
                    Browse all →
                  </Text>
                </Pressable>
              </View>

              <RecommendedVehicles
                onBrowse={() => navigation.navigate("Browse")}
              />
            </View>
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    </AppShell>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: BG,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 32,
    paddingBottom: 50,
  },

  scrollContentMobile: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },

  /* =======================================================
     WELCOME
  ======================================================= */

  welcomeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  welcomeRowMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },

  welcomeText: {
    flexShrink: 1,
  },

  welcomeTitle: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "800",
    color: BLACK,
    letterSpacing: -1,
  },

  dateText: {
    marginTop: 5,
    fontSize: 17,
    color: MUTED,
    fontWeight: "500",
  },

  bookVehicleButton: {
    minHeight: 52,
    paddingHorizontal: 27,
    borderRadius: 27,
    backgroundColor: LIME,
    alignItems: "center",
    justifyContent: "center",
  },

  bookVehicleText: {
    color: BLACK,
    fontSize: 15,
    fontWeight: "800",
  },

  /* =======================================================
     STATISTICS
  ======================================================= */

  statsGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    marginBottom: 37,
  },

  statsGridMobile: {
    flexDirection: "column",
    gap: 14,
  },

  statCard: {
    flex: 1,
    minHeight: 158,
    backgroundColor: WHITE,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    justifyContent: "space-between",
  },

  statTopRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: LIME,
    alignItems: "center",
    justifyContent: "center",
  },

  statBadge: {
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },

  statBadgeText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "500",
  },

  statValue: {
    marginTop: 22,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "800",
    color: BLACK,
    letterSpacing: -0.5,
  },

  statLabel: {
    marginTop: 2,
    fontSize: 14,
    color: MUTED,
    fontWeight: "500",
  },

  /* =======================================================
     SECTION HEADER
  ======================================================= */

  sectionHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "800",
    color: BLACK,
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  viewAllText: {
    fontSize: 14,
    color: MUTED,
    fontWeight: "600",
  },

  /* =======================================================
     ACTIVE BOOKING
  ======================================================= */

  activeBookingCard: {
    width: "100%",
    minHeight: 288,
    backgroundColor: WHITE,
    borderRadius: 25,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#ECEDEF",
    flexWrap: "wrap",
  },

  activeImageContainer: {
    width: 280,
    minHeight: 288,
    backgroundColor: "#E8E8E8",
  },

  activeImage: {
    width: "100%",
    height: "100%",
    minHeight: 220,
  },

  activeDetails: {
    flex: 1,
    minWidth: 280,
    padding: 28,
    justifyContent: "space-between",
  },

  bookingTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  bookingHeading: {
    flex: 1,
  },

  bookingId: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  bookingVehicle: {
    color: BLACK,
    fontSize: 22,
    fontWeight: "800",
  },

  bookingDescription: {
    color: MUTED,
    fontSize: 14,
    marginTop: 4,
  },

  confirmedBadge: {
    backgroundColor: "#EAF9D9",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },

  confirmedText: {
    color: "#467A00",
    fontSize: 13,
    fontWeight: "700",
  },

  bookingInfoRow: {
    flexDirection: "row",
    gap: 28,
    marginVertical: 20,
  },

  bookingInfo: {
    gap: 4,
  },

  bookingInfoLabel: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "500",
  },

  bookingInfoValue: {
    color: BLACK,
    fontSize: 16,
    fontWeight: "700",
  },

  bookingButtons: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },

  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D9DDE3",
    backgroundColor: WHITE,
  },

  outlineButtonText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "700",
  },

  cancelButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
    backgroundColor: "#F5F5F5",
  },

  cancelButtonText: {
    color: "#686D76",
    fontSize: 14,
    fontWeight: "600",
  },

  /* =======================================================
     RECENT + RECOMMENDED
  ======================================================= */

  bottomGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 28,
  },

  bottomGridStacked: {
    flexDirection: "column",
    gap: 24,
  },

  bottomColumn: {
    flex: 1,
    minWidth: 0,
  },

  bottomTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: BLACK,
    marginBottom: 16,
  },

  recentCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },

  recentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  recentRowLast: {
    borderBottomWidth: 0,
  },

  recentInfo: {
    flex: 1,
  },

  recentName: {
    color: BLACK,
    fontSize: 16,
    fontWeight: "700",
  },

  recentDate: {
    color: MUTED,
    fontSize: 13,
    marginTop: 3,
  },

  recentRight: {
    alignItems: "flex-end",
    gap: 4,
  },

  statusBadge: {
    backgroundColor: "#E8F8EA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    color: "#287D3C",
    fontSize: 12,
    fontWeight: "700",
  },

  cancelledBadge: {
    backgroundColor: "#FEEBEB",
  },

  cancelledText: {
    color: "#C53030",
  },

  recentAmount: {
    color: BLACK,
    fontSize: 15,
    fontWeight: "800",
  },

  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  browseAllTop: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "600",
  },

  recommendedContainer: {
    gap: 12,
  },

  recommendedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 14,
  },

  recommendedImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#EAEAEA",
  },

  recommendedInfo: {
    flex: 1,
  },

  recommendedName: {
    color: BLACK,
    fontSize: 16,
    fontWeight: "700",
  },

  recommendedType: {
    color: MUTED,
    fontSize: 13,
    marginTop: 2,
  },

  recommendedPrice: {
    alignItems: "flex-end",
    gap: 4,
  },

  priceText: {
    color: BLACK,
    fontSize: 15,
    fontWeight: "800",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "600",
  },

  browseAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },

  browseAllText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "700",
  },
});
