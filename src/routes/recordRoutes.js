const express = require('express');
const { createRecord, getRecords } = require('../controllers/recordController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Get Records: Viewer, Analyst, Admin (Sabhi dekh sakte hain) [cite: 84-86]
router.get('/', protect, authorize('Viewer', 'Analyst', 'Admin'), getRecords);

// Create Record: Sirf Admin kar sakta hai [cite: 84, 86]
router.post('/', protect, authorize('Admin'), createRecord);

module.exports = router;