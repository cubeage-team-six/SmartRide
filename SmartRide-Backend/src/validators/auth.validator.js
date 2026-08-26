const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(10).max(15).optional(),
  password: z.string().min(8).max(72),
  role: z.enum(["CUSTOMER", "VENDOR"]).optional(),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});
