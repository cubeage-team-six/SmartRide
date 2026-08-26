exports.bookingDTO =
  (booking) => {

    return {

      id:
        booking._id,

      bookingCode:
        booking.bookingCode,

      customer:
        booking.customerId
          ? {
              id:
                booking.customerId._id,

              name:
                booking.customerId.name,

              email:
                booking.customerId.email,

              phone:
                booking.customerId.phone,
            }
          : null,

      vendor:
        booking.vendorId
          ? {
              id:
                booking.vendorId._id,

              name:
                booking.vendorId.name,

              phone:
                booking.vendorId.phone,
            }
          : null,

      vehicle:
        booking.vehicleId,

      startDate:
        booking.startDate,

      endDate:
        booking.endDate,

      pricing:
        booking.pricing,

      status:
        booking.status,

      paymentStatus:
        booking.paymentStatus,

      cancellation:
        booking.cancellation,

      startedAt:
        booking.startedAt,

      completedAt:
        booking.completedAt,

      createdAt:
        booking.createdAt,

    };

  };