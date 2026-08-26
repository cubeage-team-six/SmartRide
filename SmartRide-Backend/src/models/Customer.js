// TODO: implement this module in the next sprint.
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        profileImage: {
            type: String,
            default: null,
        },

        dateOfBirth: {
            type: Date,
            default: null,
        },

        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER"],
            default: null,
        },

        emergencyContact: {
            name: {
                type: String,
                trim: true,
            },

            phone: {
                type: String,
                trim: true,
            },

            relation: {
                type: String,
                trim: true,
            },
        },

        address: {
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            country: {
                type: String,
                default: "India",
            },
            postalCode: String,
        },

        drivingLicense: {
            licenseNumber: {
                type: String,
                trim: true,
            },

            documentUrl: {
                type: String,
            },

            expiryDate: {
                type: Date,
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
            },

            rejectionReason: {
                type: String,
                default: null,
            },
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
    "Customer",
    customerSchema
);