const express = require('express');
const router = express.Router();
const {
  getAllLists, createList, updateList, deleteList,
  getItemsByList, createItems, updateItem, addQty, addUsed, deleteItem
} = require('../controllers/inventoryController');

// Inventory List routes
router.get('/lists', getAllLists);
router.post('/lists', createList);
router.put('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);

// Inventory Item routes
router.get('/lists/:listId/items', getItemsByList);
router.post('/items', createItems);
router.put('/items/:id', updateItem);
router.put('/items/:id/addqty', addQty);
router.put('/items/:id/addused', addUsed);
router.delete('/items/:id', deleteItem);

module.exports = router;