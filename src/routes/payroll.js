const express = require('express');
const router = express.Router();

const {
  getAllPayroll,
  getPayrollByStaffId,
  createPayroll,
  updatePayroll,
  deletePayroll
} = require('../controllers/payrollController');

router.get('/', getAllPayroll);
router.get('/staff/:staffId', getPayrollByStaffId);
router.post('/', createPayroll);
router.put('/:id', updatePayroll);
router.delete('/:id', deletePayroll);

module.exports = router;