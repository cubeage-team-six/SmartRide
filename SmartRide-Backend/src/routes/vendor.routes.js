// TODO: implement this module in the next sprint.
const router =
  require(
    "express"
  ).Router();


const vendorController =
  require(
    "../controllers/vendor/vendor.controller"
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
  updateVendorSchema,
  vendorKycSchema,
} =
  require(
    "../validators/vendor.validator"
  );


router.use(
  authMiddleware,
  roleMiddleware("VENDOR")
);


router.get(
  "/me",
  vendorController
    .getMyProfile
);


router.patch(
  "/me",
  validate(
    updateVendorSchema
  ),
  vendorController
    .updateMyProfile
);


router.post(
  "/me/kyc",
  validate(
    vendorKycSchema
  ),
  vendorController
    .submitKyc
);


module.exports =
  router;