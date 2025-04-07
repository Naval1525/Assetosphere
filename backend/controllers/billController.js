const User = require('../models/User');

const uploadBill = async (req, res) => {
  try {
    console.log('🧾 Uploading bill...');
    const {
      productName,
      purchaseDate,
      warrantyPeriodMonths,
      reminderBeforeExpiry,
      storeName,
      totalAmount,
      notes
    } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Invoice file not uploaded.' });
    }

    const invoiceFileUrl = req.file.path;

    const newBill = {
      productName,
      purchaseDate,
      warrantyPeriodMonths,
      reminderBeforeExpiry,
      invoiceFileUrl,
      storeName,
      totalAmount,
      notes
    };

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.bills.push(newBill);
    await user.save();

    res.status(201).json({ message: 'Bill uploaded successfully', bill: newBill });
  } catch (error) {
    console.error('❌ Error uploading bill:', error);
    res.status(500).json({ message: 'Server error while uploading bill' });
  }
};

const getBills = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        bills: user.bills,
        count: user.bills.length
      });
    } catch (error) {
      console.error('❌ Error fetching bills:', error);
      res.status(500).json({ message: 'Server error while fetching bills' });
    }
  };

  module.exports = {
    uploadBill,
    getBills
  };

