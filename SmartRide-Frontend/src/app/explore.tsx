import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../components/AppShell";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";

const vehicles = [
  {
    name: "Mahindra Thar LX",
    type: "SUV · 4WD",
    location: "GoWheels, Bangalore",
    price: "₹1,950",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    category: "SUVs",
  },
  {
    name: "Royal Enfield Classic",
    type: "Bike",
    location: "RideHigh, Bangalore",
    price: "₹649",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
    category: "Bikes",
  },
  {
    name: "Honda Activa 6G",
    type: "Scooter",
    location: "ScootZone, Bangalore",
    price: "₹498",
    image:
      "https://images.unsplash.com/photo-1558980664-10ea6b0f7b5f?auto=format&fit=crop&w=900&q=80",
    category: "Scooters",
  },
  {
    name: "Toyota Innova Crysta",
    type: "SUV · 7-seater",
    location: "Premium Cabs, Mysore",
    price: "₹2,850",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
    category: "SUVs",
  },
  {
    name: "Force Traveller",
    type: "Bus · 17-seater",
    location: "TravelGo, Bangalore",
    price: "₹3,200",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
    category: "Trucks",
  },
  {
    name: "Maruti Swift Dzire",
    type: "Sedan",
    location: "CityDrive, Bangalore",
    price: "₹799",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    category: "Cars",
  },
];

const categories = [
  "All",
  "Cars",
  "SUVs",
  "Bikes",
  "Scooters",
  "Trucks",
];

export default function Explore() {
  const { width } = useWindowDimensions();

  const [selectedCategory, setSelectedCategory] =
    React.useState("All");

  const [search, setSearch] = React.useState("");

  const isMobile = width < 700;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const categoryMatch =
      selectedCategory === "All" ||
      vehicle.category === selectedCategory;

    const searchMatch =
      vehicle.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.type
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    /*
      IMPORTANT:
      AppShell is the ONLY place where the main RideAny
      sidebar/header should be rendered.

      Do NOT add another sidebar inside this page.
    */
    <AppShell placeholder="Search...">
      <ScrollView
        style={styles.page}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.mobileContent,
        ]}
        showsVerticalScrollIndicator={true}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.pageHeader}>
          <Text style={styles.title}>
            Browse Vehicles
          </Text>

          <Text style={styles.subtitle}>
            12,400+ verified vehicles across India
          </Text>
        </View>

        {/* =====================================================
            SEARCH + SORT
        ===================================================== */}

        <View
          style={[
            styles.searchRow,
            isMobile && styles.searchRowMobile,
          ]}
        >
          <View style={styles.vehicleSearch}>
            <Ionicons
              name="search-outline"
              size={23}
              color="#9298A3"
            />

            <Text style={styles.searchText}>
              {search ||
                "Search by vehicle name or type..."}
            </Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setSearch("")}
            />
          </View>

          <Pressable style={styles.sortButton}>
            <Ionicons
              name="swap-vertical-outline"
              size={19}
              color="#6E7480"
            />

            <Text style={styles.sortText}>
              Sort: Top Rated
            </Text>

            <Ionicons
              name="chevron-down"
              size={17}
              color="#6E7480"
            />
          </Pressable>
        </View>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <View
          style={[
            styles.mainRow,
            isMobile && styles.mainRowMobile,
          ]}
        >
          {/* ===================================================
              CATEGORY
          =================================================== */}

          <View
            style={[
              styles.categoryColumn,
              isMobile && styles.categoryColumnMobile,
            ]}
          >
            <Text style={styles.categoryTitle}>
              CATEGORY
            </Text>

            {categories.map((category) => {
              const active =
                selectedCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() =>
                    setSelectedCategory(category)
                  }
                  style={[
                    styles.categoryItem,
                    active &&
                      styles.categoryItemActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* ===================================================
              VEHICLES
          =================================================== */}

          <View style={styles.vehicleColumn}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                {filteredVehicles.length} vehicles found
              </Text>
            </View>

            {filteredVehicles.map((vehicle) => (
              <Pressable
                key={vehicle.name}
                style={styles.vehicleCard}
              >
                {/* IMAGE */}

                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: vehicle.image }}
                    style={styles.vehicleImage}
                    resizeMode="cover"
                  />

                  <View style={styles.categoryBadge}>
                    <Text
                      style={styles.categoryBadgeText}
                    >
                      {vehicle.category}
                    </Text>
                  </View>
                </View>

                {/* INFO */}

                <View style={styles.vehicleInfo}>
                  <View style={styles.vehicleDetails}>
                    <Text
                      style={styles.vehicleName}
                      numberOfLines={1}
                    >
                      {vehicle.name}
                    </Text>

                    <Text
                      style={styles.vehicleLocation}
                      numberOfLines={1}
                    >
                      {vehicle.location}
                    </Text>

                    <Text style={styles.vehicleType}>
                      {vehicle.type}
                    </Text>
                  </View>

                  <View style={styles.priceBox}>
                    <Text style={styles.price}>
                      {vehicle.price}
                    </Text>

                    <Text style={styles.perDay}>
                      /day
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </AppShell>
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
    paddingBottom: 60,
  },

  mobileContent: {
    paddingHorizontal: 18,
    paddingTop: 25,
  },

  /* ================= HEADER ================= */

  pageHeader: {
    marginBottom: 28,
  },

  title: {
    color: BLACK,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
  },

  subtitle: {
    color: "#858A94",
    fontSize: 16,
    marginTop: 5,
  },

  /* ================= SEARCH ================= */

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 35,
  },

  searchRowMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  vehicleSearch: {
    flex: 1,
    height: 70,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E2E5",
    borderRadius: 35,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  searchText: {
    color: "#9BA0AA",
    fontSize: 16,
    marginLeft: 14,
    flex: 1,
  },

  sortButton: {
    height: 70,
    paddingHorizontal: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E2E5",
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  sortText: {
    color: "#555B65",
    fontSize: 15,
    fontWeight: "700",
  },

  /* ================= MAIN ================= */

  mainRow: {
    flexDirection: "row",
    gap: 35,
  },

  mainRowMobile: {
    flexDirection: "column",
  },

  /* ================= CATEGORY ================= */

  categoryColumn: {
    width: 300,
    flexShrink: 0,
  },

  categoryColumnMobile: {
    width: "100%",
  },

  categoryTitle: {
    color: "#707681",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 12,
  },

  categoryItem: {
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 4,
  },

  categoryItemActive: {
    backgroundColor: GREEN,
  },

  categoryText: {
    color: "#414752",
    fontSize: 16,
    fontWeight: "700",
  },

  categoryTextActive: {
    color: BLACK,
    fontWeight: "900",
  },

  /* ================= VEHICLES ================= */

  vehicleColumn: {
    flex: 1,
    minWidth: 0,
  },

  resultsHeader: {
    height: 42,
    justifyContent: "flex-start",
  },

  resultsText: {
    color: "#9BA0AA",
    fontSize: 15,
    fontWeight: "700",
  },

  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
  },

  /* ================= IMAGE ================= */

  imageWrapper: {
    height: 260,
    position: "relative",
    backgroundColor: "#D4D6D8",
  },

  vehicleImage: {
    width: "100%",
    height: "100%",
  },

  categoryBadge: {
    position: "absolute",
    zIndex: 5,
    top: 17,
    left: 17,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  categoryBadgeText: {
    color: BLACK,
    fontSize: 13,
    fontWeight: "900",
  },

  /* ================= INFO ================= */

  vehicleInfo: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  vehicleDetails: {
    flex: 1,
    minWidth: 0,
  },

  vehicleName: {
    color: BLACK,
    fontSize: 21,
    fontWeight: "900",
  },

  vehicleLocation: {
    color: "#858A94",
    fontSize: 13,
    marginTop: 5,
  },

  vehicleType: {
    color: "#A0A4AC",
    fontSize: 11,
    marginTop: 3,
  },

  priceBox: {
    alignItems: "flex-end",
    marginLeft: 15,
  },

  price: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "900",
  },

  perDay: {
    color: "#858A94",
    fontSize: 12,
    marginTop: 2,
  },
});