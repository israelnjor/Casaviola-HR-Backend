const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
  staff: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
    required: true 
  },
  period: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  kpiScore: { 
    type: Number, 
    min: 0, 
    max: 100, 
    required: true 
  },
  notes: { 
    type: String, 
    trim: true 
  },
  reviewer: { 
    type: String, 
    default: 'Admin' 
  },

}, { timestamps: true });

module.exports = mongoose.model('Performance', PerformanceSchema);