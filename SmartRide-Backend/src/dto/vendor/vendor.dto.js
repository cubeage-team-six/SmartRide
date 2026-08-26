exports.vendorProfileDTO = (
  vendor
) => {
  return {
    id: vendor._id,

    user: {
      id:
        vendor.userId?._id,

      name:
        vendor.userId?.name,

      email:
        vendor.userId?.email,

      phone:
        vendor.userId?.phone,
    },

    businessName:
      vendor.businessName,

    businessType:
      vendor.businessType,

    profileImage:
      vendor.profileImage,

    businessEmail:
      vendor.businessEmail,

    businessPhone:
      vendor.businessPhone,

    address:
      vendor.address,

    gstNumber:
      vendor.gstNumber,

    kyc: {
      verificationStatus:
        vendor.kyc
          ?.verificationStatus,

      rejectionReason:
        vendor.kyc
          ?.rejectionReason,
    },

    approvalStatus:
      vendor.approvalStatus,

    profileCompleted:
      vendor.profileCompleted,

    isBlocked:
      vendor.isBlocked,

    createdAt:
      vendor.createdAt,
  };
};