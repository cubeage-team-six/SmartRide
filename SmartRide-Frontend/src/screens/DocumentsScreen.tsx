import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../components/AppShell";
import { useCustomerProfile, DocumentItem } from "../context/CustomerProfileContext";
import type { DocumentsScreenProps } from "../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

export default function DocumentsScreen({ navigation }: DocumentsScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const { documents, uploadDocument } = useCustomerProfile();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const handleUpload = (docId: number, docTitle: string) => {
    const webDoc = (globalThis as any).document;
    if (Platform.OS === "web" && webDoc) {
      const input = webDoc.createElement("input");
      input.type = "file";
      input.accept = ".pdf,.jpg,.jpeg,.png";
      input.onchange = (e: any) => {
        const file = e.target?.files?.[0];
        if (file) {
          const fileName = file.name || `${docTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
          uploadDocument(docId, { name: fileName });
          setUploadToast(`"${fileName}" uploaded and verified successfully!`);
          setTimeout(() => setUploadToast(null), 4000);
        }
      };
      input.click();
    } else {
      const fileName = `${docTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_doc.pdf`;
      uploadDocument(docId, { name: fileName });
      Alert.alert(
        "Document Uploaded",
        `"${docTitle}" has been uploaded and verified successfully.`
      );
    }
  };

  const handleView = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setModalVisible(true);
  };

  const uploadedCount = documents.filter((d) => d.uploaded).length;
  const verificationPercent = Math.round((uploadedCount / documents.length) * 100);

  return (
    <AppShell placeholder="Search documents...">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
        ]}
        showsVerticalScrollIndicator
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Documents & KYC
          </Text>
          <Text style={styles.subtitle}>
            Upload and manage your identity, address proof, and driving permits
          </Text>
        </View>

        {/* TOAST NOTIFICATION */}
        {uploadToast && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={20} color="#15803D" />
            <Text style={styles.toastText}>{uploadToast}</Text>
          </View>
        )}

        {/* VERIFICATION STATUS BANNER */}
        <View style={[styles.statusBanner, isMobile && styles.statusBannerMobile]}>
          <View style={styles.bannerIconBox}>
            <Ionicons name="shield-checkmark" size={26} color="#15803D" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.bannerTitleRow}>
              <Text style={styles.bannerTitle}>
                Account {verificationPercent}% Verified
              </Text>
              <Text style={styles.bannerProgressText}>
                {uploadedCount} of {documents.length} Completed
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${verificationPercent}%` }]} />
            </View>
            <Text style={styles.bannerSubtitle}>
              {verificationPercent === 100
                ? "All required KYC documents are verified. You can rent any vehicle instantly!"
                : "Upload remaining documents to unlock luxury SUVs, supercars, and commercial trucks."}
            </Text>
          </View>
        </View>

        {/* DOCUMENT LIST */}
        <View style={styles.docList}>
          {documents.map((doc) => (
            <View
              key={doc.id}
              style={[styles.docCard, isMobile && styles.docCardMobile]}
            >
              <View style={styles.docIconBox}>
                <Ionicons name={doc.icon} size={28} color={BLACK} />
              </View>

              <View style={styles.docInfo}>
                <View style={styles.docTitleRow}>
                  <Text style={styles.docTitle}>{doc.title}</Text>
                  {doc.uploaded ? (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={13} color="#15803D" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  ) : (
                    <View style={styles.pendingBadge}>
                      <Ionicons name="alert-circle-outline" size={13} color="#64748B" />
                      <Text style={styles.pendingText}>Not Uploaded</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.docExpiry}>{doc.expiry}</Text>
                {doc.fileName && (
                  <View style={styles.fileRow}>
                    <Ionicons name="attach-outline" size={14} color={MUTED} />
                    <Text style={styles.fileNameText}>{doc.fileName}</Text>
                  </View>
                )}
              </View>

              <View style={styles.docActions}>
                {doc.uploaded ? (
                  <View style={styles.actionGroup}>
                    <Pressable
                      onPress={() => handleView(doc)}
                      style={styles.viewButton}
                    >
                      <Ionicons name="eye-outline" size={16} color={BLACK} />
                      <Text style={styles.viewButtonText}>View</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleUpload(doc.id, doc.title)}
                      style={styles.reuploadButton}
                    >
                      <Ionicons name="refresh-outline" size={16} color="#64748B" />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => handleUpload(doc.id, doc.title)}
                    style={styles.uploadButton}
                  >
                    <Ionicons name="cloud-upload-outline" size={17} color={BLACK} />
                    <Text style={styles.uploadButtonText}>Upload File</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* DOCUMENT PREVIEW MODAL */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleRow}>
                  <Ionicons
                    name={selectedDoc?.icon || "document-text-outline"}
                    size={24}
                    color={BLACK}
                  />
                  <Text style={styles.modalTitle}>{selectedDoc?.title}</Text>
                </View>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.closeModalBtn}
                >
                  <Ionicons name="close" size={22} color={BLACK} />
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.docPreviewPlaceholder}>
                  <Ionicons name="document-attach" size={54} color={BLACK} />
                  <Text style={styles.previewDocName}>
                    {selectedDoc?.fileName || `${selectedDoc?.title}.pdf`}
                  </Text>
                  <View style={styles.verifiedBadgeModal}>
                    <Ionicons name="checkmark-circle" size={14} color="#15803D" />
                    <Text style={styles.verifiedTextModal}>Digitally Verified</Text>
                  </View>
                </View>

                <View style={styles.docDetailsBox}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Document Type</Text>
                    <Text style={styles.detailValue}>{selectedDoc?.title}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <Text style={styles.detailValue}>{selectedDoc?.status}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Validity</Text>
                    <Text style={styles.detailValue}>{selectedDoc?.expiry}</Text>
                  </View>
                </View>
              </View>

              <Pressable
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeBtnText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
  header: {
    marginBottom: 24,
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
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  toastText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#166534",
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    borderRadius: 20,
    padding: 22,
    gap: 18,
    marginBottom: 28,
  },
  statusBannerMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  bannerIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#166534",
  },
  bannerProgressText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#15803D",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DCFCE7",
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#15803D",
    lineHeight: 18,
  },
  docList: {
    gap: 16,
  },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 22,
    gap: 18,
  },
  docCardMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  docIconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  docInfo: {
    flex: 1,
  },
  docTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  docTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: BLACK,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
  },
  pendingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pendingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  docExpiry: {
    marginTop: 4,
    fontSize: 14,
    color: MUTED,
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B82F6",
  },
  docActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
  },
  reuploadButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: GREEN,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: BLACK,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 26,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: BLACK,
  },
  closeModalBtn: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 24,
  },
  docPreviewPlaceholder: {
    height: 140,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  previewDocName: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
    marginTop: 8,
  },
  verifiedBadgeModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  verifiedTextModal: {
    fontSize: 11,
    fontWeight: "700",
    color: "#15803D",
  },
  docDetailsBox: {
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  detailLabel: {
    fontSize: 14,
    color: MUTED,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
  },
  closeBtn: {
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: BLACK,
  },
});
