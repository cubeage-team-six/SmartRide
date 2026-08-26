const router = require("express").Router();

const authRoutes = require("./auth.routes");
const vehicleRoutes = require("./vehicle.routes");
const customerRoutes = require("./customer.routes");
const vendorRoutes =
  require(
    "./vendor.routes"
  );
const bookingRoutes =
  require(
    "./booking.routes"
  );

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vehicle Rental API is healthy",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/customers", customerRoutes);
router.use(
  "/vendors",
  vendorRoutes
);
router.use(
  "/bookings",
  bookingRoutes
);

module.exports = router;
