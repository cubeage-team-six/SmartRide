const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    businessName: {
      type: String,
      trim: true,
      default: null,
    },

    businessType: {
      type: String,
      enum: [
        "INDIVIDUAL",
        "PROPRIETORSHIP",
        "PARTNERSHIP",
        "COMPANY",
      ],
      default: "INDIVIDUAL",
    },

    profileImage: {
      type: String,
      default: null,
    },

    businessEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },

    businessPhone: {
      type: String,
      trim: true,
      default: null,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },

    address: {
      addressLine1: {
        type: String,
        trim: true,
      },

      addressLine2: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      country: {
        type: String,
        default: "India",
      },

      postalCode: {
        type: String,
        trim: true,
      },
    },

    kyc: {
      panNumber: {
        type: String,
        trim: true,
        uppercase: true,
      },

      panDocumentUrl: {
        type: String,
      },

      identityDocumentType: {
        type: String,
        enum: [
          "AADHAAR",
          "PASSPORT",
          "VOTER_ID",
          "DRIVING_LICENSE",
        ],
      },

      identityDocumentUrl: {
        type: String,
      },

      verificationStatus: {
        type: String,
        enum: [
          "NOT_SUBMITTED",
          "PENDING",
          "VERIFIED",
          "REJECTED",
        ],
        default: "NOT_SUBMITTED",
        index: true,
      },

      rejectionReason: {
        type: String,
        default: null,
      },
    },

    approvalStatus: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "SUSPENDED",
      ],
      default: "PENDING",
      index: true,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Vendor",
  vendorSchema
);// TODO: implement this module in the next sprint.
