// TODO: implement this module in the next sprint.
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    pricing: {
      pricePerDay: {
        type: Number,
        required: true,
      },

      rentalDays: {
        type: Number,
        required: true,
      },

      subtotal: {
        type: Number,
        required: true,
      },

      taxAmount: {
        type: Number,
        default: 0,
      },

      securityDeposit: {
        type: Number,
        default: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
      },
    },

    status: {
      type: String,

      enum: [
        "PENDING_PAYMENT",
        "CONFIRMED",
        "ACTIVE",
        "COMPLETED",
        "CANCELLED",
        "EXPIRED",
      ],

      default: "PENDING_PAYMENT",

      index: true,
    },

    paymentStatus: {
      type: String,

      enum: [
        "PENDING",
        "PAID",
        "FAILED",
        "REFUND_PENDING",
        "REFUNDED",
      ],

      default: "PENDING",
    },

    cancellation: {
      cancelledBy: {
        type: String,

        enum: [
          "CUSTOMER",
          "VENDOR",
          "ADMIN",
        ],
      },

      reason: {
        type: String,
      },

      cancelledAt: {
        type: Date,
      },
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// Helps searching booking conflicts
bookingSchema.index({
  vehicleId: 1,
  startDate: 1,
  endDate: 1,
  status: 1,
});


bookingSchema.index({
  customerId: 1,
  createdAt: -1,
});


bookingSchema.index({
  vendorId: 1,
  createdAt: -1,
});


module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );
