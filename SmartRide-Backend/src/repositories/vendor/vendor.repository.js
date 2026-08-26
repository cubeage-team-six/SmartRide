const Vendor = require("../../models/Vendor");

exports.create = (data) => {
  return Vendor.create(data);
};


exports.findByUserId = (userId) => {
  return Vendor.findOne({
    userId,
  }).populate(
    "userId",
    "name email phone role isActive"
  );
};


exports.updateByUserId = (
  userId,
  data
) => {
  return Vendor.findOneAndUpdate(
    {
      userId,
    },

    {
      $set: data,
    },

    {
      new: true,
      runValidators: true,
    }
  ).populate(
    "userId",
    "name email phone role isActive"
  );
};


exports.existsByUserId = (
  userId
) => {
  return Vendor.exists({
    userId,
  });
};


exports.findById = (
  vendorId
) => {
  return Vendor.findById(
    vendorId
  ).populate(
    "userId",
    "name email phone role isActive"
  );
};