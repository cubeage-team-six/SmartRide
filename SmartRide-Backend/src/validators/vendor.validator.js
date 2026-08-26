const { z } = require("zod");


exports.updateVendorSchema =
  z.object({

    businessName:
      z
        .string()
        .min(2)
        .max(120)
        .optional(),

    businessType:
      z
        .enum([
          "INDIVIDUAL",
          "PROPRIETORSHIP",
          "PARTNERSHIP",
          "COMPANY",
        ])
        .optional(),

    profileImage:
      z
        .string()
        .url()
        .optional(),

    businessEmail:
      z
        .string()
        .email()
        .optional(),

    businessPhone:
      z
        .string()
        .min(10)
        .max(15)
        .optional(),

    gstNumber:
      z
        .string()
        .min(15)
        .max(15)
        .optional(),

    address:
      z
        .object({

          addressLine1:
            z
              .string()
              .min(3),

          addressLine2:
            z
              .string()
              .optional(),

          city:
            z
              .string()
              .min(2),

          state:
            z
              .string()
              .min(2),

          country:
            z
              .string()
              .optional(),

          postalCode:
            z
              .string()
              .min(4)
              .max(10),

        })
        .optional(),

  });


exports.vendorKycSchema =
  z.object({

    panNumber:
      z
        .string()
        .min(10)
        .max(10),

    panDocumentUrl:
      z
        .string()
        .url(),

    identityDocumentType:
      z.enum([
        "AADHAAR",
        "PASSPORT",
        "VOTER_ID",
        "DRIVING_LICENSE",
      ]),

    identityDocumentUrl:
      z
        .string()
        .url(),

  });