const express = require('express');
const { getSummary } = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Summary: Analyst aur Admin dekh sakte hain, Viewer nahi [cite: 84-86]
router.get('/summary', protect, authorize('Analyst', 'Admin'), getSummary);

module.exports = router;