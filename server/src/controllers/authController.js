const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phone,
    passwordHash,
    role
  });

  const token = generateToken(user._id);
  const userObj = user.toObject();
  delete userObj.passwordHash;

  res.status(201).json({
    success: true,
    data: { user: userObj, token }
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);
  const userObj = user.toObject();
  delete userObj.passwordHash;

  res.json({
    success: true,
    data: { user: userObj, token }
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
});
