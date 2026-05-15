const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  createStaffLogin,
  getAllLogins,
  toggleLogin,
  deleteLogin
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/create-login', protect, createStaffLogin);
router.get('/logins', protect, getAllLogins);
router.put('/logins/:id/toggle', protect, toggleLogin);
router.delete('/logins/:id', protect, deleteLogin);

module.exports = router;