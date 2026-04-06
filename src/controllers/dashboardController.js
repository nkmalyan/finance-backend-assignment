const Record = require('../models/Record');

exports.getSummary = async (req, res) => {
  try {
    const summary = await Record.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
          totalExpense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
        }
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
          totalExpense: 1,
          netBalance: { $subtract: ["$totalIncome", "$totalExpense"] }
        }
      }
    ]);

    res.status(200).json({ success: true, data: summary[0] || { totalIncome: 0, totalExpense: 0, netBalance: 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};