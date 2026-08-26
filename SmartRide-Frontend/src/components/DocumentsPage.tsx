import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DocumentsPage() {
  const documents = [
    {
      title: "Driving License",
      subtitle: "Verified",
      icon: "card-outline" as const,
    },
    {
      title: "Aadhaar Card",
      subtitle: "Verified",
      icon: "document-text-outline" as const,
    },
    {
      title: "Rental Agreement",
      subtitle: "Available",
      icon: "reader-outline" as const,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Documents</Text>

        <Text style={styles.subtitle}>
          Manage your personal and rental documents
        </Text>
      </View>

      {/* DOCUMENT CARDS */}
      {documents.map((document) => (
        <View key={document.title} style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons
              name={document.icon}
              size={26}
              color="#111"
            />
          </View>

          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>
              {document.title}
            </Text>

            <Text style={styles.documentStatus}>
              {document.subtitle}
            </Text>
          </View>

          <Pressable style={styles.viewButton}>
            <Text style={styles.viewButtonText}>
              View
            </Text>
          </Pressable>
        </View>
      ))}

      {/* UPLOAD */}
      <Pressable style={styles.uploadCard}>
        <View style={styles.uploadIcon}>
          <Ionicons
            name="cloud-upload-outline"
            size={28}
            color="#111"
          />
        </View>

        <View>
          <Text style={styles.uploadTitle}>
            Upload a Document
          </Text>

          <Text style={styles.uploadSubtitle}>
            Add another document to your account
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  content: {
    padding: 32,
    paddingBottom: 60,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0B0D0C",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#7B8493",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#B4F000",
    alignItems: "center",
    justifyContent: "center",
  },

  documentInfo: {
    flex: 1,
    marginLeft: 16,
  },

  documentTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  documentStatus: {
    marginTop: 5,
    fontSize: 14,
    color: "#18A566",
    fontWeight: "600",
  },

  viewButton: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  viewButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  uploadCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  uploadIcon: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  uploadTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
  },

  uploadSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#858D99",
  },
});