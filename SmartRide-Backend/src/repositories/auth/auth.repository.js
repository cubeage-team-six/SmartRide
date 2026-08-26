const User = require("../../models/User");

exports.findByEmail = (email) => {
  return User.findOne({ email: email.toLowerCase() });
};

exports.findById = (id) => {
  return User.findById(id);
};

exports.create = (payload) => {
  return User.create(payload);
};
