const authService = require("../../services/auth/auth.service");
const sendResponse = require("../../helpers/response");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return sendResponse(res, 201, "User registered successfully", result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return sendResponse(res, 200, "Login successful", result);
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const result = await authService.getProfile(req.user.id);
    return sendResponse(res, 200, "Profile fetched successfully", result);
  } catch (error) {
    next(error);
  }
};
