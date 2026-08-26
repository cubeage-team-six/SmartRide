const { z } = require("zod");

exports.updateCustomerSchema =
  z.object({
    profileImage:
      z.string().url().optional(),

    dateOfBirth:
      z.string().optional(),

    gender:
      z
        .enum([
          "MALE",
          "FEMALE",
          "OTHER",
        ])
        .optional(),

    emergencyContact:
      z
        .object({
          name:
            z.string()
              .min(2)
              .max(80),

          phone:
            z.string()
              .min(10)
              .max(15),

          relation:
            z.string()
              .min(2)
              .max(50),
        })
        .optional(),

    address:
      z
        .object({
          addressLine1:
            z.string().min(3),

          addressLine2:
            z.string().optional(),

          city:
            z.string().min(2),

          state:
            z.string().min(2),

          country:
            z.string().optional(),

          postalCode:
            z.string().min(4).max(10),
        })
        .optional(),
  });

exports.drivingLicenseSchema =
  z.object({
    licenseNumber:
      z.string()
        .min(5)
        .max(30),

    documentUrl:
      z.string().url(),

    expiryDate:
      z.string(),
  });