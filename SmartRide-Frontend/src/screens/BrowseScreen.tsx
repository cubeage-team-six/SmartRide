import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../components/AppShell";
import type { BrowseScreenProps } from "../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const TEXT = "#111111";
const MUTED = "#858892";
const BORDER = "#E5E5E5";

export type Vehicle = {
  id: string;
  category: string;
  name: string;
  vendor: string;
  price: number;
  image: string;
  tags: string[];
  rating: string;
  reviews: string;
  available: boolean;
  fuel: string;
  transmission: string;
};

/* ============================================================
   FILTER DATA
============================================================ */

const categories = [
  "All",
  "Cars",
  "SUVs",
  "Bikes",
  "Scooters",
  "Trucks",
  "Buses",
  "Construction",
  "Agricultural",
];

const fuelTypes = [
  "All",
  "Petrol",
  "Diesel",
  "Electric",
  "CNG",
];

const transmissions = [
  "All",
  "Manual",
  "Automatic",
];

/* ============================================================
   VEHICLES
============================================================ */

export const vehicles: Vehicle[] = [
  {
    id: "1",
    category: "SUVs",
    name: "Mahindra Thar LX",
    vendor: "GoWheels, Bangalore",
    price: 1950,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=90",
    tags: ["4WD", "GPS", "AC"],
    rating: "4.9",
    reviews: "124",
    available: true,
    fuel: "Diesel",
    transmission: "Manual",
  },
  {
    id: "2",
    category: "Bikes",
    name: "Royal Enfield Himalayan",
    vendor: "RideHigh, Bangalore",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=90",
    tags: ["Adventure", "GPS"],
    rating: "4.8",
    reviews: "213",
    available: true,
    fuel: "Petrol",
    transmission: "Manual",
  },
  {
    id: "3",
    category: "Cars",
    name: "Honda City ZX",
    vendor: "DriveEasy, Bangalore",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=90",
    tags: ["AC", "Music System"],
    rating: "4.7",
    reviews: "89",
    available: true,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: "4",
    category: "SUVs",
    name: "Toyota Innova Crysta",
    vendor: "Premium Cabs, Mysore",
    price: 2300,
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=90",
    tags: ["AC", "7-seater", "Driver avail."],
    rating: "4.6",
    reviews: "67",
    available: true,
    fuel: "Diesel",
    transmission: "Automatic",
  },
  {
    id: "5",
    category: "Scooters",
    name: "Honda Activa 6G",
    vendor: "ScootZone, Bangalore",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1000&q=90",
    tags: ["Helmet incl.", "Fuel incl."],
    rating: "4.6",
    reviews: "445",
    available: true,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: "6",
    category: "Construction",
    name: "JCB 3DX Backhoe",
    vendor: "HeavyHire, Pune",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1580901369227-308f6f40f2c1?auto=format&fit=crop&w=1000&q=90",
    tags: ["Operator included", "GPS"],
    rating: "4.5",
    reviews: "31",
    available: false,
    fuel: "Diesel",
    transmission: "Automatic",
  },
];

/* ============================================================
   MAIN SCREEN
============================================================ */

export default function BrowseScreen({ navigation }: BrowseScreenProps) {
  const { width } = useWindowDimensions();

  const isMobile = width < 700;
  const isTablet = width >= 700 && width < 1100;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const categoryMatch =
        selectedCategory === "All" ||
        vehicle.category === selectedCategory;

      const fuelMatch =
        selectedFuel === "All" ||
        vehicle.fuel === selectedFuel;

      const transmissionMatch =
        selectedTransmission === "All" ||
        vehicle.transmission === selectedTransmission;

      const priceMatch =
        vehicle.price <= maxPrice;

      const searchMatch =
        !query ||
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.category.toLowerCase().includes(query) ||
        vehicle.vendor.toLowerCase().includes(query);

      return (
        categoryMatch &&
        fuelMatch &&
        transmissionMatch &&
        priceMatch &&
        searchMatch
      );
    });
  }, [
    selectedCategory,
    selectedFuel,
    selectedTransmission,
    search,
    maxPrice,
  ]);

  return (
    <AppShell placeholder="Search...">
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            isMobile && styles.contentMobile,
            isTablet && styles.contentTablet,
          ]}
        >
          {/* ==================================================
              PAGE HEADER
          ================================================== */}

          <View style={styles.titleSection}>
            <Text
              style={[
                styles.pageTitle,
                isMobile && styles.pageTitleMobile,
              ]}
            >
              Browse Vehicles
            </Text>

            <Text
              style={[
                styles.pageSubtitle,
                isMobile && styles.pageSubtitleMobile,
              ]}
            >
              12,400+ verified vehicles across India
            </Text>
          </View>

          {/* ==================================================
              SEARCH + SORT
          ================================================== */}

          <View
            style={[
              styles.searchRow,
              isMobile && styles.searchRowMobile,
            ]}
          >
            <View
              style={[
                styles.vehicleSearch,
                isMobile && styles.vehicleSearchMobile,
              ]}
            >
              <Ionicons
                name="search-outline"
                size={21}
                color="#9CA0AA"
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search by vehicle name or type..."
                placeholderTextColor="#9DA1AA"
                style={styles.vehicleSearchInput}
                returnKeyType="search"
              />
            </View>

            <Pressable
              style={[
                styles.sortButton,
                isMobile && styles.sortButtonMobile,
              ]}
            >
              <Ionicons
                name="swap-vertical-outline"
                size={18}
                color="#555B65"
              />

              <Text style={styles.sortText}>
                Sort: Top Rated
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color="#555B65"
              />
            </Pressable>
          </View>

          {/* ==================================================
              MOBILE FILTERS
          ================================================== */}

          {isMobile && (
            <MobileFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedFuel={selectedFuel}
              setSelectedFuel={setSelectedFuel}
              selectedTransmission={selectedTransmission}
              setSelectedTransmission={setSelectedTransmission}
            />
          )}

          {/* ==================================================
              DESKTOP / TABLET BROWSE AREA
          ================================================== */}

          <View
            style={[
              styles.browseArea,
              isMobile && styles.browseAreaMobile,
            ]}
          >
            {/* =================================================
                FILTER SIDEBAR
            ================================================= */}

            {!isMobile && (
              <View
                style={[
                  styles.filterColumn,
                  isTablet && styles.filterColumnTablet,
                ]}
              >
                {/* CATEGORY */}

                <FilterTitle text="CATEGORY" />

                {categories.map((category) => {
                  const active = selectedCategory === category;

                  return (
                    <FilterItem
                      key={category}
                      text={category}
                      active={active}
                      onPress={() => setSelectedCategory(category)}
                    />
                  );
                })}

                {/* FUEL */}

                <View style={styles.filterSection}>
                  <FilterTitle text="FUEL TYPE" />

                  {fuelTypes.map((fuel) => {
                    const active = selectedFuel === fuel;

                    return (
                      <FilterItem
                        key={fuel}
                        text={fuel}
                        active={active}
                        onPress={() => setSelectedFuel(fuel)}
                      />
                    );
                  })}
                </View>

                {/* TRANSMISSION */}

                <View style={styles.filterSection}>
                  <FilterTitle text="TRANSMISSION" />

                  {transmissions.map((transmission) => {
                    const active = selectedTransmission === transmission;

                    return (
                      <FilterItem
                        key={transmission}
                        text={transmission}
                        active={active}
                        onPress={() => setSelectedTransmission(transmission)}
                      />
                    );
                  })}
                </View>

                {/* MAX PRICE */}

                <View style={styles.priceSection}>
                  <View style={styles.priceTitleRow}>
                    <Text style={styles.filterTitle}>
                      MAX PRICE:
                    </Text>

                    <Text style={styles.priceValue}>
                      ₹{maxPrice.toLocaleString("en-IN")}
                      /day
                    </Text>
                  </View>

                  <Pressable
                    style={styles.slider}
                    onPress={(event) => {
                      const x = event.nativeEvent.locationX;
                      const sliderWidth = 280;
                      const percentage = Math.max(0, Math.min(1, x / sliderWidth));
                      const value = 250 + Math.round(percentage * (10000 - 250));
                      setMaxPrice(value);
                    }}
                  >
                    <View style={styles.sliderTrack}>
                      <View
                        style={[
                          styles.sliderActive,
                          {
                            width: `${Math.max(2, (maxPrice / 10000) * 100)}%`,
                          },
                        ]}
                      />
                    </View>

                    <View
                      style={[
                        styles.sliderThumb,
                        {
                          left: `${Math.max(0, Math.min(100, (maxPrice / 10000) * 100))}%`,
                        },
                      ]}
                    />
                  </Pressable>

                  <View style={styles.priceLabels}>
                    <Text style={styles.priceLabel}>₹250</Text>
                    <Text style={styles.priceLabel}>₹10,000</Text>
                  </View>
                </View>
              </View>
            )}

            {/* =================================================
                VEHICLES
            ================================================= */}

            <View style={styles.vehicleSection}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.vehicleCount}>
                  {filteredVehicles.length} vehicles found
                </Text>
              </View>

              {filteredVehicles.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>
                    No vehicles found
                  </Text>

                  <Text style={styles.emptyText}>
                    Try changing your filters or search.
                  </Text>

                  <Pressable
                    style={styles.resetButton}
                    onPress={() => {
                      setSelectedCategory("All");
                      setSelectedFuel("All");
                      setSelectedTransmission("All");
                      setSearch("");
                      setMaxPrice(10000);
                    }}
                  >
                    <Text style={styles.resetButtonText}>
                      Reset Filters
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View
                  style={[
                    styles.cardGrid,
                    isTablet && styles.cardGridTablet,
                    isMobile && styles.cardGridMobile,
                  ]}
                >
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      mobile={isMobile}
                      onBook={() => {
                        if (vehicle.available) {
                          navigation.navigate("Bookings");
                        }
                      }}
                    />
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </AppShell>
  );
}

/* ============================================================
   FILTER TITLE
============================================================ */

function FilterTitle({ text }: { text: string }) {
  return (
    <Text style={styles.filterTitle}>
      {text}
    </Text>
  );
}

/* ============================================================
   FILTER ITEM
============================================================ */

function FilterItem({
  text,
  active,
  onPress,
}: {
  text: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterItem,
        active && styles.filterItemActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          active && styles.filterTextActive,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

/* ============================================================
   MOBILE FILTERS
============================================================ */

function MobileFilters({
  selectedCategory,
  setSelectedCategory,
  selectedFuel,
  setSelectedFuel,
  selectedTransmission,
  setSelectedTransmission,
}: {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedFuel: string;
  setSelectedFuel: (value: string) => void;
  selectedTransmission: string;
  setSelectedTransmission: (value: string) => void;
}) {
  return (
    <View style={styles.mobileFilters}>
      <Text style={styles.mobileFilterTitle}>
        CATEGORY
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mobileCategoryList}
      >
        {categories.map((category) => {
          const active = selectedCategory === category;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.mobileCategory,
                active && styles.mobileCategoryActive,
              ]}
            >
              <Text
                style={[
                  styles.mobileCategoryText,
                  active && styles.mobileCategoryTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.mobileFilterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {fuelTypes.map((fuel) => {
            const active = selectedFuel === fuel;

            return (
              <Pressable
                key={fuel}
                onPress={() => setSelectedFuel(fuel)}
                style={[
                  styles.mobileSmallFilter,
                  active && styles.mobileSmallFilterActive,
                ]}
              >
                <Text
                  style={[
                    styles.mobileSmallFilterText,
                    active && styles.mobileSmallFilterTextActive,
                  ]}
                >
                  {fuel}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.mobileFilterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {transmissions.map((transmission) => {
            const active = selectedTransmission === transmission;

            return (
              <Pressable
                key={transmission}
                onPress={() => setSelectedTransmission(transmission)}
                style={[
                  styles.mobileSmallFilter,
                  active && styles.mobileSmallFilterActive,
                ]}
              >
                <Text
                  style={[
                    styles.mobileSmallFilterText,
                    active && styles.mobileSmallFilterTextActive,
                  ]}
                >
                  {transmission}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

/* ============================================================
   VEHICLE CARD
============================================================ */

function VehicleCard({
  vehicle,
  mobile,
  onBook,
}: {
  vehicle: Vehicle;
  mobile: boolean;
  onBook: () => void;
}) {
  return (
    <View
      style={[
        styles.vehicleCard,
        mobile && styles.vehicleCardMobile,
      ]}
    >
      {/* IMAGE */}

      <View
        style={[
          styles.imageContainer,
          mobile && styles.imageContainerMobile,
        ]}
      >
        <Image
          source={{ uri: vehicle.image }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>
            {vehicle.category}
          </Text>
        </View>

        {!vehicle.available && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>
              Unavailable
            </Text>
          </View>
        )}
      </View>

      {/* CARD CONTENT */}

      <View
        style={[
          styles.cardContent,
          mobile && styles.cardContentMobile,
        ]}
      >
        <View style={styles.cardTop}>
          <View style={styles.cardNameArea}>
            <Text numberOfLines={1} style={styles.vehicleName}>
              {vehicle.name}
            </Text>

            <Text numberOfLines={1} style={styles.vendorName}>
              {vehicle.vendor}
            </Text>
          </View>

          <View style={styles.priceArea}>
            <Text style={styles.price}>
              ₹{vehicle.price}
            </Text>

            <Text style={styles.perDay}>
              /day
            </Text>
          </View>
        </View>

        {/* TAGS */}

        <View style={styles.tagsRow}>
          {vehicle.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        {/* BOTTOM */}

        <View style={styles.cardBottom}>
          <View style={styles.rating}>
            <Ionicons
              name="star"
              size={15}
              color={GREEN}
            />

            <Text style={styles.ratingNumber}>
              {vehicle.rating}
            </Text>

            <Text style={styles.reviewText}>
              ({vehicle.reviews} reviews)
            </Text>
          </View>

          <Pressable
            disabled={!vehicle.available}
            onPress={onBook}
            style={[
              styles.bookButton,
              !vehicle.available && styles.bookButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.bookButtonText,
                !vehicle.available && styles.bookButtonTextDisabled,
              ]}
            >
              Book Now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
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
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 60,
  },

  contentTablet: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },

  /* ==========================================================
     PAGE HEADER
  ========================================================== */

  titleSection: {
    marginBottom: 28,
  },

  pageTitle: {
    color: BLACK,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  pageTitleMobile: {
    fontSize: 27,
    lineHeight: 33,
  },

  pageSubtitle: {
    marginTop: 4,
    color: MUTED,
    fontSize: 16,
    lineHeight: 22,
  },

  pageSubtitleMobile: {
    fontSize: 14,
  },

  /* ==========================================================
     SEARCH
  ========================================================== */

  searchRow: {
    width: "100%",
    flexDirection: "row",
    gap: 14,
    marginBottom: 28,
  },

  searchRowMobile: {
    flexDirection: "column",
    gap: 10,
  },

  vehicleSearch: {
    flex: 1,
    height: 59,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
  },

  vehicleSearchMobile: {
    width: "100%",
  },

  vehicleSearchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: TEXT,
    paddingVertical: 0,
  },

  sortButton: {
    width: 192,
    height: 59,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  sortButtonMobile: {
    width: "100%",
  },

  sortText: {
    color: "#414650",
    fontSize: 15,
    fontWeight: "600",
  },

  /* ==========================================================
     MAIN BROWSE AREA
  ========================================================== */

  browseArea: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 30,
  },

  browseAreaMobile: {
    flexDirection: "column",
    gap: 15,
  },

  /* ==========================================================
     FILTER COLUMN
  ========================================================== */

  filterColumn: {
    width: 294,
    flexShrink: 0,
  },

  filterColumnTablet: {
    width: 220,
  },

  filterTitle: {
    color: "#6C7280",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  filterItem: {
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  filterItemActive: {
    backgroundColor: GREEN,
  },

  filterText: {
    color: "#303642",
    fontSize: 17,
    fontWeight: "500",
  },

  filterTextActive: {
    color: BLACK,
    fontWeight: "600",
  },

  filterSection: {
    marginTop: 27,
  },

  /* ==========================================================
     PRICE
  ========================================================== */

  priceSection: {
    marginTop: 29,
    paddingHorizontal: 1,
  },

  priceTitleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },

  priceValue: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "800",
  },

  slider: {
    height: 38,
    marginTop: 12,
    justifyContent: "center",
    position: "relative",
  },

  sliderTrack: {
    width: "100%",
    height: 7,
    borderRadius: 4,
    backgroundColor: "#E1E5E6",
    overflow: "hidden",
  },

  sliderActive: {
    height: 7,
    backgroundColor: GREEN,
    borderRadius: 4,
  },

  sliderThumb: {
    position: "absolute",
    top: 9,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: WHITE,
    marginLeft: -10,
  },

  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
  },

  priceLabel: {
    color: "#9298A2",
    fontSize: 13,
  },

  /* ==========================================================
     VEHICLE SECTION
  ========================================================== */

  vehicleSection: {
    flex: 1,
    minWidth: 0,
  },

  vehicleHeader: {
    height: 38,
    justifyContent: "center",
  },

  vehicleCount: {
    color: "#9A9EA7",
    fontSize: 14,
    fontWeight: "500",
  },

  cardGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },

  cardGridTablet: {
    gap: 14,
  },

  cardGridMobile: {
    flexDirection: "column",
    gap: 16,
  },

  /* ==========================================================
     VEHICLE CARD
  ========================================================== */

  vehicleCard: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 280,
    backgroundColor: WHITE,
    borderRadius: 19,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  vehicleCardMobile: {
    width: "100%",
    minWidth: 0,
    flexBasis: "auto",
  },

  imageContainer: {
    width: "100%",
    height: 218,
    position: "relative",
    backgroundColor: "#E5E5E5",
  },

  imageContainerMobile: {
    height: 215,
  },

  vehicleImage: {
    width: "100%",
    height: "100%",
  },

  /* ==========================================================
     CATEGORY BADGE
  ========================================================== */

  categoryBadge: {
    position: "absolute",
    top: 13,
    left: 15,
    backgroundColor: WHITE,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  categoryBadgeText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "800",
  },

  /* ==========================================================
     UNAVAILABLE
  ========================================================== */

  unavailableBadge: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [
      { translateX: -58 },
      { translateY: -18 },
    ],
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  unavailableText: {
    color: "#60656D",
    fontSize: 14,
    fontWeight: "700",
  },

  /* ==========================================================
     CARD CONTENT
  ========================================================== */

  cardContent: {
    padding: 16,
  },

  cardContentMobile: {
    padding: 15,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  cardNameArea: {
    flex: 1,
    minWidth: 0,
  },

  vehicleName: {
    color: BLACK,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  vendorName: {
    color: "#9296A0",
    fontSize: 14,
    marginTop: 4,
  },

  priceArea: {
    alignItems: "flex-end",
  },

  price: {
    color: BLACK,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "900",
  },

  perDay: {
    color: "#9296A0",
    fontSize: 13,
    marginTop: 2,
  },

  /* ==========================================================
     TAGS
  ========================================================== */

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 12,
  },

  tag: {
    borderWidth: 1,
    borderColor: "#ECEDEF",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FAFAFA",
  },

  tagText: {
    color: "#737985",
    fontSize: 13,
  },

  /* ==========================================================
     CARD BOTTOM
  ========================================================== */

  cardBottom: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  ratingNumber: {
    color: "#707681",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
  },

  reviewText: {
    color: "#737985",
    fontSize: 13,
    marginLeft: 4,
  },

  bookButton: {
    minWidth: 112,
    height: 38,
    paddingHorizontal: 17,
    borderRadius: 20,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  bookButtonDisabled: {
    backgroundColor: "#F0F0F0",
  },

  bookButtonText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "900",
  },

  bookButtonTextDisabled: {
    color: "#A4A7AC",
  },

  /* ==========================================================
     MOBILE FILTERS
  ========================================================== */

  mobileFilters: {
    marginBottom: 12,
  },

  mobileFilterTitle: {
    color: "#6C7280",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 9,
  },

  mobileCategoryList: {
    gap: 8,
    paddingBottom: 4,
  },

  mobileCategory: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
  },

  mobileCategoryActive: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  mobileCategoryText: {
    color: "#4E5560",
    fontSize: 13,
    fontWeight: "600",
  },

  mobileCategoryTextActive: {
    color: BLACK,
    fontWeight: "800",
  },

  mobileFilterRow: {
    marginTop: 8,
  },

  mobileSmallFilter: {
    height: 36,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  mobileSmallFilterActive: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  mobileSmallFilterText: {
    color: "#555B65",
    fontSize: 13,
    fontWeight: "600",
  },

  mobileSmallFilterTextActive: {
    color: BLACK,
    fontWeight: "800",
  },

  /* ==========================================================
     EMPTY
  ========================================================== */

  emptyState: {
    minHeight: 300,
    backgroundColor: WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyTitle: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "900",
  },

  emptyText: {
    color: MUTED,
    fontSize: 14,
    marginTop: 7,
    textAlign: "center",
  },

  resetButton: {
    marginTop: 18,
    backgroundColor: GREEN,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },

  resetButtonText: {
    color: BLACK,
    fontWeight: "800",
  },
});
