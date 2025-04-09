// // const User = require('../models/User');

// // const uploadBill = async (req, res) => {
// //   try {
// //     console.log('🧾 Uploading bill...');
// //     const {
// //       productName,
// //       purchaseDate,
// //       warrantyPeriodMonths,
// //       reminderBeforeExpiry,
// //       storeName,
// //       totalAmount,
// //       notes
// //     } = req.body;

// //     if (!req.file || !req.file.path) {
// //       return res.status(400).json({ message: 'Invoice file not uploaded.' });
// //     }

// //     const invoiceFileUrl = req.file.path;

// //     const newBill = {
// //       productName,
// //       purchaseDate,
// //       warrantyPeriodMonths,
// //       reminderBeforeExpiry,
// //       invoiceFileUrl,
// //       storeName,
// //       totalAmount,
// //       notes
// //     };

// //     const user = await User.findById(req.user._id);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     user.bills.push(newBill);
// //     await user.save();

// //     res.status(201).json({ message: 'Bill uploaded successfully', bill: newBill });
// //   } catch (error) {
// //     console.error('❌ Error uploading bill:', error);
// //     res.status(500).json({ message: 'Server error while uploading bill' });
// //   }
// // };

// // const getBills = async (req, res) => {
// //     try {
// //       const user = await User.findById(req.user._id);

// //       if (!user) {
// //         return res.status(404).json({ message: 'User not found' });
// //       }

// //       res.status(200).json({
// //         bills: user.bills,
// //         count: user.bills.length
// //       });
// //     } catch (error) {
// //       console.error('❌ Error fetching bills:', error);
// //       res.status(500).json({ message: 'Server error while fetching bills' });
// //     }
// //   };

// //   module.exports = {
// //     uploadBill,
// //     getBills
// //   };

// import User from '../models/User.js';

// export const uploadBill = async (req, res) => {
//   try {
//     console.log('🧾 Uploading bill...');
//     const {
//       productName,
//       purchaseDate,
//       warrantyPeriodMonths,
//       reminderBeforeExpiry,
//       storeName,
//       totalAmount,
//       notes
//     } = req.body;

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ message: 'Invoice file not uploaded.' });
//     }

//     const invoiceFileUrl = req.file.path;

//     const newBill = {
//       productName,
//       purchaseDate,
//       warrantyPeriodMonths,
//       reminderBeforeExpiry,
//       invoiceFileUrl,
//       storeName,
//       totalAmount,
//       notes
//     };

//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.bills.push(newBill);
//     await user.save();

//     res.status(201).json({ message: 'Bill uploaded successfully', bill: newBill });
//   } catch (error) {
//     console.error('❌ Error uploading bill:', error);
//     res.status(500).json({ message: 'Server error while uploading bill' });
//   }
// };

// export const getBills = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       bills: user.bills,
//       count: user.bills.length
//     });
//   } catch (error) {
//     console.error('❌ Error fetching bills:', error);
//     res.status(500).json({ message: 'Server error while fetching bills' });
//   }
// };
// controllers/billController.js
import User from '../models/User.js';

export const uploadBill = async (req, res) => {
  try {
    console.log('🧾 Uploading bill...');

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Invoice file not uploaded.'
      });
    }

    // Extract file info from Cloudinary response
    const invoiceFileUrl = req.file.path; // Cloudinary URL

    // Extract and validate form data
    const {
      productName,
      purchaseDate,
      warrantyPeriodMonths,
      reminderBeforeExpiry,
      storeName,
      totalAmount,
      notes
    } = req.body;

    // Validate required fields
    if (!productName || !purchaseDate || !warrantyPeriodMonths) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    // Create the new bill object
    const newBill = {
      productName,
      purchaseDate: new Date(purchaseDate),
      warrantyPeriodMonths: Number(warrantyPeriodMonths),
      reminderBeforeExpiry: Number(reminderBeforeExpiry) || 30,
      invoiceFileUrl,
      storeName: storeName || '',
      totalAmount: totalAmount ? Number(totalAmount) : 0,
      notes: notes || ''
    };

    // Find the user and add the bill
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add the bill to the user's bills array
    user.bills.push(newBill);
    await user.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Bill uploaded successfully',
      bill: newBill
    });
  } catch (error) {
    console.error('❌ Error uploading bill:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading bill',
      error: error.message
    });
  }
};

export const getBills = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      bills: user.bills,
      count: user.bills.length
    });
  } catch (error) {
    console.error('❌ Error fetching bills:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bills',
      error: error.message
    });
  }
};