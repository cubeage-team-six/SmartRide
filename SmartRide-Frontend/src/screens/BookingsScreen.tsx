import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../components/AppShell";
import type { BookingsScreenProps } from "../types";

const GREEN = "#B7F000";
const BLACK = "#0A0A0A";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71809A";
const BORDER = "#E1E3E7";

/* ============================================================
   BOOKING DATA
============================================================ */

export const bookings = [
  {
    id: "BK-2024-0871",
    name: "Mahindra Thar LX",
    type: "SUV · 4WD · GoWheels, Bangalore",
    status: "Active",
    statusType: "active",
    pickup: "Aug 14, 2025",
    returnDate: "Aug 17, 2025",
    duration: "3 days",
    total: "₹5,850",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "BK-2024-0856",
    name: "Honda Activa 6G",
    type: "Scooter · ScootZone, Bangalore",
    status: "Completed",
    statusType: "completed",
    pickup: "Aug 8, 2025",
    returnDate: "Aug 9, 2025",
    duration: "1 day",
    total: "₹498",
    image:
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "BK-2024-0821",
    name: "Royal Enfield Himalayan",
    type: "Bike · Adventure · RideHigh, Bangalore",
    status: "Upcoming",
    statusType: "upcoming",
    pickup: "Aug 20, 2025",
    returnDate: "Aug 23, 2025",
    duration: "3 days",
    total: "₹2,247",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "BK-2024-0843",
    name: "Toyota Innova Crysta",
    type: "SUV · 7-seater · Premium Cabs, Mysore",
    status: "Completed",
    statusType: "completed",
    pickup: "Jul 22, 2025",
    returnDate: "Jul 26, 2025",
    duration: "4 days",
    total: "₹9,200",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "BK-2024-0790",
    name: "Tata Ace Mini Truck",
    type: "Commercial · Light · CargoFleet, Bangalore",
    status: "Cancelled",
    statusType: "cancelled",
    pickup: "Jul 5, 2025",
    returnDate: "Jul 5, 2025",
    duration: "1 day",
    total: "₹1,499",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=90",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function BookingsScreen({ navigation }: BookingsScreenProps) {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState("All");
  const isMobile = width < 700;

  const filteredBookings = useMemo(() => {
    if (filter === "All") {
      return bookings;
    }

    return bookings.filter(
      (booking) => booking.status === filter
    );
  }, [filter]);

  return (
    <AppShell>
      <ScrollView
        style={styles.page}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.mobileContent,
        ]}
        showsVerticalScrollIndicator={true}
      >
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>
            My Bookings
          </Text>

          <Text style={styles.pageSubtitle}>
            {bookings.length} total bookings
          </Text>
        </View>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          <FilterButton
            title="All"
            count={String(bookings.length)}
            active={filter === "All"}
            onPress={() => setFilter("All")}
          />

          <FilterButton
            title="Active"
            count={String(bookings.filter((b) => b.status === "Active").length)}
            active={filter === "Active"}
            onPress={() => setFilter("Active")}
          />

          <FilterButton
            title="Upcoming"
            count={String(bookings.filter((b) => b.status === "Upcoming").length)}
            active={filter === "Upcoming"}
            onPress={() => setFilter("Upcoming")}
          />

          <FilterButton
            title="Completed"
            count={String(bookings.filter((b) => b.status === "Completed").length)}
            active={filter === "Completed"}
            onPress={() => setFilter("Completed")}
          />

          <FilterButton
            title="Cancelled"
            count={String(bookings.filter((b) => b.status === "Cancelled").length)}
            active={filter === "Cancelled"}
            onPress={() => setFilter("Cancelled")}
          />
        </ScrollView>

        {/* =====================================================
            BOOKINGS
        ===================================================== */}

        <View style={styles.bookingList}>
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              mobile={isMobile}
              onBrowse={() => navigation.navigate("Browse")}
            />
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </AppShell>
  );
}

/* ============================================================
   FILTER BUTTON
============================================================ */

function FilterButton({
  title,
  count,
  active,
  onPress,
}: {
  title: string;
  count: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterButton,
        active && styles.filterButtonActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          active && styles.filterTextActive,
        ]}
      >
        {title}
      </Text>

      <View
        style={[
          styles.countCircle,
          active && styles.countCircleActive,
        ]}
      >
        <Text
          style={[
            styles.countText,
            active && styles.countTextActive,
          ]}
        >
          {count}
        </Text>
      </View>
    </Pressable>
  );
}

/* ============================================================
   BOOKING CARD
============================================================ */

function BookingCard({
  booking,
  mobile,
  onBrowse,
}: {
  booking: (typeof bookings)[number];
  mobile: boolean;
  onBrowse?: () => void;
}) {
  const active = booking.statusType === "active";
  const completed = booking.statusType === "completed";
  const upcoming = booking.statusType === "upcoming";
  const cancelled = booking.statusType === "cancelled";

  return (
    <View
      style={[
        styles.bookingCard,
        mobile && styles.bookingCardMobile,
      ]}
    >
      {/* IMAGE */}

      <Image
        source={{ uri: booking.image }}
        style={[
          styles.bookingImage,
          mobile && styles.bookingImageMobile,
        ]}
        resizeMode="cover"
      />

      {/* CONTENT */}

      <View
        style={[
          styles.bookingContent,
          mobile && styles.bookingContentMobile,
        ]}
      >
        {/* TOP */}

        <View style={styles.bookingTop}>
          <View style={styles.bookingInfo}>
            <Text style={styles.bookingId}>
              {booking.id}
            </Text>

            <Text style={styles.vehicleName}>
              {booking.name}
            </Text>

            <Text style={styles.vehicleType}>
              {booking.type}
            </Text>
          </View>

          <StatusBadge
            status={booking.status}
            active={active}
            completed={completed}
            upcoming={upcoming}
            cancelled={cancelled}
          />
        </View>

        {/* DETAILS */}

        <View
          style={[
            styles.detailsBox,
            mobile && styles.detailsBoxMobile,
          ]}
        >
          <Detail
            label="Pickup"
            value={booking.pickup}
          />

          <Detail
            label="Return"
            value={booking.returnDate}
          />

          <Detail
            label="Duration"
            value={booking.duration}
          />

          <Detail
            label="Total Paid"
            value={booking.total}
          />
        </View>

        {/* ACTIONS */}

        <View style={styles.actions}>
          {active && (
            <>
              <ActionButton
                title="Track Vehicle"
                green
                icon="location-outline"
              />

              <ActionButton title="View Details" />

              <ActionButton title="Contact Vendor" />
            </>
          )}

          {upcoming && (
            <>
              <ActionButton
                title="Modify Dates"
                green
              />

              <ActionButton title="View Details" />

              <ActionButton
                title="Cancel"
                danger
              />
            </>
          )}

          {completed && (
            <>
              <ActionButton
                title="Download Invoice"
                green
              />

              <ActionButton title="Rate & Review" />

              <ActionButton title="Rebook" onPress={onBrowse} />
            </>
          )}

          {cancelled && (
            <>
              <ActionButton
                title="View Details"
                green
              />

              <ActionButton title="Rebook" onPress={onBrowse} />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

/* ============================================================
   STATUS
============================================================ */

function StatusBadge({
  status,
  active,
  completed,
  upcoming,
  cancelled,
}: {
  status: string;
  active: boolean;
  completed: boolean;
  upcoming: boolean;
  cancelled: boolean;
}) {
  return (
    <View
      style={[
        styles.statusBadge,
        active && styles.statusActive,
        completed && styles.statusCompleted,
        upcoming && styles.statusUpcoming,
        cancelled && styles.statusCancelled,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          active && styles.statusActiveText,
          completed && styles.statusCompletedText,
          upcoming && styles.statusUpcomingText,
          cancelled && styles.statusCancelledText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

/* ============================================================
   DETAIL
============================================================ */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <Text style={styles.detailValue}>
        {value}
      </Text>
    </View>
  );
}

/* ============================================================
   ACTION BUTTON
============================================================ */

function ActionButton({
  title,
  green = false,
  danger = false,
  icon,
  onPress,
}: {
  title: string;
  green?: boolean;
  danger?: boolean;
  icon?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.actionButton,
        green && styles.actionButtonGreen,
        danger && styles.actionButtonDanger,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={19}
          color={
            green
              ? BLACK
              : danger
              ? "#FF4B4B"
              : "#151515"
          }
          style={{ marginRight: 8 }}
        />
      )}

      <Text
        style={[
          styles.actionText,
          green && styles.actionTextGreen,
          danger && styles.actionTextDanger,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    paddingHorizontal: 38,
    paddingTop: 40,
    paddingBottom: 40,
  },

  mobileContent: {
    paddingHorizontal: 18,
    paddingTop: 25,
  },

  /* ================= HEADER ================= */

  pageHeader: {
    marginBottom: 31,
  },

  pageTitle: {
    color: BLACK,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1.3,
  },

  pageSubtitle: {
    color: MUTED,
    fontSize: 20,
    marginTop: 5,
    fontWeight: "500",
  },

  /* ================= FILTERS ================= */

  filters: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 42,
  },

  filterButton: {
    height: 61,
    minWidth: 150,
    paddingHorizontal: 25,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#DCE0E5",
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonActive: {
    backgroundColor: BLACK,
    borderColor: BLACK,
  },

  filterText: {
    color: "#55677F",
    fontSize: 19,
    fontWeight: "800",
  },

  filterTextActive: {
    color: WHITE,
  },

  countCircle: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F1F3",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    paddingHorizontal: 7,
  },

  countCircleActive: {
    backgroundColor: "#303030",
  },

  countText: {
    color: "#6B7480",
    fontSize: 14,
    fontWeight: "800",
  },

  countTextActive: {
    color: WHITE,
  },

  /* ================= LIST ================= */

  bookingList: {
    gap: 27,
  },

  /* ================= CARD ================= */

  bookingCard: {
    width: "100%",
    minHeight: 353,
    backgroundColor: WHITE,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
    flexDirection: "row",
  },

  bookingCardMobile: {
    flexDirection: "column",
  },

  bookingImage: {
    width: 280,
    minHeight: 353,
    height: "100%",
  },

  bookingImageMobile: {
    width: "100%",
    height: 230,
    minHeight: 230,
  },

  bookingContent: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  bookingContentMobile: {
    padding: 20,
  },

  /* ================= CARD TOP ================= */

  bookingTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 103,
  },

  bookingInfo: {
    flex: 1,
    paddingRight: 20,
  },

  bookingId: {
    color: "#8397B2",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 7,
  },

  vehicleName: {
    color: BLACK,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  vehicleType: {
    color: "#52677F",
    fontSize: 18,
    marginTop: 5,
  },

  /* ================= STATUS ================= */

  statusBadge: {
    minWidth: 100,
    height: 47,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  statusActive: {
    backgroundColor: "#DCE9FF",
  },

  statusCompleted: {
    backgroundColor: "#D2F8E9",
  },

  statusUpcoming: {
    backgroundColor: "#FFF0C2",
  },

  statusCancelled: {
    backgroundColor: "#FFDCDD",
  },

  statusText: {
    fontSize: 16,
    fontWeight: "900",
  },

  statusActiveText: {
    color: "#2870E5",
  },

  statusCompletedText: {
    color: "#008B62",
  },

  statusUpcomingText: {
    color: "#C66A00",
  },

  statusCancelledText: {
    color: "#FF3333",
  },

  /* ================= DETAILS ================= */

  detailsBox: {
    height: 90,
    borderRadius: 18,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 23,
    marginBottom: 21,
  },

  detailsBoxMobile: {
    height: "auto",
    paddingVertical: 18,
    flexWrap: "wrap",
    rowGap: 20,
  },

  detail: {
    minWidth: 150,
    flex: 1,
  },

  detailLabel: {
    color: "#9AA5B4",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
  },

  detailValue: {
    color: BLACK,
    fontSize: 17,
    fontWeight: "900",
  },

  /* ================= ACTIONS ================= */

  actions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },

  actionButton: {
    minHeight: 55,
    paddingHorizontal: 25,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#D8DDE4",
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  actionButtonGreen: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  actionButtonDanger: {
    borderColor: "#FFD2D2",
    backgroundColor: WHITE,
  },

  actionText: {
    color: "#1B2A3B",
    fontSize: 16,
    fontWeight: "800",
  },

  actionTextGreen: {
    color: BLACK,
  },

  actionTextDanger: {
    color: "#FF4141",
  },
});
