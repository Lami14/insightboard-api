const User = require("../models/User");

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get single user
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  await user.save();

  res.json({ message: "User updated successfully" });
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  await user.deleteOne();

  res.json({ message: "User deleted successfully" });
};
