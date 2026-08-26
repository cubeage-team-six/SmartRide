const Customer = require("../../models/Customer");

exports.create = (data) => {
  return Customer.create(data);
};

exports.findByUserId = (userId) => {
  return Customer.findOne({
    userId,
  }).populate(
    "userId",
    "name email phone role isActive"
  );
};

exports.updateByUserId = (userId, data) => {
  return Customer.findOneAndUpdate(
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

exports.existsByUserId = (userId) => {
  return Customer.exists({
    userId,
  });
};