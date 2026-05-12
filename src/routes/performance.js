const express = require('express');
const router = express.Router();
const { getAllPerformance, createPerformance, updatePerformance, deletePerformance } = require('../controllers/performanceController');

router.get('/', getAllPerformance);
router.post('/', createPerformance);
router.put('/:id', updatePerformance);
router.delete('/:id', deletePerformance);

module.exports = router;