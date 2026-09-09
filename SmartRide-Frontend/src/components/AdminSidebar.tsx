import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type SidebarProps = {
  collapsed: boolean;
  isMobile: boolean;
};

type MenuItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  active: boolean;
  onPress: () => void;
};

type RoleItemProps = {
  title: string;
  active: boolean;
  onPress: () => void;
};

export default function AdminSidebar({
  collapsed,
  isMobile,
}: SidebarProps) {
  const navigation = useNavigation<any>();

  const [activeItem, setActiveItem] = useState<string>("Overview");

  if (collapsed) {
    return null;
  }

  const navigateTo = (title: string, route: string) => {
    setActiveItem(title);
    navigation.navigate(route);
  };

  const switchRole = (role: string, route: string) => {
    setActiveItem(role);
    navigation.navigate(route);
  };

  const handleSignOut = () => {
    setActiveItem("Sign Out");

    navigation.navigate("Auth");
  };

  return (
    <View style={[styles.sidebar, isMobile && styles.mobileSidebar]}>
      <View style={styles.logoSection}>
        <View style={styles.logoBox}>
          <MaterialCommunityIcons
            name="car-outline"
            size={21}
            color="#0B0D0C"
          />
        </View>

        <Text style={styles.logoText}>RideAny</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>A</Text>
        </View>

        <View>
          <Text style={styles.profileName}>Admin</Text>
          <Text style={styles.profileRole}>Admin</Text>
        </View>
      </View>

      {/* Scroll Area */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Main Menu */}
        <View style={styles.menu}>
          <MenuItem
            icon="view-grid-outline"
            title="Overview"
            active={activeItem === "Overview"}
            onPress={() =>
              navigateTo("Overview", "AdminDashboard")
            }
          />

          <MenuItem
            icon="account-group-outline"
            title="Users"
            active={activeItem === "Users"}
            onPress={() =>
              navigateTo("Users", "AdminUsers")
            }
          />

          <MenuItem
            icon="office-building-outline"
            title="Vendors"
            active={activeItem === "Vendors"}
            onPress={() =>
              navigateTo("Vendors", "AdminVendors")
            }
          />

          <MenuItem
            icon="car-outline"
            title="Vehicles"
            active={activeItem === "Vehicles"}
            onPress={() =>
              navigateTo("Vehicles", "AdminVehicles")
            }
          />

          <MenuItem
            icon="clipboard-text-outline"
            title="Bookings"
            active={activeItem === "Bookings"}
            onPress={() =>
              navigateTo("Bookings", "AdminBookings")
            }
          />

          <MenuItem
            icon="credit-card-outline"
            title="Payments"
            active={activeItem === "Payments"}
            onPress={() =>
              navigateTo("Payments", "AdminPayments")
            }
          />

          <MenuItem
            icon="chart-line"
            title="Analytics"
            active={activeItem === "Analytics"}
            onPress={() =>
              navigateTo("Analytics", "AdminReports")
            }
          />

          <MenuItem
            icon="cog-outline"
            title="Settings"
            active={activeItem === "Settings"}
            onPress={() =>
              navigateTo("Settings", "AdminSettings")
            }
          />
        </View>


        <View style={styles.switchSection}>
          <Text style={styles.switchTitle}>SWITCH ROLE</Text>

          <RoleItem
            title="Customer"
            active={activeItem === "Customer"}
            onPress={() =>
              switchRole("Customer", "Customer")
            }
          />

          <RoleItem
            title="Vendor"
            active={activeItem === "Vendor"}
            onPress={() =>
              switchRole("Vendor", "Vendor")
            }
          />

          <RoleItem
            title="Driver"
            active={activeItem === "Driver"}
            onPress={() =>
              switchRole("Driver", "Driver")
            }
          />
        </View>

        <View style={styles.signOutSection}>
          <MenuItem
            icon="logout-variant"
            title="Sign Out"
            active={activeItem === "Sign Out"}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  active,
  onPress,
}: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        active && styles.activeMenuItem,
        pressed && styles.pressedItem,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={21}
        color={active ? "#090B0A" : "#92969F"}
      />

      <Text
        style={[
          styles.menuText,
          active && styles.activeMenuText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

function RoleItem({
  title,
  active,
  onPress,
}: RoleItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleItem,
        pressed && styles.rolePressed,
      ]}
    >
      <View
        style={[
          styles.roleDot,
          active && styles.activeRoleDot,
        ]}
      />

      <Text
        style={[
          styles.roleText,
          active && styles.activeRoleText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 321,
    flexBasis: 321,
    flexShrink: 0,
    height: "100%",
    backgroundColor: "#0C0F0E",
    overflow: "hidden",
  },

  mobileSidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 318,
    zIndex: 10,
    elevation: 10,
  },

  logoSection: {
    height: 84,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#272A29",
  },

  logoBox: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#B5ED19",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    marginLeft: 10,
  },

  profileSection: {
    height: 86,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 21,
    borderBottomWidth: 1,
    borderBottomColor: "#272A29",
  },

  profileAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#A83DF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  profileAvatarText: {
    color: "#0C0F0E",
    fontSize: 18,
    fontWeight: "600",
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },

  profileRole: {
    color: "#A83DF5",
    fontSize: 14,
    fontWeight: "600",
  },

  scrollArea: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 18,
  },

  menu: {
    paddingHorizontal: 16,
  },

  menuItem: {
    height: 55,
    width: "100%",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  activeMenuItem: {
    backgroundColor: "#B5ED19",
  },

  pressedItem: {
    opacity: 0.75,
  },

  menuText: {
    color: "#9299A8",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 17,
  },

  activeMenuText: {
    color: "#090B0A",
    fontWeight: "600",
  },

  switchSection: {
    marginTop: 15,
    marginHorizontal: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#272A29",
  },

  switchTitle: {
    color: "#596274",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginLeft: 14,
    marginBottom: 12,
  },

  roleItem: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    borderRadius: 8,
  },

  rolePressed: {
    backgroundColor: "#171B19",
  },

  roleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5D626B",
    marginRight: 10,
  },

  activeRoleDot: {
    backgroundColor: "#B5ED19",
  },

  roleText: {
    color: "#7E8594",
    fontSize: 14,
    fontWeight: "500",
  },

  activeRoleText: {
    color: "#B5ED19",
    fontWeight: "600",
  },

  signOutSection: {
    marginTop: 10,
    paddingHorizontal: 0,
  },
});