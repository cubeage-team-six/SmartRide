import React, { createContext, useContext, useState, ReactNode } from "react";

/* =========================================================
   TYPES
========================================================= */

export type DocumentItem = {
  id: number;
  title: string;
  expiry: string;
  uploaded: boolean;
  fileName?: string;
  fileUri?: string;
  icon: string;
  status: "Verified" | "Pending" | "Uploaded" | "Not Uploaded";
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  type: "booking" | "pickup" | "payment" | "system";
  icon: string;
};

export type CustomerSettings = {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  bookingConfirmation: boolean;
  pickupReminder: boolean;
  returnReminder: boolean;
  paymentUpdates: boolean;
  darkMode: boolean;
  language: string;
  currency: string;
};

export type CustomerProfile = {
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  role: string;
  avatarLetter: string;
  kycVerified: boolean;
  memberSince: string;
  totalBookings: number;
  totalSpent: string;
  loyaltyPoints: number;
};

interface CustomerProfileContextType {
  profile: CustomerProfile;
  updateProfile: (updated: Partial<CustomerProfile>) => void;
  documents: DocumentItem[];
  uploadDocument: (id: number, fileInfo?: { name: string; uri?: string }) => void;
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  settings: CustomerSettings;
  updateSettings: (updated: Partial<CustomerSettings>) => void;
}

/* =========================================================
   INITIAL DATA
========================================================= */

const initialProfile: CustomerProfile = {
  fullName: "Arjun Mehta",
  email: "arjun.mehta@gmail.com",
  mobile: "+91 98765 43210",
  dob: "1992-06-14",
  gender: "Male",
  address: "124, 4th Cross, Indiranagar",
  city: "Bangalore",
  state: "Karnataka",
  pin: "560001",
  role: "Customer",
  avatarLetter: "A",
  kycVerified: true,
  memberSince: "2023",
  totalBookings: 14,
  totalSpent: "₹41,280",
  loyaltyPoints: 2340,
};

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    title: "Driving Licence",
    expiry: "Expiry: Jan 2030",
    uploaded: true,
    fileName: "driving_licence_front.pdf",
    icon: "card-outline",
    status: "Verified",
  },
  {
    id: 2,
    title: "Aadhaar Card / ID",
    expiry: "Expiry: Lifetime",
    uploaded: true,
    fileName: "aadhaar_card_masked.pdf",
    icon: "id-card-outline",
    status: "Verified",
  },
  {
    id: 3,
    title: "Address Proof",
    expiry: "Expiry: Dec 2026",
    uploaded: true,
    fileName: "electricity_bill.pdf",
    icon: "home-outline",
    status: "Verified",
  },
  {
    id: 4,
    title: "Passport",
    expiry: "Expiry: —",
    uploaded: false,
    icon: "book-outline",
    status: "Not Uploaded",
  },
  {
    id: 5,
    title: "PAN Card",
    expiry: "Expiry: —",
    uploaded: false,
    icon: "document-text-outline",
    status: "Not Uploaded",
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Booking Confirmed",
    message: "Your booking for Mahindra Thar LX (#BK-2024-0871) has been confirmed.",
    time: "10 mins ago",
    date: "Today",
    read: false,
    type: "booking",
    icon: "checkmark-circle-outline",
  },
  {
    id: "notif-2",
    title: "Vehicle Pickup Reminder",
    message: "Your vehicle pickup is scheduled for tomorrow at 10:00 AM from Indiranagar Hub.",
    time: "2 hours ago",
    date: "Today",
    read: false,
    type: "pickup",
    icon: "time-outline",
  },
  {
    id: "notif-3",
    title: "Payment Successful",
    message: "Payment of ₹5,850 for booking #BK-2024-0871 was received successfully.",
    time: "Yesterday",
    date: "Aug 10, 2025",
    read: true,
    type: "payment",
    icon: "card-outline",
  },
  {
    id: "notif-4",
    title: "Booking Completed",
    message: "We hope you enjoyed your ride with Honda Activa 6G! Rate your experience.",
    time: "3 days ago",
    date: "Aug 8, 2025",
    read: true,
    type: "booking",
    icon: "star-outline",
  },
  {
    id: "notif-5",
    title: "Security Deposit Refunded",
    message: "Security deposit of ₹500 for BK-2024-0856 has been credited to your original payment source.",
    time: "5 days ago",
    date: "Aug 6, 2025",
    read: true,
    type: "payment",
    icon: "wallet-outline",
  },
];

const initialSettings: CustomerSettings = {
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: true,
  whatsappNotifications: true,
  bookingConfirmation: true,
  pickupReminder: true,
  returnReminder: true,
  paymentUpdates: true,
  darkMode: false,
  language: "English",
  currency: "INR (₹)",
};

/* =========================================================
   CONTEXT & PROVIDER
========================================================= */

const CustomerProfileContext = createContext<CustomerProfileContextType | undefined>(undefined);

export function CustomerProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<CustomerProfile>(initialProfile);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [settings, setSettings] = useState<CustomerSettings>(initialSettings);

  const updateProfile = (updated: Partial<CustomerProfile>) => {
    setProfile((prev) => {
      const newFullName = updated.fullName !== undefined ? updated.fullName : prev.fullName;
      const avatarLetter = newFullName.trim().length > 0 ? newFullName.trim()[0].toUpperCase() : "A";
      return {
        ...prev,
        ...updated,
        avatarLetter,
      };
    });
  };

  const uploadDocument = (id: number, fileInfo?: { name: string; uri?: string }) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const fileName = fileInfo?.name || `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_doc.pdf`;
          const expiry =
            doc.title.includes("Passport")
              ? "Expiry: Jan 2035"
              : doc.title.includes("PAN")
              ? "Expiry: Lifetime"
              : "Expiry: Lifetime";

          return {
            ...doc,
            uploaded: true,
            fileName,
            fileUri: fileInfo?.uri,
            expiry,
            status: "Verified",
          };
        }
        return doc;
      })
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const updateSettings = (updated: Partial<CustomerSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <CustomerProfileContext.Provider
      value={{
        profile,
        updateProfile,
        documents,
        uploadDocument,
        notifications,
        markAsRead,
        markAllAsRead,
        unreadCount,
        settings,
        updateSettings,
      }}
    >
      {children}
    </CustomerProfileContext.Provider>
  );
}

export function useCustomerProfile() {
  const context = useContext(CustomerProfileContext);
  if (!context) {
    throw new Error("useCustomerProfile must be used within a CustomerProfileProvider");
  }
  return context;
}
