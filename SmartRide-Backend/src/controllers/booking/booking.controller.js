const bookingService =
  require(
    "../../services/booking/booking.service"
  );


const sendResponse =
  require(
    "../../helpers/response"
  );



exports.create =
  async (
    req,
    res,
    next
  ) => {

    try {

      const booking =
        await bookingService
          .createBooking(
            req.user.id,
            req.body
          );


      return sendResponse(
        res,
        201,
        "Booking created. Please complete payment.",
        booking
      );

    } catch (error) {

      next(error);

    }

  };



exports.getMyBookings =
  async (
    req,
    res,
    next
  ) => {

    try {

      const bookings =
        await bookingService
          .getMyBookings(
            req.user.id
          );


      return sendResponse(
        res,
        200,
        "Bookings fetched successfully",
        bookings
      );

    } catch (error) {

      next(error);

    }

  };



exports.getVendorBookings =
  async (
    req,
    res,
    next
  ) => {

    try {

      const bookings =
        await bookingService
          .getVendorBookings(
            req.user.id
          );


      return sendResponse(
        res,
        200,
        "Vendor bookings fetched successfully",
        bookings
      );

    } catch (error) {

      next(error);

    }

  };



exports.getById =
  async (
    req,
    res,
    next
  ) => {

    try {

      const booking =
        await bookingService
          .getBookingById(
            req.params.id,
            req.user
          );


      return sendResponse(
        res,
        200,
        "Booking fetched successfully",
        booking
      );

    } catch (error) {

      next(error);

    }

  };



exports.cancel =
  async (
    req,
    res,
    next
  ) => {

    try {

      const booking =
        await bookingService
          .cancelBooking(
            req.params.id,
            req.user.id,
            req.body.reason
          );


      return sendResponse(
        res,
        200,
        "Booking cancelled successfully",
        booking
      );

    } catch (error) {

      next(error);

    }

  };



exports.start =
  async (
    req,
    res,
    next
  ) => {

    try {

      const booking =
        await bookingService
          .startRental(
            req.params.id,
            req.user.id
          );


      return sendResponse(
        res,
        200,
        "Rental started successfully",
        booking
      );

    } catch (error) {

      next(error);

    }

  };



exports.complete =
  async (
    req,
    res,
    next
  ) => {

    try {

      const booking =
        await bookingService
          .completeRental(
            req.params.id,
            req.user.id
          );


      return sendResponse(
        res,
        200,
        "Rental completed successfully",
        booking
      );

    } catch (error) {

      next(error);

    }

  };