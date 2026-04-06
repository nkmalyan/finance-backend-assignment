const Record = require('../models/Record');

exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find().populate('createdBy', 'name email');
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};