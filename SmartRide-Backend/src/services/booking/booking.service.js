const crypto =
  require("crypto");

const mongoose =
  require("mongoose");


const bookingRepository =
  require(
    "../../repositories/booking/booking.repository"
  );


const vehicleRepository =
  require(
    "../../repositories/vehicle/vehicle.repository"
  );


const customerRepository =
  require(
    "../../repositories/customer/customer.repository"
  );


const AppError =
  require(
    "../../utils/AppError"
  );


const {
  bookingDTO,
} =
  require(
    "../../dto/booking/booking.dto"
  );



function generateBookingCode() {

  const random =
    crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();

  return `VR-${Date.now()}-${random}`;

}



function calculateRentalDays(
  startDate,
  endDate
) {

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;


  const difference =
    endDate.getTime() -
    startDate.getTime();


  return Math.ceil(
    difference /
    millisecondsPerDay
  );

}



// ======================================
// CREATE BOOKING
// ======================================

exports.createBooking =
  async (
    customerUserId,
    payload
  ) => {

    const {
      vehicleId,
      startDate,
      endDate,
    } = payload;


    // -------------------------
    // Validate Customer
    // -------------------------

    const customer =
      await customerRepository
        .findByUserId(
          customerUserId
        );


    if (!customer) {

      throw new AppError(
        "Customer profile not found",
        404
      );

    }


    if (customer.isBlocked) {

      throw new AppError(
        "Customer account is blocked",
        403
      );

    }


    // -------------------------
    // Validate Vehicle ID
    // -------------------------

    if (
      !mongoose
        .isValidObjectId(
          vehicleId
        )
    ) {

      throw new AppError(
        "Invalid vehicle id",
        400
      );

    }


    // -------------------------
    // Find Vehicle
    // -------------------------

    const vehicle =
      await vehicleRepository
        .findById(
          vehicleId
        );


    if (!vehicle) {

      throw new AppError(
        "Vehicle not found",
        404
      );

    }


    // -------------------------
    // Vehicle checks
    // -------------------------

    if (!vehicle.isActive) {

      throw new AppError(
        "Vehicle is inactive",
        400
      );

    }


    if (!vehicle.isApproved) {

      throw new AppError(
        "Vehicle is not approved",
        400
      );

    }


    if (!vehicle.isAvailable) {

      throw new AppError(
        "Vehicle is currently unavailable",
        409
      );

    }


    // -------------------------
    // Date validation
    // -------------------------

    const now =
      new Date();


    if (
      startDate <= now
    ) {

      throw new AppError(
        "Booking start date must be in the future",
        400
      );

    }


    // -------------------------
    // Check double booking
    // -------------------------

    const conflict =
      await bookingRepository
        .hasConflict(
          vehicleId,
          startDate,
          endDate
        );


    if (conflict) {

      throw new AppError(
        "Vehicle is already booked for the selected dates",
        409
      );

    }


    // -------------------------
    // Calculate Price
    // -------------------------

    const rentalDays =
      calculateRentalDays(
        startDate,
        endDate
      );


    if (
      rentalDays < 1
    ) {

      throw new AppError(
        "Minimum rental duration is one day",
        400
      );

    }


    const pricePerDay =
      vehicle.pricePerDay;


    const subtotal =
      pricePerDay *
      rentalDays;


    // Configure these later
    // according to your business.
    const taxAmount =
      0;


    const securityDeposit =
      0;


    const totalAmount =
      subtotal +
      taxAmount +
      securityDeposit;


    // vehicle.vendorId may be
    // populated by Vehicle repository.
    const vendorId =
      vehicle.vendorId?._id ||
      vehicle.vendorId;


    // -------------------------
    // Create Booking
    // -------------------------

    const booking =
      await bookingRepository
        .create({

          bookingCode:
            generateBookingCode(),

          customerId:
            customerUserId,

          vendorId,

          vehicleId,

          startDate,

          endDate,

          pricing: {

            pricePerDay,

            rentalDays,

            subtotal,

            taxAmount,

            securityDeposit,

            totalAmount,

          },

          status:
            "PENDING_PAYMENT",

          paymentStatus:
            "PENDING",

        });


    const populatedBooking =
      await bookingRepository
        .findById(
          booking._id
        );


    return bookingDTO(
      populatedBooking
    );

  };



// ======================================
// CUSTOMER BOOKINGS
// ======================================

exports.getMyBookings =
  async (
    customerUserId
  ) => {

    const bookings =
      await bookingRepository
        .findCustomerBookings(
          customerUserId
        );


    return bookings.map(
      bookingDTO
    );

  };



// ======================================
// VENDOR BOOKINGS
// ======================================

exports.getVendorBookings =
  async (
    vendorUserId
  ) => {

    const bookings =
      await bookingRepository
        .findVendorBookings(
          vendorUserId
        );


    return bookings.map(
      bookingDTO
    );

  };



// ======================================
// GET ONE BOOKING
// ======================================

exports.getBookingById =
  async (
    bookingId,
    user
  ) => {

    if (
      !mongoose
        .isValidObjectId(
          bookingId
        )
    ) {

      throw new AppError(
        "Invalid booking id",
        400
      );

    }


    const booking =
      await bookingRepository
        .findById(
          bookingId
        );


    if (!booking) {

      throw new AppError(
        "Booking not found",
        404
      );

    }


    const customerId =
      booking.customerId?._id
        ?.toString();


    const vendorId =
      booking.vendorId?._id
        ?.toString();


    const userId =
      user.id.toString();


    const allowed =
      user.role === "ADMIN" ||
      customerId === userId ||
      vendorId === userId;


    if (!allowed) {

      throw new AppError(
        "You are not authorized to view this booking",
        403
      );

    }


    return bookingDTO(
      booking
    );

  };



// ======================================
// CUSTOMER CANCEL BOOKING
// ======================================

exports.cancelBooking =
  async (
    bookingId,
    customerUserId,
    reason
  ) => {

    const booking =
      await bookingRepository
        .findById(
          bookingId
        );


    if (!booking) {

      throw new AppError(
        "Booking not found",
        404
      );

    }


    if (
      booking.customerId
        ._id
        .toString() !==
      customerUserId.toString()
    ) {

      throw new AppError(
        "You cannot cancel this booking",
        403
      );

    }


    const cancellableStatuses =
      [
        "PENDING_PAYMENT",
        "CONFIRMED",
      ];


    if (
      !cancellableStatuses
        .includes(
          booking.status
        )
    ) {

      throw new AppError(
        `Booking cannot be cancelled when status is ${booking.status}`,
        409
      );

    }


    if (
      new Date() >=
      booking.startDate
    ) {

      throw new AppError(
        "Rental has already started or start time has passed",
        409
      );

    }


    const update = {

      status:
        "CANCELLED",

      cancellation: {

        cancelledBy:
          "CUSTOMER",

        reason,

        cancelledAt:
          new Date(),

      },

    };


    // When payment module is integrated,
    // PAID bookings should start refund flow.

    if (
      booking.paymentStatus ===
      "PAID"
    ) {

      update.paymentStatus =
        "REFUND_PENDING";

    }


    const updated =
      await bookingRepository
        .updateById(
          bookingId,
          update
        );


    return bookingDTO(
      updated
    );

  };



// ======================================
// START RENTAL
// ======================================

exports.startRental =
  async (
    bookingId,
    vendorUserId
  ) => {

    const booking =
      await bookingRepository
        .findById(
          bookingId
        );


    if (!booking) {

      throw new AppError(
        "Booking not found",
        404
      );

    }


    if (
      booking.vendorId
        ._id
        .toString() !==
      vendorUserId.toString()
    ) {

      throw new AppError(
        "This booking does not belong to your vehicle",
        403
      );

    }


    if (
      booking.status !==
      "CONFIRMED"
    ) {

      throw new AppError(
        "Only confirmed bookings can be started",
        409
      );

    }


    const updated =
      await bookingRepository
        .updateById(
          bookingId,
          {

            status:
              "ACTIVE",

            startedAt:
              new Date(),

          }
        );


    return bookingDTO(
      updated
    );

  };



// ======================================
// COMPLETE RENTAL
// ======================================

exports.completeRental =
  async (
    bookingId,
    vendorUserId
  ) => {

    const booking =
      await bookingRepository
        .findById(
          bookingId
        );


    if (!booking) {

      throw new AppError(
        "Booking not found",
        404
      );

    }


    if (
      booking.vendorId
        ._id
        .toString() !==
      vendorUserId.toString()
    ) {

      throw new AppError(
        "This booking does not belong to your vehicle",
        403
      );

    }


    if (
      booking.status !==
      "ACTIVE"
    ) {

      throw new AppError(
        "Only active bookings can be completed",
        409
      );

    }


    const updated =
      await bookingRepository
        .updateById(
          bookingId,
          {

            status:
              "COMPLETED",

            completedAt:
              new Date(),

          }
        );


    return bookingDTO(
      updated
    );

  };