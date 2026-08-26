const vendorRepository =
  require(
    "../../repositories/vendor/vendor.repository"
  );

const AppError =
  require(
    "../../utils/AppError"
  );

const {
  vendorProfileDTO,
} =
  require(
    "../../dto/vendor/vendor.dto"
  );


exports.createVendorProfile =
  async (userId) => {

    const exists =
      await vendorRepository
        .existsByUserId(
          userId
        );

    if (exists) {
      throw new AppError(
        "Vendor profile already exists",
        409
      );
    }

    return vendorRepository.create({
      userId,
    });
  };


exports.getMyProfile =
  async (userId) => {

    const vendor =
      await vendorRepository
        .findByUserId(
          userId
        );

    if (!vendor) {
      throw new AppError(
        "Vendor profile not found",
        404
      );
    }

    return vendorProfileDTO(
      vendor
    );
  };


exports.updateMyProfile =
  async (
    userId,
    data
  ) => {

    const vendor =
      await vendorRepository
        .findByUserId(
          userId
        );

    if (!vendor) {
      throw new AppError(
        "Vendor profile not found",
        404
      );
    }

    await vendorRepository
      .updateByUserId(
        userId,
        data
      );

    const updatedVendor =
      await vendorRepository
        .findByUserId(
          userId
        );

    return vendorProfileDTO(
      updatedVendor
    );
  };


exports.submitKyc =
  async (
    userId,
    kycData
  ) => {

    const vendor =
      await vendorRepository
        .findByUserId(
          userId
        );

    if (!vendor) {
      throw new AppError(
        "Vendor profile not found",
        404
      );
    }


    if (
      vendor.kyc
        ?.verificationStatus ===
      "VERIFIED"
    ) {
      throw new AppError(
        "KYC is already verified",
        409
      );
    }


    await vendorRepository
      .updateByUserId(
        userId,
        {
          kyc: {
            ...kycData,

            verificationStatus:
              "PENDING",

            rejectionReason:
              null,
          },
        }
      );


    const updatedVendor =
      await vendorRepository
        .findByUserId(
          userId
        );


    return vendorProfileDTO(
      updatedVendor
    );
  };