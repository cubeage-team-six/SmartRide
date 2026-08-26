import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../navigation/types";
import { useCustomerProfile } from "../context/CustomerProfileContext";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#858892";
const BORDER = "#292A2A";

type Props = {
  children: React.ReactNode;
  placeholder?: string;
  activeRouteName?: string;
};

export default function AppShell({
  children,
  placeholder = "Search...",
  activeRouteName,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { profile, unreadCount } = useCustomerProfile();

  let routeName = "";
  try {
    const route = useRoute();
    routeName = route?.name || "";
  } catch (e) {
    routeName = "";
  }

  const effectiveRoute = activeRouteName || routeName;
  const { width } = useWindowDimensions();

  /*
   * Desktop:
   *   >= 1100px  → full Figma sidebar
   *
   * Tablet:
   *   800–1099px → compact sidebar
   *
   * Mobile:
   *   < 800px    → no desktop sidebar, bottom navigation
   */
  const isDesktop = width >= 1100;
  const isTablet = width >= 800 && width < 1100;
  const isMobile = width < 800;

  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  const activePage =
    effectiveRoute === "Dashboard" || effectiveRoute === "CustomerHome" || effectiveRoute === "Home" || effectiveRoute === ""
      ? "Dashboard"
      : effectiveRoute === "Browse" || effectiveRoute === "BrowseVehicles" || effectiveRoute === "SearchVehicle" || effectiveRoute === "VehicleDetails" || effectiveRoute === "Filter"
      ? "Browse Vehicles"
      : effectiveRoute === "Bookings" || effectiveRoute === "MyBookings" || effectiveRoute === "BookingDetails" || effectiveRoute === "SelectDate" || effectiveRoute === "BookingConfirmation"
      ? "My Bookings"
      : effectiveRoute === "Documents" || effectiveRoute === "UploadDocuments"
      ? "Documents"
      : effectiveRoute === "Payments" || effectiveRoute === "Payment" || effectiveRoute === "PaymentSuccess" || effectiveRoute === "Refund"
      ? "Payments"
      : effectiveRoute === "Profile" || effectiveRoute === "EditProfile" || effectiveRoute === "Settings" || effectiveRoute === "Notifications" || effectiveRoute === "Help" || effectiveRoute === "Terms" || effectiveRoute === "Privacy"
      ? "Profile"
      : "Dashboard";

  return (
    <View style={styles.app}>

      {/* =========================================================
          DESKTOP / TABLET SIDEBAR
      ========================================================= */}

      {!isMobile && (
        <View
          style={[
            styles.sidebar,
            isTablet && styles.sidebarTablet,
          ]}
        >

          {/* =====================================================
              LOGO
          ===================================================== */}

          <Pressable
            onPress={() => navigate("Dashboard")}
            style={[
              styles.logoSection,
              isTablet && styles.logoSectionTablet,
            ]}
          >
            <View style={styles.logoBox}>
              <Ionicons
                name="car"
                size={23}
                color={BLACK}
              />
            </View>

            {isDesktop && (
              <Text style={styles.logoText}>
                RideAny
              </Text>
            )}
          </Pressable>

          {/* =====================================================
              USER PROFILE
          ===================================================== */}

          <Pressable
            onPress={() => navigate("Profile")}
            style={[
              styles.userSection,
              isTablet && styles.userSectionTablet,
            ]}
          >
            <View style={styles.largeAvatar}>
              <Text style={styles.avatarLetter}>
                {profile.avatarLetter || "A"}
              </Text>
            </View>

            {isDesktop && (
              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {profile.fullName || "Arjun Mehta"}
                </Text>

                <Text style={styles.userRole}>
                  {profile.role || "Customer"}
                </Text>
              </View>
            )}
          </Pressable>

          {/* =====================================================
              SIDEBAR SCROLL AREA
          ===================================================== */}

          <ScrollView
            style={styles.sidebarScroll}
            contentContainerStyle={[
              styles.sidebarContent,
              isTablet && styles.sidebarContentTablet,
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            {/* NAVIGATION */}

            <View
              style={[
                styles.navigation,
                isTablet && styles.navigationTablet,
              ]}
            >

              <SidebarItem
                icon="grid-outline"
                label="Dashboard"
                active={activePage === "Dashboard"}
                compact={isTablet}
                onPress={() => navigate("Dashboard")}
              />

              <SidebarItem
                icon="car-outline"
                label="Browse Vehicles"
                active={activePage === "Browse Vehicles"}
                compact={isTablet}
                onPress={() => navigate("Browse")}
              />

              <SidebarItem
                icon="clipboard-outline"
                label="My Bookings"
                active={activePage === "My Bookings"}
                compact={isTablet}
                onPress={() => navigate("Bookings")}
              />

              <SidebarItem
                icon="document-text-outline"
                label="Documents"
                active={activePage === "Documents"}
                compact={isTablet}
                onPress={() => navigate("Documents")}
              />

              <SidebarItem
                icon="card-outline"
                label="Payments"
                active={activePage === "Payments"}
                compact={isTablet}
                onPress={() => navigate("Payments")}
              />

              <SidebarItem
                icon="person-outline"
                label="Profile"
                active={activePage === "Profile"}
                compact={isTablet}
                onPress={() => navigate("Profile")}
              />

            </View>

            {/* =================================================
                SWITCH ROLE
            ================================================= */}

            {isDesktop && (
              <View style={styles.switchRole}>

                <Text style={styles.switchTitle}>
                  SWITCH ROLE
                </Text>

                <RoleItem
                  label="Vendor"
                  onPress={() => navigation.navigate("Role")}
                />
                <RoleItem
                  label="Driver"
                  onPress={() => navigation.navigate("Role")}
                />
                <RoleItem
                  label="Admin"
                  onPress={() => navigation.navigate("Role")}
                />

              </View>
            )}

            {/* =================================================
                SIGN OUT
            ================================================= */}

            <Pressable
              style={[
                styles.signOut,
                isTablet && styles.signOutTablet,
              ]}
              onPress={() => {
                navigation.navigate("Role");
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#8C92A0"
              />

              {isDesktop && (
                <Text style={styles.signOutText}>
                  Sign Out
                </Text>
              )}
            </Pressable>

          </ScrollView>
        </View>
      )}

      {/* =========================================================
          MAIN AREA
      ========================================================= */}

      <View style={styles.main}>

        {/* =======================================================
            TOP HEADER
        ======================================================= */}

        <View
          style={[
            styles.topHeader,
            isTablet && styles.topHeaderTablet,
            isMobile && styles.topHeaderMobile,
          ]}
        >

          {/* MOBILE LOGO */}

          {isMobile && (
            <Pressable
              onPress={() => navigate("Dashboard")}
              style={styles.mobileLogo}
            >
              <View style={styles.mobileLogoBox}>
                <Ionicons
                  name="car"
                  size={19}
                  color={BLACK}
                />
              </View>

              <Text style={styles.mobileLogoText}>
                RideAny
              </Text>
            </Pressable>
          )}

          {/* SEARCH */}

          {!isMobile && (
            <View
              style={[
                styles.headerSearch,
                isTablet && styles.headerSearchTablet,
              ]}
            >
              <Ionicons
                name="search-outline"
                size={21}
                color="#9BA0AA"
              />

              <TextInput
                placeholder={placeholder}
                placeholderTextColor="#A2A5AC"
                style={styles.headerSearchInput}
              />
            </View>
          )}

          {/* MOBILE SEARCH */}

          {isMobile && (
            <View style={styles.mobileSearch}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#9BA0AA"
              />
            </View>
          )}

          {/* HEADER RIGHT */}

          <View style={styles.headerRight}>

            <Pressable
              onPress={() => navigate("Notifications")}
              style={styles.notification}
              accessibilityLabel="Notifications"
            >
              <Ionicons
                name="notifications-outline"
                size={25}
                color="#77787F"
              />

              {unreadCount > 0 && <View style={styles.notificationDot} />}
            </Pressable>

            <Pressable
              onPress={() => navigate("Profile")}
              style={styles.smallAvatar}
              accessibilityLabel="User Profile"
            >
              <Text style={styles.smallAvatarText}>
                {profile.avatarLetter || "A"}
              </Text>
            </Pressable>

          </View>

        </View>

        {/* =======================================================
            PAGE CONTENT
        ======================================================= */}

        <View style={styles.page}>
          {children}
        </View>

        {/* =======================================================
            MOBILE BOTTOM NAV
        ======================================================= */}

        {isMobile && (
          <View style={styles.mobileNav}>

            <MobileNavItem
              icon="grid-outline"
              label="Home"
              active={activePage === "Dashboard"}
              onPress={() => navigate("Dashboard")}
            />

            <MobileNavItem
              icon="car-outline"
              label="Browse"
              active={activePage === "Browse Vehicles"}
              onPress={() => navigate("Browse")}
            />

            <MobileNavItem
              icon="clipboard-outline"
              label="Bookings"
              active={activePage === "My Bookings"}
              onPress={() => navigate("Bookings")}
            />

            <MobileNavItem
              icon="card-outline"
              label="Payments"
              active={activePage === "Payments"}
              onPress={() => navigate("Payments")}
            />

            <MobileNavItem
              icon="person-outline"
              label="Profile"
              active={activePage === "Profile"}
              onPress={() => navigate("Profile")}
            />

          </View>
        )}

      </View>
    </View>
  );
}


/* ================================================================
   SIDEBAR ITEM
================================================================ */

function SidebarItem({
  icon,
  label,
  active,
  compact,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  compact: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.sidebarItem,
        compact && styles.sidebarItemCompact,
        active && styles.sidebarItemActive,
      ]}
    >

      <Ionicons
        name={icon}
        size={22}
        color={active ? BLACK : "#92939A"}
      />

      {!compact && (
        <Text
          style={[
            styles.sidebarText,
            active && styles.sidebarTextActive,
          ]}
        >
          {label}
        </Text>
      )}

    </Pressable>
  );
}


/* ================================================================
   ROLE ITEM
================================================================ */

function RoleItem({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.roleItem}>

      <View style={styles.roleDot} />

      <Text style={styles.roleText}>
        {label}
      </Text>

    </Pressable>
  );
}


/* ================================================================
   MOBILE NAV ITEM
================================================================ */

function MobileNavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.mobileNavItem}
    >

      <Ionicons
        name={icon}
        size={22}
        color={active ? BLACK : "#8E939D"}
      />

      <Text
        style={[
          styles.mobileNavText,
          active && styles.mobileNavTextActive,
        ]}
      >
        {label}
      </Text>

    </Pressable>
  );
}


/* ================================================================
   STYLES
================================================================ */

const styles = StyleSheet.create({

  /* ==============================================================
     APP
  ============================================================== */

  app: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: BG,
    minHeight: 0,
    minWidth: 0,
  },


  /* ==============================================================
     SIDEBAR
  ============================================================== */

  sidebar: {
    width: 332,
    height: "100%",
    backgroundColor: BLACK,
    flexShrink: 0,
    overflow: "hidden",
  },

  sidebarTablet: {
    width: 88,
  },

  sidebarScroll: {
    flex: 1,
    minHeight: 0,
  },

  sidebarContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },

  sidebarContentTablet: {
    alignItems: "center",
  },


  /* ==============================================================
     LOGO
  ============================================================== */

  logoSection: {
    height: 88,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexShrink: 0,
  },

  logoSectionTablet: {
    justifyContent: "center",
    paddingHorizontal: 0,
  },

  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  logoText: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 12,
    letterSpacing: -0.7,
  },


  /* ==============================================================
     USER SECTION
  ============================================================== */

  userSection: {
    minHeight: 90,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexShrink: 0,
  },

  userSectionTablet: {
    justifyContent: "center",
    paddingHorizontal: 0,
  },

  largeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  avatarLetter: {
    color: BLACK,
    fontSize: 21,
    fontWeight: "900",
  },

  userInfo: {
    marginLeft: 16,
    flex: 1,
    minWidth: 0,
  },

  userName: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "800",
  },

  userRole: {
    color: GREEN,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 3,
  },


  /* ==============================================================
     NAVIGATION
  ============================================================== */

  navigation: {
    paddingHorizontal: 10,
    paddingTop: 16,
  },

  navigationTablet: {
    paddingHorizontal: 0,
    alignItems: "center",
  },

  sidebarItem: {
    width: "100%",
    minHeight: 53,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 5,
  },

  sidebarItemCompact: {
    width: 64,
    height: 58,
    minHeight: 58,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignSelf: "center",
  },

  sidebarItemActive: {
    backgroundColor: GREEN,
  },

  sidebarText: {
    color: "#9CA1AE",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
  },

  sidebarTextActive: {
    color: BLACK,
    fontWeight: "800",
  },


  /* ==============================================================
     SWITCH ROLE
  ============================================================== */

  switchRole: {
    marginTop: 16,
    marginHorizontal: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },

  switchTitle: {
    color: "#697080",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 16,
    letterSpacing: 0.3,
  },

  roleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  roleDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#686D78",
    marginRight: 12,
  },

  roleText: {
    color: "#8C92A0",
    fontSize: 15,
    fontWeight: "500",
  },


  /* ==============================================================
     SIGN OUT
  ============================================================== */

  signOut: {
    minHeight: 48,
    marginHorizontal: 24,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
  },

  signOutTablet: {
    marginHorizontal: 0,
    justifyContent: "center",
  },

  signOutText: {
    color: "#8C92A0",
    fontSize: 15,
    marginLeft: 14,
  },


  /* ==============================================================
     MAIN
  ============================================================== */

  main: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    backgroundColor: BG,
    overflow: "hidden",
  },


  /* ==============================================================
     TOP HEADER
  ============================================================== */

  topHeader: {
    height: 84,
    width: "100%",
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 26,
    flexShrink: 0,
  },

  topHeaderTablet: {
    paddingHorizontal: 20,
  },

  topHeaderMobile: {
    height: 70,
    paddingHorizontal: 15,
  },


  /* ==============================================================
     SEARCH
  ============================================================== */

  headerSearch: {
    width: 375,
    maxWidth: "42%",
    minWidth: 230,
    height: 52,
    borderRadius: 28,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  headerSearchTablet: {
    width: "50%",
    maxWidth: 350,
    minWidth: 200,
  },

  headerSearchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    paddingVertical: 0,
    fontSize: 16,
    color: "#111111",
  },


  /* ==============================================================
     HEADER RIGHT
  ============================================================== */

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  notification: {
    width: 34,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    right: 5,
    top: 6,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#E11D48",
  },

  smallAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  smallAvatarText: {
    fontSize: 18,
    fontWeight: "900",
    color: BLACK,
  },


  /* ==============================================================
     MOBILE HEADER
  ============================================================== */

  mobileLogo: {
    flexDirection: "row",
    alignItems: "center",
  },

  mobileLogoBox: {
    width: 38,
    height: 38,
    borderRadius: 7,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  mobileLogoText: {
    marginLeft: 9,
    fontSize: 20,
    fontWeight: "900",
    color: BLACK,
  },

  mobileSearch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: 10,
  },


  /* ==============================================================
     PAGE
  ============================================================== */

  page: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    backgroundColor: BG,
    overflow: "hidden",
  },


  /* ==============================================================
     MOBILE BOTTOM NAV
  ============================================================== */

  mobileNav: {
    height: 68,
    width: "100%",
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
    flexShrink: 0,
  },

  mobileNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mobileNavText: {
    marginTop: 3,
    fontSize: 10,
    color: "#8E939D",
    fontWeight: "600",
  },

  mobileNavTextActive: {
    color: BLACK,
    fontWeight: "800",
  },

});