const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'CasaViola Backend is running' });
});


const { protect } = require('./middleware/authMiddleware');

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const staffRoutes = require('./routes/staff');
app.use('/api/staff', protect, staffRoutes);

const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', protect, attendanceRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', protect, taskRoutes);

const payrollRoutes = require('./routes/payroll');
app.use('/api/payroll', protect, payrollRoutes);

const performanceRoutes = require('./routes/performance');
app.use('/api/performance', protect, performanceRoutes);

const inventoryRoutes = require('./routes/inventory');
app.use('/api/inventory', protect, inventoryRoutes);


// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));