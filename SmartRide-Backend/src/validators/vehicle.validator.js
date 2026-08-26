const { z } = require("zod");

exports.createVehicleSchema = z.object({
  category: z.enum([
    "BIKE",
    "SCOOTER",
    "HATCHBACK",
    "SEDAN",
    "SUV",
    "LUXURY",
  ]),
  brand: z.string().min(2).max(50),
  model: z.string().min(1).max(50),
  registrationNumber: z.string().min(5).max(20),
  city: z.string().min(2).max(80),
  fuelType: z.enum(["PETROL", "DIESEL", "CNG", "EV", "HYBRID"]),
  transmission: z.enum(["MANUAL", "AUTOMATIC"]),
  seats: z.number().int().min(1).max(20).optional(),
  pricePerDay: z.number().positive(),
  images: z.array(z.string().url()).optional(),
});
