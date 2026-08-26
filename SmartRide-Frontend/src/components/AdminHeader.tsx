import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  collapsed,
  setCollapsed,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Pressable
          style={styles.menuButton}
          onPress={() => setCollapsed(!collapsed)}
        >
          <MaterialCommunityIcons
            name="menu"
            size={25}
            color="#374151"
          />
        </Pressable>

        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={21}
            color="#9CA3AF"
          />

          <TextInput
            placeholder="Search..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.rightSection}>
        <Pressable style={styles.notification}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={25}
            color="#6B7280"
          />

          <View style={styles.notificationDot} />
        </Pressable>

        <View style={styles.avatar}>
          <TextInput
            editable={false}
            value="A"
            style={styles.avatarText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 84,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 26,
  },

  leftSection: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F2F4",
    flexShrink: 0,
  },

  searchContainer: {
    flex: 1,
    maxWidth: 360,
    height: 46,
    borderRadius: 24,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#EDEDED",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
  },

 searchInput: {
  flex: 1,
  marginLeft: 9,
  fontSize: 15,
  color: "#374151",
},

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },

  notification: {
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B5ED19",
    top: 0,
    right: -1,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#A83DF5",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});