const express = require('express');
const router = express.Router();
const { 
  getAllAttendance, 
  getAttendanceByDate, 
  createAttendance, 
  updateAttendance, 
  deleteAttendance 
} = require('../controllers/attendanceController');

router.get('/', getAllAttendance);
router.get('/date/:date', getAttendanceByDate);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;