const Booking =
  require(
    "../../models/Booking"
  );


exports.create =
  (data) => {

    return Booking.create(
      data
    );

  };


exports.findById =
  (bookingId) => {

    return Booking
      .findById(
        bookingId
      )

      .populate(
        "customerId",
        "name email phone"
      )

      .populate(
        "vendorId",
        "name email phone"
      )

      .populate(
        "vehicleId",
        "brand model category registrationNumber city images"
      );

  };


exports.findCustomerBookings =
  (customerId) => {

    return Booking
      .find({
        customerId,
      })

      .populate(
        "vehicleId",
        "brand model category registrationNumber city images"
      )

      .sort({
        createdAt: -1,
      });

  };


exports.findVendorBookings =
  (vendorId) => {

    return Booking
      .find({
        vendorId,
      })

      .populate(
        "customerId",
        "name email phone"
      )

      .populate(
        "vehicleId",
        "brand model category registrationNumber city"
      )

      .sort({
        createdAt: -1,
      });

  };


exports.hasConflict =
  async (
    vehicleId,
    startDate,
    endDate
  ) => {

    const booking =
      await Booking.findOne({

        vehicleId,

        status: {
          $in: [
            "PENDING_PAYMENT",
            "CONFIRMED",
            "ACTIVE",
          ],
        },

        startDate: {
          $lt: endDate,
        },

        endDate: {
          $gt: startDate,
        },

      });

    return Boolean(
      booking
    );

  };


exports.updateById =
  (
    bookingId,
    data
  ) => {

    return Booking
      .findByIdAndUpdate(

        bookingId,

        {
          $set: data,
        },

        {
          new: true,
          runValidators: true,
        }
      )

      .populate(
        "customerId",
        "name email phone"
      )

      .populate(
        "vendorId",
        "name email phone"
      )

      .populate(
        "vehicleId",
        "brand model category registrationNumber city images"
      );

  };