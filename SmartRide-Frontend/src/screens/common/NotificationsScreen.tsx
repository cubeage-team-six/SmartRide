import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../../components/AppShell";
import { useCustomerProfile, NotificationItem } from "../../context/CustomerProfileContext";
import type { NotificationsScreenProps } from "../../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

type FilterTab = "all" | "unread" | "booking" | "payment";

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const { notifications, markAsRead, markAllAsRead, unreadCount } = useCustomerProfile();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return !notif.read;
    if (activeTab === "booking") return notif.type === "booking" || notif.type === "pickup";
    if (activeTab === "payment") return notif.type === "payment";
    return true;
  });

  return (
    <AppShell placeholder="Search notifications...">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
        ]}
        showsVerticalScrollIndicator
      >
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Notifications
            </Text>
            <Text style={styles.subtitle}>
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up! No unread notifications"}
            </Text>
          </View>

          {unreadCount > 0 && (
            <Pressable
              style={styles.markAllReadBtn}
              onPress={markAllAsRead}
              accessibilityLabel="Mark all as read"
            >
              <Ionicons name="checkmark-done-outline" size={18} color={BLACK} />
              <Text style={styles.markAllReadBtnText}>Mark all as read</Text>
            </Pressable>
          )}
        </View>

        {/* TABS */}
        <View style={styles.tabsRow}>
          <Pressable
            style={[styles.tab, activeTab === "all" && styles.tabActive]}
            onPress={() => setActiveTab("all")}
          >
            <Text style={[styles.tabText, activeTab === "all" && styles.tabTextActive]}>
              All ({notifications.length})
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === "unread" && styles.tabActive]}
            onPress={() => setActiveTab("unread")}
          >
            <Text style={[styles.tabText, activeTab === "unread" && styles.tabTextActive]}>
              Unread ({unreadCount})
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === "booking" && styles.tabActive]}
            onPress={() => setActiveTab("booking")}
          >
            <Text style={[styles.tabText, activeTab === "booking" && styles.tabTextActive]}>
              Bookings & Trips
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === "payment" && styles.tabActive]}
            onPress={() => setActiveTab("payment")}
          >
            <Text style={[styles.tabText, activeTab === "payment" && styles.tabTextActive]}>
              Payments
            </Text>
          </Pressable>
        </View>

        {/* NOTIFICATIONS LIST */}
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="notifications-off-outline" size={36} color={MUTED} />
            </View>
            <Text style={styles.emptyTitle}>No notifications found</Text>
            <Text style={styles.emptySubtitle}>
              There are no notifications under the "{activeTab}" filter.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredNotifications.map((notif) => (
              <Pressable
                key={notif.id}
                style={[
                  styles.notifCard,
                  !notif.read && styles.notifCardUnread,
                ]}
                onPress={() => markAsRead(notif.id)}
              >
                <View
                  style={[
                    styles.notifIconBox,
                    !notif.read && styles.notifIconBoxUnread,
                  ]}
                >
                  <Ionicons
                    name={notif.icon || "notifications-outline"}
                    size={22}
                    color={BLACK}
                  />
                </View>

                <View style={styles.notifContent}>
                  <View style={styles.notifTitleRow}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    <Text style={styles.notifTime}>{notif.time}</Text>
                  </View>
                  <Text style={styles.notifMessage}>{notif.message}</Text>
                  <View style={styles.notifMetaRow}>
                    <Text style={styles.notifDate}>{notif.date}</Text>
                    {!notif.read && (
                      <View style={styles.unreadBadge}>
                        <View style={styles.unreadDot} />
                        <Text style={styles.unreadBadgeText}>Unread</Text>
                      </View>
                    )}
                  </View>
                </View>

                {!notif.read && (
                  <Pressable
                    style={styles.markReadBtn}
                    onPress={() => markAsRead(notif.id)}
                    hitSlop={8}
                    accessibilityLabel="Mark as read"
                  >
                    <Ionicons name="checkmark-circle-outline" size={22} color={MUTED} />
                  </Pressable>
                )}
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 36,
    paddingBottom: 60,
  },
  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: BLACK,
    letterSpacing: -0.8,
  },
  titleMobile: {
    fontSize: 26,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: MUTED,
  },
  markAllReadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: GREEN,
  },
  markAllReadBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: BLACK,
  },
  tabsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  tabActive: {
    backgroundColor: BLACK,
    borderColor: BLACK,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  tabTextActive: {
    color: WHITE,
  },
  list: {
    gap: 12,
  },
  notifCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    gap: 16,
  },
  notifCardUnread: {
    backgroundColor: "#FDFDFD",
    borderColor: "#CBD5E1",
    borderLeftWidth: 5,
    borderLeftColor: GREEN,
  },
  notifIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  notifIconBoxUnread: {
    backgroundColor: GREEN,
  },
  notifContent: {
    flex: 1,
  },
  notifTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BLACK,
  },
  notifTime: {
    fontSize: 12,
    color: MUTED,
    fontWeight: "600",
  },
  notifMessage: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 8,
  },
  notifMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notifDate: {
    fontSize: 12,
    color: MUTED,
  },
  unreadBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E11D48",
  },
  unreadBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#E11D48",
  },
  markReadBtn: {
    padding: 4,
  },
  emptyCard: {
    backgroundColor: WHITE,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: BLACK,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: MUTED,
    textAlign: "center",
  },
});
