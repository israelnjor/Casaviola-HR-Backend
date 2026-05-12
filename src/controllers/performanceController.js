const Performance = require('../models/Performance');

// Get all performance reviews
const getAllPerformance = async (req, res) => {
  try {
    const reviews = await Performance.find()
      .populate('staff', 'fullName role department')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create performance review
const createPerformance = async (req, res) => {
  try {
    const review = new Performance(req.body);
    await review.save();
    const populated = await review.populate('staff', 'fullName role department');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update performance review
const updatePerformance = async (req, res) => {
  try {
    const review = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('staff', 'fullName role department');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete performance review
const deletePerformance = async (req, res) => {
  try {
    const review = await Performance.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPerformance, createPerformance, updatePerformance, deletePerformance };