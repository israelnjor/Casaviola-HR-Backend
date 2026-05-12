const InventoryList = require('../models/InventoryList');
const InventoryItem = require('../models/InventoryItem');

// ─── INVENTORY LISTS ──────────────────────────────────────────────────────────

// Get all inventory lists with summary
const getAllLists = async (req, res) => {
  try {
    const lists = await InventoryList.find().sort({ createdAt: -1 });
    
    // Add summary to each list
    const listsWithSummary = await Promise.all(lists.map(async (list) => {
      const items = await InventoryItem.find({ inventoryList: list._id });
      const totalItems = items.length;
      const totalUsed = items.reduce((sum, item) => sum + item.used, 0);
      const totalRemaining = items.reduce((sum, item) => sum + (item.qtyIn - item.used), 0);
      const totalValue = items.reduce((sum, item) => sum + (item.qtyIn * item.unitCost), 0);
      return { ...list.toJSON(), totalItems, totalUsed, totalRemaining, totalValue };
    }));

    res.json(listsWithSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create inventory list
const createList = async (req, res) => {
  try {
    const list = new InventoryList(req.body);
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update inventory list
const updateList = async (req, res) => {
  try {
    const list = await InventoryList.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!list) return res.status(404).json({ message: 'List not found' });
    res.json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete inventory list and all its items
const deleteList = async (req, res) => {
  try {
    await InventoryItem.deleteMany({ inventoryList: req.params.id });
    await InventoryList.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inventory list and all items deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── INVENTORY ITEMS ──────────────────────────────────────────────────────────

// Get all items in a list
const getItemsByList = async (req, res) => {
  try {
    const items = await InventoryItem.find({ inventoryList: req.params.listId })
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create multiple items at once
const createItems = async (req, res) => {
  try {
    const items = await InventoryItem.insertMany(req.body.items);
    res.status(201).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update item (edit details, add qty, add used)
const updateItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add to qty in
const addQty = async (req, res) => {
  try {
    const { quantity, notes } = req.body;
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.qtyIn += Number(quantity);
    if (notes) item.notes = notes;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add to used
const addUsed = async (req, res) => {
  try {
    const { quantity, notes } = req.body;
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (Number(quantity) > (item.qtyIn - item.used)) {
      return res.status(400).json({ message: 'Cannot use more than remaining stock' });
    }
    item.used += Number(quantity);
    if (notes) item.notes = notes;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getAllLists, createList, updateList, deleteList,
  getItemsByList, createItems, updateItem, addQty, addUsed, deleteItem 
};