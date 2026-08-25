import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    ScrollView,
    TextInput,
    Modal,
    useWindowDimensions,
} from "react-native";

import { ROLES, COMPLETED_TRIPS } from "../theme";

import {
    FaCar,
    FaCheck,
    FaBell,
    LuLayoutGrid,
    LuMapPin,
    LuClipboardList,
    LuBanknote,
    LuLogOut,
    LuSearch,
    LuPhone,
    FaStar,
} from "../components/icons";
import type { DashboardScreenProps, Role } from "../types";

const MOBILE_BREAKPOINT = 700;

// ============================================================
// LOGO
// ============================================================

function Logo() {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
                style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#c4e900",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                }}
            >
                <FaCar size={18} color="#181e00" />
            </View>

            <Text
                style={{
                    fontFamily: "ArchivoNarrow_700Bold",
                    fontSize: 22,
                    fontWeight: "700",
                    color: "#ffffff",
                }}
            >
                RideAny
            </Text>
        </View>
    );
}

// ============================================================
// USER INFO
// ============================================================

function UserInfo({ selectedRole }: { selectedRole?: Role }) {
    return (
        <View
            style={{
                paddingHorizontal: 24,
                marginBottom: 28,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    backgroundColor: "#ea580c",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                    flexShrink: 0,
                }}
            >
                <Text
                    style={{
                        color: "#ffffff",
                        fontFamily: "Inter_700Bold",
                        fontSize: 18,
                    }}
                >
                    R
                </Text>
            </View>

            <View
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: "#ffffff",
                        fontFamily: "Inter_700Bold",
                        fontSize: 15,
                    }}
                >
                    Rahul D.
                </Text>

                <Text
                    numberOfLines={1}
                    style={{
                        color: "#ea580c",
                        fontFamily: "Inter_500Medium",
                        fontSize: 13,
                        marginTop: 2,
                    }}
                >
                    {selectedRole?.title || "Driver"}
                </Text>
            </View>
        </View>
    );
}

// ============================================================
// NAVIGATION
// ============================================================

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
    const item = (label: string, Icon: React.FC<any>, active = false) => (
        <Pressable
            key={label}
            onPress={onNavigate}
            style={({ hovered }: any) => ({
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: active ? "#c4e900" : "transparent",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                marginBottom: 4,
            })}
        >
            {({ hovered }: any) => (
                <>
                    <Icon
                        size={20}
                        color={active ? "#000000" : (hovered ? "#a3a3a3" : "#5e6267")}
                        style={{ marginRight: 12 }}
                    />
                    <Text
                        style={{
                            color: active ? "#000000" : (hovered ? "#a3a3a3" : "#5e6267"),
                            fontFamily: active
                                ? "Inter_600SemiBold"
                                : "Inter_500Medium",
                            fontSize: 15,
                        }}
                    >
                        {label}
                    </Text>
                </>
            )}
        </Pressable>
    );

    return (
        <View
            style={{
                paddingHorizontal: 16,
                marginBottom: 28,
            }}
        >
            {item("Dashboard", LuLayoutGrid, true)}
            {item("Active Trip", LuMapPin)}
            {item("Trip History", LuClipboardList)}
            {item("Earnings", LuBanknote)}
        </View>
    );
}

// ============================================================
// SWITCH ROLE
// ============================================================

function SwitchRole({ navigation, selectedRole, onNavigate }: { navigation: any, selectedRole?: Role, onNavigate?: () => void }) {
    return (
        <View
            style={{
                paddingHorizontal: 24,
            }}
        >
            <Text
                style={{
                    color: "#5e6267",
                    fontFamily: "Inter_700Bold",
                    fontSize: 11,
                    letterSpacing: 1.5,
                    marginBottom: 16,
                }}
            >
                SWITCH ROLE
            </Text>

            {ROLES.filter(
                (role) => role.id !== selectedRole?.id
            ).map((role) => (
                <Pressable
                    key={role.id}
                    onPress={() => {
                        onNavigate?.();
                        navigation.navigate("Role");
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <View
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: 9999,
                            backgroundColor: "#5e6267",
                            marginRight: 12,
                        }}
                    />

                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            color: "#5e6267",
                            fontFamily: "Inter_500Medium",
                            fontSize: 14,
                        }}
                    >
                        {role.title}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

// ============================================================
// DESKTOP SIDEBAR
// ============================================================

function DashboardSidebar({ navigation, selectedRole }: { navigation: any, selectedRole?: Role }) {
    return (
        <View
            style={{
                width: 260,
                flexShrink: 0,
                height: "100%",
                backgroundColor: "#090909",
                justifyContent: "space-between",
                paddingVertical: 24,
            }}
        >
            <View>
                <View
                    style={{
                        paddingHorizontal: 24,
                        marginBottom: 36,
                    }}
                >
                    <Logo />
                </View>

                <UserInfo selectedRole={selectedRole} />

                <NavItems onNavigate={() => { }} />

                <View
                    style={{
                        height: 1,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        width: "100%",
                        marginBottom: 24,
                    }}
                />

                <SwitchRole
                    navigation={navigation}
                    selectedRole={selectedRole}
                />
            </View>

            <View
                style={{
                    paddingHorizontal: 16,
                }}
            >
                <Pressable
                    onPress={() => navigation.navigate("Role")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 12,
                    }}
                >
                    {({ hovered }: any) => (
                        <>
                            <LuLogOut
                                size={20}
                                color={hovered ? "#ef4444" : "#5e6267"}
                                style={{ marginRight: 12 }}
                            />
                            <Text
                                style={{
                                    color: hovered ? "#ef4444" : "#5e6267",
                                    fontFamily: "Inter_500Medium",
                                    fontSize: 15,
                                }}
                            >
                                Sign Out
                            </Text>
                        </>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

// ============================================================
// MOBILE DRAWER
// ============================================================

function MobileDrawer({
    visible,
    onClose,
    navigation,
    selectedRole,
}: { visible: boolean, onClose: () => void, navigation: any, selectedRole?: Role }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        width: "82%",
                        maxWidth: 320,
                        backgroundColor: "#090909",
                        height: "100%",
                        justifyContent: "space-between",
                        paddingVertical: 24,
                    }}
                >
                    <View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 30,
                            }}
                        >
                            <Logo />
                        </View>

                        <UserInfo selectedRole={selectedRole} />

                        <NavItems onNavigate={onClose} />

                        <View
                            style={{
                                height: 1,
                                backgroundColor:
                                    "rgba(255,255,255,0.1)",
                                width: "100%",
                                marginBottom: 24,
                            }}
                        />

                        <SwitchRole
                            navigation={navigation}
                            selectedRole={selectedRole}
                            onNavigate={onClose}
                        />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 12,
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                onClose();
                                navigation.navigate("Role");
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                borderRadius: 12,
                            }}
                        >
                            {({ hovered }: any) => (
                                <>
                                    <LuLogOut
                                        size={20}
                                        color={hovered ? "#ef4444" : "#5e6267"}
                                        style={{ marginRight: 12 }}
                                    />
                                    <Text
                                        style={{
                                            color: hovered ? "#ef4444" : "#5e6267",
                                            fontFamily: "Inter_500Medium",
                                            fontSize: 15,
                                        }}
                                    >
                                        Sign Out
                                    </Text>
                                </>
                            )}
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    onPress={onClose}
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.55)",
                    }}
                />
            </View>
        </Modal>
    );
}

// ============================================================
// HEADER
// ============================================================

function DashboardHeader({ isMobile, onMenuPress }: { isMobile: boolean, onMenuPress: () => void }) {
    return (
        <View
            style={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderBottomWidth: 1,
                borderBottomColor: "#eeeeee",
                paddingHorizontal: isMobile ? 16 : 32,
                paddingVertical: isMobile ? 12 : 16,
                flexShrink: 0,
            }}
        >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                {isMobile && (
                    <Pressable
                        onPress={onMenuPress}
                        accessibilityLabel="Open menu"
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            backgroundColor: "#f4f4f4",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <View
                            style={{
                                width: 18,
                                height: 2,
                                backgroundColor: "#111111",
                                marginBottom: 4,
                            }}
                        />
                        <View
                            style={{
                                width: 18,
                                height: 2,
                                backgroundColor: "#111111",
                                marginBottom: 4,
                            }}
                        />
                        <View
                            style={{
                                width: 18,
                                height: 2,
                                backgroundColor: "#111111",
                            }}
                        />
                    </Pressable>
                )}

                {isMobile && (
                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            fontFamily: "ArchivoNarrow_700Bold",
                            fontSize: 22,
                            fontWeight: "700",
                            color: "#111111",
                        }}
                    >
                        Dashboard
                    </Text>
                )}

                <View
                    style={{
                        flex: isMobile ? 0 : 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {!isMobile && (
                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, marginRight: 24 }}>
                            <LuSearch size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Search..."
                                placeholderTextColor="#9ca3af"
                                style={{
                                    fontFamily: "Inter_400Regular",
                                    fontSize: 15,
                                    color: "#111111",
                                    flex: 1,
                                    /* @ts-ignore - outlineStyle not in default React Native types */
                                    outlineStyle: 'none',
                                }}
                            />
                        </View>
                    )}

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable
                            style={{
                                position: "relative",
                                marginRight: isMobile ? 14 : 24,
                            }}
                        >
                            <FaBell
                                size={20}
                                color="#454933"
                            />

                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#c4e900",
                                    borderWidth: 2,
                                    borderColor: "#ffffff",
                                    borderRadius: 9999,
                                }}
                            />
                        </Pressable>

                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 9999,
                                backgroundColor: "#ea580c",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontFamily: "Inter_700Bold",
                                    fontSize: 14,
                                }}
                            >
                                R
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

// ============================================================
// TRIP STAT
// ============================================================

function TripStat({ value, label }: { value: string, label: string }) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#151515",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                justifyContent: "center",
                minHeight: 76,
            }}
        >
            <Text
                style={{
                    color: "#c4e900",
                    fontFamily: "Inter_700Bold",
                    fontSize: 20,
                    marginBottom: 4,
                }}
            >
                {value}
            </Text>

            <Text
                style={{
                    color: "#5e6267",
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                }}
            >
                {label}
            </Text>
        </View>
    );
}

// ============================================================
// ACTIVE TRIP
// ============================================================

function ActiveTripCard({ isMobile }: { isMobile: boolean }) {
    return (
        <View
            style={{
                width: "100%",
                backgroundColor: "#0d0d0d",
                borderRadius: isMobile ? 18 : 24,
                padding: isMobile ? 18 : 32,
                marginBottom: isMobile ? 28 : 40,
            }}
        >
            {/* TRIP HEADER */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <View>
                    <Text style={{ fontFamily: "Inter_700Bold", fontSize: 12, color: "#c4e900", letterSpacing: 1, marginBottom: 4 }}>
                        ACTIVE TRIP
                    </Text>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#9ca3af" }}>
                        TR-0441
                    </Text>
                </View>
                <View style={{ backgroundColor: "#1c2a38", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 9999 }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: "#60a5fa" }}>
                        In Progress
                    </Text>
                </View>
            </View>

            {/* CUSTOMER */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: isMobile ? 24 : 32,
                }}
            >
                <View
                    style={{
                        width: 48,
                        height: 48,
                        backgroundColor: "#c4e900",
                        borderRadius: 9999,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 14,
                        flexShrink: 0,
                    }}
                >
                    <Text
                        style={{
                            color: "#000000",
                            fontFamily: "Inter_700Bold",
                            fontSize: 20,
                        }}
                    >
                        P
                    </Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            color: "#ffffff",
                            fontFamily: "Inter_700Bold",
                            fontSize: 18,
                        }}
                    >
                        Priya Nair
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={{
                            color: "#5e6267",
                            fontFamily: "Inter_400Regular",
                            fontSize: 13,
                            lineHeight: 18,
                            marginTop: 2,
                        }}
                    >
                        Toyota Innova Crysta · KA-01-AB-1234
                    </Text>
                </View>
            </View>

            {/* ROUTE */}
            <View
                style={{
                    marginBottom: isMobile ? 22 : 32,
                }}
            >
                {/* PICKUP */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            marginRight: 18,
                        }}
                    >
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 9999,
                                borderWidth: 5,
                                borderColor: "#c4e900",
                                backgroundColor: "#0d0d0d",
                            }}
                        />

                        <View
                            style={{
                                width: 1,
                                height: isMobile ? 48 : 56,
                                backgroundColor:
                                    "rgba(255,255,255,0.2)",
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            minWidth: 0,
                            paddingBottom: isMobile ? 22 : 30,
                        }}
                    >
                        <Text
                            style={{
                                color: "#5e6267",
                                fontFamily: "Inter_400Regular",
                                fontSize: 13,
                                marginBottom: 4,
                            }}
                        >
                            Pickup
                        </Text>

                        <Text
                            style={{
                                color: "#ffffff",
                                fontFamily: "Inter_700Bold",
                                fontSize: 15,
                                lineHeight: 21,
                            }}
                        >
                            12 MG Road, Bangalore
                        </Text>
                    </View>
                </View>

                {/* DROP OFF */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                    }}
                >
                    <View
                        style={{
                            marginRight: 18,
                        }}
                    >
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 9999,
                                borderWidth: 5,
                                borderColor: "#c4e900",
                                backgroundColor: "#0d0d0d",
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <Text
                            style={{
                                color: "#5e6267",
                                fontFamily: "Inter_400Regular",
                                fontSize: 13,
                                marginBottom: 4,
                            }}
                        >
                            Drop-off
                        </Text>

                        <Text
                            style={{
                                color: "#ffffff",
                                fontFamily: "Inter_700Bold",
                                fontSize: 15,
                                lineHeight: 21,
                            }}
                        >
                            Bangalore International Airport T2
                        </Text>
                    </View>
                </View>
            </View>

            {/* STATS */}
            <View
                style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: 12,
                    marginBottom: isMobile ? 22 : 32,
                }}
            >
                <TripStat
                    value="24.3 km"
                    label="Distance"
                />

                <TripStat
                    value="38 min"
                    label="ETA"
                />

                <TripStat
                    value="₹1,240"
                    label="Fare"
                />
            </View>

            {/* ACTIONS */}
            <View
                style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: 12,
                }}
            >
                <Pressable
                    style={({ pressed }) => ({
                        flex: isMobile ? undefined : 3,
                        minHeight: 54,
                        borderRadius: 9999,
                        backgroundColor: pressed
                            ? "#b3d400"
                            : "#c4e900",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 18,
                    })}
                >
                    <FaCheck
                        size={16}
                        color="#000000"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={{
                            color: "#000000",
                            fontFamily: "Inter_700Bold",
                            fontSize: 15,
                        }}
                    >
                        Customer Picked Up
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => ({
                        flex: isMobile ? undefined : 1,
                        minHeight: 54,
                        borderRadius: 9999,
                        backgroundColor: pressed
                            ? "#252828"
                            : "#191b1b",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 18,
                    })}
                >
                    <LuPhone
                        size={18}
                        color="#ffffff"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={{
                            color: "#ffffff",
                            fontFamily: "Inter_700Bold",
                            fontSize: 15,
                        }}
                    >
                        Call
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

// ============================================================
// COMPLETED TRIPS
// ============================================================

function CompletedTrips({ isMobile }: { isMobile: boolean }) {
    return (
        <View
            style={{
                width: "100%",
            }}
        >
            <Text
                style={{
                    fontFamily: "ArchivoNarrow_700Bold",
                    fontSize: isMobile ? 24 : 28,
                    fontWeight: "700",
                    lineHeight: isMobile ? 28 : 32,
                    color: "#000000",
                    marginBottom: 18,
                }}
            >
                Today's Completed Trips
            </Text>

            {COMPLETED_TRIPS.map((trip: any, idx: number) => (
                <View
                    key={idx}
                    style={{
                        width: "100%",
                        flexDirection: isMobile
                            ? "column"
                            : "row",
                        justifyContent: "space-between",
                        alignItems: isMobile
                            ? "flex-start"
                            : "center",
                        backgroundColor: "#fafafa",
                        padding: isMobile ? 16 : 24,
                        borderRadius: 16,
                        marginBottom: 12,
                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                fontFamily: "Inter_700Bold",
                                color: "#000000",
                                fontSize: 16,
                                marginBottom: 4,
                            }}
                        >
                            {trip.name}
                        </Text>

                        <Text
                            numberOfLines={2}
                            style={{
                                fontFamily: "Inter_400Regular",
                                color: "#9ca3af",
                                fontSize: 13,
                                lineHeight: 18,
                            }}
                        >
                            {trip.route}
                        </Text>
                    </View>

                    <View
                        style={{
                            alignItems: isMobile
                                ? "flex-start"
                                : "flex-end",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Inter_700Bold",
                                color: "#000000",
                                fontSize: 16,
                                marginBottom: 4,
                            }}
                        >
                            {trip.price}
                        </Text>

                        <Text
                            style={{
                                fontFamily: "Inter_400Regular",
                                color: "#9ca3af",
                                fontSize: 13,
                            }}
                        >
                            {trip.time}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

// ============================================================
// MAIN CONTENT
// ============================================================

function DriverDashboardContent({ isMobile }: { isMobile: boolean }) {
    return (
        <ScrollView
            style={{
                flex: 1,
                width: "100%",
                backgroundColor: "#ffffff",
            }}
            contentContainerStyle={{
                width: "100%",
                paddingHorizontal: isMobile ? 16 : 32,
                paddingTop: isMobile ? 20 : 32,
                paddingBottom: 48,
                alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View
                style={{
                    width: "100%",
                    maxWidth: 800,
                }}
            >
                {/* TOP HEADER SECTION */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", color: "#111111", marginBottom: 8 }}>
                        Driver Console
                    </Text>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: "#5e6267" }}>
                        Rahul D. · KA-01-CD-5678 · Online
                    </Text>
                </View>

                {/* 3 STATS CARDS */}
                <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: 40 }}>
                    {/* Card 1 */}
                    <Pressable style={({ pressed }) => ({ flex: 1, backgroundColor: "#ffffff", borderRadius: 16, padding: 24, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, opacity: pressed ? 0.7 : 1 })}>
                        <Text style={{ fontSize: 24, marginBottom: 12 }}>🗂️</Text>
                        <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 24, fontWeight: "700", color: "#111111", marginBottom: 4 }}>4</Text>
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#9ca3af" }}>Trips Today</Text>
                    </Pressable>

                    {/* Card 2 */}
                    <Pressable style={({ pressed }) => ({ flex: 1, backgroundColor: "#ffffff", borderRadius: 16, padding: 24, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, opacity: pressed ? 0.7 : 1 })}>
                        <LuBanknote size={24} color="#111111" style={{ marginBottom: 12 }} />
                        <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 24, fontWeight: "700", color: "#111111", marginBottom: 4 }}>₹3,680</Text>
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#9ca3af" }}>Earnings</Text>
                    </Pressable>

                    {/* Card 3 */}
                    <Pressable style={({ pressed }) => ({ flex: 1, backgroundColor: "#ffffff", borderRadius: 16, padding: 24, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, opacity: pressed ? 0.7 : 1 })}>
                        <View style={{ marginBottom: 12, flexDirection: "row", alignItems: "center" }}>
                            <FaStar size={20} color="#111111" />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                            <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 24, fontWeight: "700", color: "#111111" }}>4.91</Text>
                            <FaStar size={14} color="#111111" style={{ marginLeft: 4 }} />
                        </View>
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#9ca3af" }}>Rating</Text>
                    </Pressable>
                </View>

                <ActiveTripCard isMobile={isMobile} />

                <CompletedTrips
                    isMobile={isMobile}
                />
            </View>
        </ScrollView>
    );
}

// ============================================================
// DASHBOARD SCREEN
// ============================================================

export default function DashboardScreen({
    navigation,
    route,
}: DashboardScreenProps) {
    const { width } = useWindowDimensions();

    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const selectedRole = route?.params?.selectedRole;

    const isMobile = width < MOBILE_BREAKPOINT;

    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                minWidth: 0,
                minHeight: 0,
                flexDirection: isMobile
                    ? "column"
                    : "row",
                backgroundColor: "#ffffff",
            }}
        >
            {/* DESKTOP SIDEBAR ONLY */}
            {!isMobile && (
                <DashboardSidebar
                    navigation={navigation}
                    selectedRole={selectedRole}
                />
            )}

            {/* MAIN DASHBOARD */}
            <View
                style={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: 0,
                    width: isMobile
                        ? "100%"
                        : undefined,
                    backgroundColor: "#ffffff",
                }}
            >
                <DashboardHeader
                    isMobile={isMobile}
                    onMenuPress={() =>
                        setMobileMenuOpen(true)
                    }
                />

                <DriverDashboardContent
                    isMobile={isMobile}
                />
            </View>

            {/* MOBILE SIDEBAR */}
            {isMobile && (
                <MobileDrawer
                    visible={mobileMenuOpen}
                    onClose={() =>
                        setMobileMenuOpen(false)
                    }
                    navigation={navigation}
                    selectedRole={selectedRole}
                />
            )}
        </View>
    );
}
