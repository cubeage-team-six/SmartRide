const mongoose = require("mongoose");

const vehicleRepository = require("../../repositories/vehicle/vehicle.repository");
const AppError = require("../../utils/AppError");

exports.createVehicle = async (payload) => {
  return vehicleRepository.create(payload);
};

exports.getVehicles = async (query) => {
  const filter = { isActive: true };

  if (query.category) filter.category = query.category;
  if (query.city) filter.city = new RegExp(query.city, "i");
  if (query.fuelType) filter.fuelType = query.fuelType;
  if (query.transmission) filter.transmission = query.transmission;

  return vehicleRepository.findAll(filter);
};

exports.getVehicleById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid vehicle id", 400);
  }

  const vehicle = await vehicleRepository.findById(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return vehicle;
};
