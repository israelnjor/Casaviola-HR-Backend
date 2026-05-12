const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  // Basic Info
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date },
  address: { type: String, trim: true },

  // Employment Info
  department: { 
    type: String, 
    enum: ['Sales', 'Operations', 'Finance', 'Administration', 'Marketing'],
    required: true 
  },
  role: { type: String, required: true, trim: true },
  employmentType: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Contract'],
    default: 'Full-time' 
  },
  startDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'On Leave', 'Terminated'],
    default: 'Active' 
  },

  // Salary Info
  baseSalary: { type: Number, required: true },
  paymentType: { 
    type: String, 
    enum: ['Monthly', 'Commission-based'],
    default: 'Monthly' 
  },

  // Emergency Contact
  emergencyContact: {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true }
  }

}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema);