const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  staff: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
    required: true 
  },
  month: { 
    type: String, 
    required: true 
  },
  basicSalary: { 
    type: Number, 
    required: true 
  },
  bonus: { 
    type: Number, 
    default: 0 
  },
  deductions: { 
    type: Number, 
    default: 0 
  },
  netPay: { 
    type: Number 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Paid'],
    default: 'Pending' 
  },
  notes: { 
    type: String, 
    trim: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Payroll', PayrollSchema);