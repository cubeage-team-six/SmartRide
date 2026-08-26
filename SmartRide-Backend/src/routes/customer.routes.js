const router =
  require("express").Router();

const customerController =
  require(
    "../controllers/customer/customer.controller"
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
  updateCustomerSchema,
  drivingLicenseSchema,
} =
require(
  "../validators/customer.validator"
);

router.use(
  authMiddleware,
  roleMiddleware("CUSTOMER")
);

router.get(
  "/me",
  customerController.getMyProfile
);

router.patch(
  "/me",
  validate(updateCustomerSchema),
  customerController.updateMyProfile
);

router.patch(
  "/me/driving-license",
  validate(drivingLicenseSchema),
  customerController.updateDrivingLicense
);

module.exports = router;