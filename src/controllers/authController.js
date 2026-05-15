const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register first admin (superuser)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, role: 'CEO' });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).populate('staffProfile', 'fullName department role');
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
    if (!admin.isActive) return res.status(401).json({ message: 'Account is deactivated. Contact admin.' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    const token = generateToken(admin._id);
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        staffProfile: admin.staffProfile,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current admin
const getMe = async (req, res) => {
  res.json(req.admin);
};

// Create login for staff member (admin only)
const createStaffLogin = async (req, res) => {
  try {
    const { name, email, password, role, staffProfile } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Login already exists for this email' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, role, staffProfile });
    await admin.save();
    res.status(201).json({ message: 'Staff login created successfully', admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all staff logins
const getAllLogins = async (req, res) => {
  try {
    const logins = await Admin.find()
      .populate('staffProfile', 'fullName department role')
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(logins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle login active/inactive
const toggleLogin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Login not found' });
    admin.isActive = !admin.isActive;
    await admin.save();
    res.json({ message: `Login ${admin.isActive ? 'activated' : 'deactivated'}`, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete login
const deleteLogin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Login deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe, createStaffLogin, getAllLogins, toggleLogin, deleteLogin };