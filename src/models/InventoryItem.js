const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  inventoryList: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InventoryList', 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: { 
    type: String, 
    trim: true 
  },
  qtyIn: { 
    type: Number, 
    default: 0 
  },
  used: { 
    type: Number, 
    default: 0 
  },
  unit: { 
    type: String, 
    trim: true 
  },
  unitCost: { 
    type: Number, 
    default: 0 
  },
  supplier: { 
    type: String, 
    trim: true 
  },
  photoUrl: { 
    type: String 
  },
  notes: { 
    type: String, 
    trim: true 
  },
  condition: { 
    type: String, 
    enum: ['New', 'Good', 'Fair', 'Poor'],
    default: 'Good' 
  },
}, { timestamps: true });

// Virtual field for remaining
InventoryItemSchema.virtual('remaining').get(function() {
  return this.qtyIn - this.used;
});

InventoryItemSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);