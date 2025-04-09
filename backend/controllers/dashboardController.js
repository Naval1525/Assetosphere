// import User from '../models/User.js';

// /**
//  * Get user dashboard data
//  * @route GET /api/user/dashboard
//  * @access Private
//  */
// export const getDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await User.findById(userId).select('name email bills');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Dashboard fetch error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// /**
//  * Add a new bill/item
//  * @route POST /api/user/bills
//  * @access Private
//  */
// export const addBill = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
//       productName,
//       purchaseDate,
//       warrantyPeriodMonths,
//       reminderBeforeExpiry,
//       invoiceFileUrl,
//       storeName,
//       totalAmount,
//       notes
//     } = req.body;

//     if (!productName || !purchaseDate || !warrantyPeriodMonths || !reminderBeforeExpiry || !invoiceFileUrl) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.bills.push({
//       productName,
//       purchaseDate,
//       warrantyPeriodMonths,
//       reminderBeforeExpiry,
//       invoiceFileUrl,
//       storeName,
//       totalAmount,
//       notes
//     });

//     await user.save();

//     res.status(201).json({
//       message: 'Bill added successfully',
//       bill: user.bills[user.bills.length - 1]
//     });
//   } catch (error) {
//     console.error('Add bill error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
import User from '../models/User.js';

/**
 * Get user dashboard data
 * @route GET /api/user/dashboard
 * @access Private
 */
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('name email bills');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Add a new bill/item
 * @route POST /api/user/bills
 * @access Private
 */
export const addBill = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      productName,
      purchaseDate,
      warrantyPeriodMonths,
      reminderBeforeExpiry,
      invoiceFileUrl,
      storeName,
      totalAmount,
      notes
    } = req.body;

    if (!productName || !purchaseDate || !warrantyPeriodMonths || !reminderBeforeExpiry || !invoiceFileUrl) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bills.push({
      productName,
      purchaseDate,
      warrantyPeriodMonths,
      reminderBeforeExpiry,
      invoiceFileUrl,
      storeName,
      totalAmount,
      notes
    });

    await user.save();

    res.status(201).json({
      message: 'Bill added successfully',
      bill: user.bills[user.bills.length - 1]
    });
  } catch (error) {
    console.error('Add bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get bill details
 * @route GET /api/user/bills/:billId
 * @access Private
 */
export const getBillDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const billId = req.params.billId;

    const user = await User.findById(userId);

    const bill = user?.bills.id(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    res.status(200).json(bill);
  } catch (error) {
    console.error('Get bill details error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update a bill
 * @route PUT /api/user/bills/:billId
 * @access Private
 */
export const updateBill = async (req, res) => {
  try {
    const userId = req.user.id;
    const billId = req.params.billId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const bill = user.bills.id(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    Object.assign(bill, req.body);

    await user.save();

    res.status(200).json({
      message: 'Bill updated successfully',
      bill
    });
  } catch (error) {  
    console.error('Update bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete a bill
 * @route DELETE /api/user/bills/:billId
 * @access Private
 */
export const deleteBill = async (req, res) => {
  try {
    const userId = req.user.id;
    const billId = req.params.billId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const bill = user.bills.id(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    bill.remove();
    await user.save();

    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Delete bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get bills by category
 * @route GET /api/user/categories/:category
 * @access Private
 */
export const getBillsByCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const category = req.params.category.toLowerCase();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const billsByCategory = user.bills.filter(bill =>
      bill.productName.toLowerCase().includes(category)
    );

    res.status(200).json(billsByCategory);
  } catch (error) {
    console.error('Get bills by category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get expiring warranties
 * @route GET /api/user/warranties/expiring
 * @access Private
 */
export const getExpiringWarranties = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const currentDate = new Date();

    const expiringSoon = user.bills.filter(bill => {
      const purchaseDate = new Date(bill.purchaseDate);
      const warrantyEndDate = new Date(purchaseDate.setMonth(purchaseDate.getMonth() + bill.warrantyPeriodMonths));
      const reminderDate = new Date(warrantyEndDate);
      reminderDate.setDate(reminderDate.getDate() - bill.reminderBeforeExpiry);

      return reminderDate <= currentDate;
    });

    res.status(200).json(expiringSoon);
  } catch (error) {
    console.error('Get expiring warranties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
