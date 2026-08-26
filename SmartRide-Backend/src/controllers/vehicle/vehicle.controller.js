const vehicleService = require("../../services/vehicle/vehicle.service");
const sendResponse = require("../../helpers/response");

exports.create = async (req, res, next) => {
  try {
    const result = await vehicleService.createVehicle({
      ...req.body,
      vendorId: req.user.id,
    });

    return sendResponse(res, 201, "Vehicle created successfully", result);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await vehicleService.getVehicles(req.query);
    return sendResponse(res, 200, "Vehicles fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const result = await vehicleService.getVehicleById(req.params.id);
    return sendResponse(res, 200, "Vehicle fetched successfully", result);
  } catch (error) {
    next(error);
  }
};
