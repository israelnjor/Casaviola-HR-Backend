const mongoose = require('mongoose');

const InventoryListSchema = new mongoose.Schema({
  projectName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  location: { 
    type: String, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'On Hold'],
    default: 'Active' 
  },
}, { timestamps: true });

module.exports = mongoose.model('InventoryList', InventoryListSchema);