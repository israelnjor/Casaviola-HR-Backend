const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  staff: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  clockIn: { 
    type: String 
  },
  clockOut: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['Present', 'Late', 'Absent'],
    default: 'Present'
  },
  notes: { 
    type: String, 
    trim: true 
  }

}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);