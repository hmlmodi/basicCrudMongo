// src/services/authService.js
const User = require('../model/user');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new Error('User already exists');
    }

    user = new User({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Login user
exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
