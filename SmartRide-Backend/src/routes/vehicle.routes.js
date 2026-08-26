const router = require("express").Router();

const vehicleController = require("../controllers/vehicle/vehicle.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validate = require("../middlewares/validation.middleware");
const { createVehicleSchema } = require("../validators/vehicle.validator");

router.get("/", vehicleController.getAll);
router.get("/:id", vehicleController.getById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("VENDOR", "ADMIN"),
  validate(createVehicleSchema),
  vehicleController.create
);

module.exports = router;
