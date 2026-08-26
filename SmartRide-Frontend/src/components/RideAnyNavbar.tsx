import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

type Role = "customer" | "vendor" | "driver" | "admin";

type MenuItem = {
  label: string;
  icon: string;
  route: string;
};

type Props = {
  role?: Role;
  onRoleChange?: (role: Role) => void;
  onSignOut?: () => void;
};

/* ============================================================
   MENU DATA
============================================================ */

const customerMenu: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "grid-outline",
    route: "Dashboard",
  },
  {
    label: "Browse Vehicles",
    icon: "car-outline",
    route: "Browse",
  },
  {
    label: "My Bookings",
    icon: "clipboard-outline",
    route: "Bookings",
  },
  {
    label: "Documents",
    icon: "document-text-outline",
    route: "Documents",
  },
  {
    label: "Payments",
    icon: "card-outline",
    route: "Payments",
  },
  {
    label: "Profile",
    icon: "person-outline",
    route: "Profile",
  },
];

const vendorMenu: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "grid-outline",
    route: "Vendor",
  },
  {
    label: "My Fleet",
    icon: "car-outline",
    route: "Vendor",
  },
  {
    label: "Bookings",
    icon: "clipboard-outline",
    route: "Bookings",
  },
  {
    label: "Earnings",
    icon: "card-outline",
    route: "Payments",
  },
  {
    label: "Documents",
    icon: "document-text-outline",
    route: "Documents",
  },
];

const driverMenu: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "grid-outline",
    route: "Driver",
  },
  {
    label: "Active Trip",
    icon: "location-outline",
    route: "Driver",
  },
  {
    label: "Trip History",
    icon: "clipboard-outline",
    route: "Bookings",
  },
  {
    label: "Earnings",
    icon: "card-outline",
    route: "Payments",
  },
];

const adminMenu: MenuItem[] = [
  {
    label: "Overview",
    icon: "grid-outline",
    route: "Admin",
  },
  {
    label: "Users",
    icon: "people-outline",
    route: "Admin",
  },
  {
    label: "Vendors",
    icon: "business-outline",
    route: "Vendor",
  },
  {
    label: "Vehicles",
    icon: "car-outline",
    route: "Browse",
  },
  {
    label: "Bookings",
    icon: "clipboard-outline",
    route: "Bookings",
  },
  {
    label: "Payments",
    icon: "card-outline",
    route: "Payments",
  },
  {
    label: "Analytics",
    icon: "analytics-outline",
    route: "Admin",
  },
];

/* ============================================================
   ROLE DATA
============================================================ */

const roleData = {
  customer: {
    name: "Arjun Mehta",
    role: "Customer",
    initial: "A",
    color: "#B4F000",
    menu: customerMenu,
  },
  vendor: {
    name: "Fleet Co.",
    role: "Vendor",
    initial: "F",
    color: "#2879F6",
    menu: vendorMenu,
  },
  driver: {
    name: "Rahul D.",
    role: "Driver",
    initial: "R",
    color: "#FF7800",
    menu: driverMenu,
  },
  admin: {
    name: "Admin",
    role: "Administrator",
    initial: "A",
    color: "#A83DFF",
    menu: adminMenu,
  },
};

/* ============================================================
   COMPONENT
============================================================ */

export default function RideAnyNavbar({
  role = "customer",
  onRoleChange,
  onSignOut,
}: Props) {
  const navigation = useNavigation<any>();
  let routeName = "";
  try {
    const route = useRoute();
    routeName = route?.name || "";
  } catch (e) {
    routeName = "";
  }

  const { width } = useWindowDimensions();
  const isMobile = width < 700;
  const currentRole = roleData[role];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ========================================================
     NAVIGATION
  ======================================================== */

  const navigate = (screen: string) => {
    setMobileMenuOpen(false);
    navigation.navigate(screen);
  };

  /* ========================================================
     ROLE SWITCH
  ======================================================== */

  const switchRole = (newRole: Role) => {
    onRoleChange?.(newRole);
    setMobileMenuOpen(false);

    if (newRole === "customer") {
      navigation.navigate("Dashboard");
    } else if (newRole === "vendor") {
      navigation.navigate("Vendor");
    } else if (newRole === "driver") {
      navigation.navigate("Driver");
    } else if (newRole === "admin") {
      navigation.navigate("Admin");
    }
  };

  /* ========================================================
     ACTIVE PAGE
  ======================================================== */

  const isActive = (screenName: string) => {
    return routeName === screenName;
  };

  /* ========================================================
     MOBILE
  ======================================================== */

  if (isMobile) {
    return (
      <View style={styles.mobileRoot}>
        {/* MOBILE HEADER */}

        <View style={styles.mobileHeader}>
          <View style={styles.brandRow}>
            <View style={styles.logoBox}>
              <Ionicons
                name="car-sport"
                size={21}
                color="#0B0D0C"
              />
            </View>

            <Text style={styles.logoText}>
              RideAny
            </Text>
          </View>

          <View style={styles.mobileActions}>
            <Pressable
              style={styles.notificationButton}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#555B65"
              />

              <View style={styles.notificationDot} />
            </Pressable>

            <View
              style={[
                styles.mobileAvatar,
                {
                  backgroundColor:
                    currentRole.color,
                },
              ]}
            >
              <Text style={styles.avatarText}>
                {currentRole.initial}
              </Text>
            </View>

            <Pressable
              style={styles.menuToggle}
              onPress={() =>
                setMobileMenuOpen((prev) => !prev)
              }
            >
              <Ionicons
                name={
                  mobileMenuOpen
                    ? "close"
                    : "menu-outline"
                }
                size={27}
                color="#0B0D0C"
              />
            </Pressable>
          </View>
        </View>

        {/* MOBILE DRAWER */}

        {mobileMenuOpen && (
          <ScrollView
            style={styles.mobileDrawer}
            contentContainerStyle={
              styles.mobileDrawerContent
            }
          >
            <View style={styles.mobileUserCard}>
              <View
                style={[
                  styles.largeAvatar,
                  {
                    backgroundColor:
                      currentRole.color,
                  },
                ]}
              >
                <Text
                  style={styles.largeAvatarText}
                >
                  {currentRole.initial}
                </Text>
              </View>

              <View style={styles.mobileUserInfo}>
                <Text style={styles.mobileUserName}>
                  {currentRole.name}
                </Text>

                <Text
                  style={[
                    styles.mobileUserRole,
                    {
                      color:
                        role === "customer"
                          ? "#88B800"
                          : currentRole.color,
                    },
                  ]}
                >
                  {currentRole.role}
                </Text>
              </View>
            </View>

            {/* MENU ITEMS */}

            <View style={styles.menuList}>
              {currentRole.menu.map((item) => {
                const active = isActive(item.route);

                return (
                  <Pressable
                    key={item.label}
                    onPress={() =>
                      navigate(item.route)
                    }
                    style={[
                      styles.menuItem,
                      active && styles.menuItemActive,
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={
                        active ? "#090A0A" : "#6A7280"
                      }
                    />

                    <Text
                      style={[
                        styles.menuItemText,
                        active &&
                          styles.menuItemTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* ROLE SWITCH */}

            <View style={styles.roleSwitchSection}>
              <Text style={styles.roleSwitchTitle}>
                SWITCH ROLE
              </Text>

              {(
                [
                  "customer",
                  "vendor",
                  "driver",
                  "admin",
                ] as Role[]
              )
                .filter((r) => r !== role)
                .map((r) => (
                  <Pressable
                    key={r}
                    onPress={() => switchRole(r)}
                    style={styles.roleSwitchButton}
                  >
                    <View
                      style={[
                        styles.roleDot,
                        {
                          backgroundColor:
                            roleData[r].color,
                        },
                      ]}
                    />

                    <Text
                      style={styles.roleSwitchText}
                    >
                      {roleData[r].role}
                    </Text>
                  </Pressable>
                ))}
            </View>

            {/* SIGN OUT */}

            <Pressable
              onPress={() => {
                setMobileMenuOpen(false);
                if (onSignOut) {
                  onSignOut();
                } else {
                  navigation.navigate("Role");
                }
              }}
              style={styles.signOutButton}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#EF4444"
              />

              <Text style={styles.signOutText}>
                Sign Out
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </View>
    );
  }

  /* ========================================================
     DESKTOP / TABLET
  ======================================================== */

  return (
    <View style={styles.desktopRoot}>
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.headerSearch}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#8A92A0"
          />

          <TextInput
            placeholder="Search vehicles, bookings, locations..."
            placeholderTextColor="#8C93A0"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.headerRight}>
          <Pressable
            style={styles.notificationButton}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#585E6A"
            />

            <View style={styles.notificationDot} />
          </Pressable>

          <View
            style={[
              styles.avatar,
              {
                backgroundColor: currentRole.color,
              },
            ]}
          >
            <Text style={styles.avatarText}>
              {currentRole.initial}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  desktopRoot: {
    width: "100%",
  },

  header: {
    height: 78,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },

  headerSearch: {
    flex: 1,
    maxWidth: 460,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    fontSize: 15,
    color: "#111111",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  notificationButton: {
    position: "relative",
    padding: 6,
  },

  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#B4F000",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#080909",
    fontWeight: "900",
    fontSize: 18,
  },

  mobileRoot: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    zIndex: 999,
  },

  mobileHeader: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#B4F000",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0B0D0C",
  },

  mobileActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  mobileAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  menuToggle: {
    padding: 4,
  },

  mobileDrawer: {
    backgroundColor: "#0B0D0C",
    paddingHorizontal: 18,
    paddingVertical: 20,
    maxHeight: 500,
  },

  mobileDrawerContent: {
    paddingBottom: 30,
  },

  mobileUserCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
    marginBottom: 16,
    gap: 14,
  },

  largeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  largeAvatarText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0B0D0C",
  },

  mobileUserInfo: {
    flex: 1,
  },

  mobileUserName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  mobileUserRole: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },

  menuList: {
    gap: 6,
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
  },

  menuItemActive: {
    backgroundColor: "#B4F000",
  },

  menuItemText: {
    color: "#8E949F",
    fontSize: 16,
    fontWeight: "600",
  },

  menuItemTextActive: {
    color: "#090A0A",
    fontWeight: "800",
  },

  roleSwitchSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#222222",
    gap: 12,
    marginBottom: 20,
  },

  roleSwitchTitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  roleSwitchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },

  roleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  roleSwitchText: {
    color: "#8E949F",
    fontSize: 15,
    fontWeight: "600",
  },

  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },

  signOutText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "700",
  },
});