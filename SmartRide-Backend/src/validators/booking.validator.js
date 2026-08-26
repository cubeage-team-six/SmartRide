const { z } = require("zod");


const objectIdRegex =
  /^[0-9a-fA-F]{24}$/;


exports.createBookingSchema =
  z
    .object({

      vehicleId:
        z
          .string()
          .regex(
            objectIdRegex,
            "Invalid vehicle id"
          ),

      startDate:
        z.coerce.date(),

      endDate:
        z.coerce.date(),

    })

    .refine(
      (data) =>
        data.endDate >
        data.startDate,

      {
        message:
          "End date must be after start date",

        path: ["endDate"],
      }
    );


exports.cancelBookingSchema =
  z.object({

    reason:
      z
        .string()
        .min(3)
        .max(300),

  });