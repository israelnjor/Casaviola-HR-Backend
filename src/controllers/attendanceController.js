const Attendance = require('../models/Attendance');

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('staff', 'fullName role department')
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance by date
const getAttendanceByDate = async (req, res) => {
  try {
    const records = await Attendance.find({ date: req.params.date })
      .populate('staff', 'fullName role department');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const record = new Attendance(req.body);
    await record.save();
    const populated = await record.populate('staff', 'fullName role department');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('staff', 'fullName role department');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllAttendance, getAttendanceByDate, createAttendance, updateAttendance, deleteAttendance };