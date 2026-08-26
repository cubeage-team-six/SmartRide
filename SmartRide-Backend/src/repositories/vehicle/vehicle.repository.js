const Vehicle = require("../../models/Vehicle");

exports.create = (payload) => Vehicle.create(payload);

exports.findAll = (filter) =>
  Vehicle.find(filter)
    .populate("vendorId", "name email phone")
    .sort({ createdAt: -1 });

exports.findById = (id) =>
  Vehicle.findById(id).populate("vendorId", "name email phone");
