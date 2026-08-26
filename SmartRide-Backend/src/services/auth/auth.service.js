const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const customerRepository =
  require(
    "../../repositories/customer/customer.repository"
  );
const vendorRepository =
  require(
    "../../repositories/vendor/vendor.repository"
  );
const authRepository = require("../../repositories/auth/auth.repository");
const AppError = require("../../utils/AppError");


function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
}

exports.register = async ({ name, email, phone, password, role }) => {

  // Check if the email is already registered.
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  // Hash the password before saving it to the database.
  const passwordHash = await bcrypt.hash(password, 12);

  // Create the user in the database.
  const user = await authRepository.create({
    name,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    // If no role is provided, default to "CUSTOMER".
    role: role || "CUSTOMER",
  });

  // Create a customer profile if the role is "CUSTOMER".
  if (user.role === "CUSTOMER") {
    await customerRepository.create({
      userId: user._id,
    });
  }
  else if (
    user.role === "VENDOR"
  ) {

    await vendorRepository.create({
      userId: user._id,
    });

  }

  return {
    user: user.toSafeObject(),
    token: createToken(user),
  };
};

exports.login = async ({ email, password }) => {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Your account is disabled", 403);
  }

  return {
    user: user.toSafeObject(),
    token: createToken(user),
  };
};

exports.getProfile = async (userId) => {
  const user = await authRepository.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.toSafeObject();
};
