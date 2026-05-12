const Payroll = require('../models/Payroll');

// Get all payroll records
const getAllPayroll = async (req, res) => {
  try {
    const records = await Payroll.find()
      .populate('staff', 'fullName role department')
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payroll by staff ID
const getPayrollByStaffId = async (req, res) => {
  try {
    const records = await Payroll.find({ staff: req.params.staffId })
      .populate('staff', 'fullName role department');
    if (!records) return res.status(404).json({ message: 'Record not found' });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create payroll record
const createPayroll = async (req, res) => {
  try {
    const { basicSalary, bonus, deductions } = req.body;
    const netPay = Number(basicSalary) + Number(bonus || 0) - Number(deductions || 0);
    const record = new Payroll({ ...req.body, netPay });
    await record.save();
    const populated = await record.populate('staff', 'fullName role department');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update payroll record
const updatePayroll = async (req, res) => {
  try {
    const existing = await Payroll.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Record not found' });

    const basicSalary = Number(req.body.basicSalary ?? existing.basicSalary);
    const bonus = Number(req.body.bonus ?? existing.bonus);
    const deductions = Number(req.body.deductions ?? existing.deductions);
    const netPay = basicSalary + bonus - deductions;

    const record = await Payroll.findByIdAndUpdate(
      req.params.id,
      { ...req.body, basicSalary, bonus, deductions, netPay },
      { new: true }
    ).populate('staff', 'fullName role department');

    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete payroll record
const deletePayroll = async (req, res) => {
  try {
    const record = await Payroll.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Payroll record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPayroll, getPayrollByStaffId, createPayroll, updatePayroll, deletePayroll };