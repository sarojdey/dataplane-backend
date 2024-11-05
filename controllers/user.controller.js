const { User } = require("../models/user.model.js");

const updateUserDetails = async (req, res) => {
  const { userId } = req.body;
  const { firstName, lastName, dob, gender, phone, address, role, avatar } =
    req.body;

  const updatedFields = {};

  if (firstName) updatedFields.firstName = firstName;
  if (lastName) updatedFields.lastName = lastName;
  if (dob) updatedFields.dob = dob;
  if (gender) updatedFields.gender = gender;
  if (phone) updatedFields.phone = phone;
  if (role) updatedFields.role = role;
  if (avatar) updatedFields.avatar = avatar;

  if (address) {
    updatedFields.address = {};
    if (address.addressType)
      updatedFields.address.addressType = address.addressType;
    if (address.country) updatedFields.address.country = address.country;
    if (address.state) updatedFields.address.state = address.state;
    if (address.postalCode)
      updatedFields.address.postalCode = address.postalCode;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  updateUserDetails,
};
