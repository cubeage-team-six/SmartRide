const router =
  require(
    "express"
  ).Router();


const bookingController =
  require(
    "../controllers/booking/booking.controller"
  );


const authMiddleware =
  require(
    "../middlewares/auth.middleware"
  );


const roleMiddleware =
  require(
    "../middlewares/role.middleware"
  );


const validate =
  require(
    "../middlewares/validation.middleware"
  );


const {
  createBookingSchema,
  cancelBookingSchema,
} =
  require(
    "../validators/booking.validator"
  );



// Every booking API requires login
router.use(
  authMiddleware
);


// CUSTOMER - create booking
router.post(
  "/",

  roleMiddleware(
    "CUSTOMER"
  ),

  validate(
    createBookingSchema
  ),

  bookingController.create
);


// CUSTOMER - my bookings
router.get(
  "/me",

  roleMiddleware(
    "CUSTOMER"
  ),

  bookingController
    .getMyBookings
);


// VENDOR - bookings received
// IMPORTANT:
// Keep this BEFORE /:id
router.get(
  "/vendor/me",

  roleMiddleware(
    "VENDOR"
  ),

  bookingController
    .getVendorBookings
);


// CUSTOMER - cancel
router.patch(
  "/:id/cancel",

  roleMiddleware(
    "CUSTOMER"
  ),

  validate(
    cancelBookingSchema
  ),

  bookingController.cancel
);


// VENDOR - start rental
router.patch(
  "/:id/start",

  roleMiddleware(
    "VENDOR"
  ),

  bookingController.start
);


// VENDOR - complete rental
router.patch(
  "/:id/complete",

  roleMiddleware(
    "VENDOR"
  ),

  bookingController.complete
);


// Customer / Vendor / Admin
router.get(
  "/:id",

  roleMiddleware(
    "CUSTOMER",
    "VENDOR",
    "ADMIN"
  ),

  bookingController.getById
);


module.exports =
  router;// TODO: implement this module in the next sprint.
