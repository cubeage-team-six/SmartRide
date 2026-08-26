const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: ["BIKE", "SCOOTER", "HATCHBACK", "SEDAN", "SUV", "LUXURY"],
      required: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    fuelType: {
      type: String,
      enum: ["PETROL", "DIESEL", "CNG", "EV", "HYBRID"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["MANUAL", "AUTOMATIC"],
      required: true,
    },
    seats: {
      type: Number,
      min: 1,
      default: 2,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 1,
    },
    images: [
      {
        type: String,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.index({
  category: 1,
  city: 1,
  isAvailable: 1,
  isApproved: 1,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
