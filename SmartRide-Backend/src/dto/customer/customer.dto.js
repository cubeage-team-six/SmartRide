exports.customerProfileDTO =
  (customer) => {
    return {
      id: customer._id,

      user: {
        id:
          customer.userId?._id,

        name:
          customer.userId?.name,

        email:
          customer.userId?.email,

        phone:
          customer.userId?.phone,
      },

      profileImage:
        customer.profileImage,

      dateOfBirth:
        customer.dateOfBirth,

      gender:
        customer.gender,

      emergencyContact:
        customer.emergencyContact,

      address:
        customer.address,

      drivingLicense: {
        verificationStatus:
          customer.drivingLicense
            ?.verificationStatus,

        expiryDate:
          customer.drivingLicense
            ?.expiryDate,
      },

      profileCompleted:
        customer.profileCompleted,
    };
  };