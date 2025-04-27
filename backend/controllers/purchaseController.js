import Purchase from '../models/Purchase.js';
import Plan from '../models/Plan.js';
import { validationResult } from 'express-validator';

// Create a new purchase
export const createPurchase = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { planId } = req.body;
    
    // Get the plan details
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Calculate expiry date based on plan duration
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.duration);

    // Create new purchase with appropriate user/company reference
    const purchaseData = {
      plan: planId,
      expiryDate,
      status: 'active',
      purchaseDate: new Date(),
      amount: plan.price
    };

    // Set the appropriate reference based on who is making the purchase
    if (req.user) {
      purchaseData.user = req.user._id;
    } else if (req.company) {
      purchaseData.company = req.company._id;
      // Activate the plan if it's a company purchase
      plan.isActive = true;
      await plan.save();
    }

    const purchase = new Purchase(purchaseData);
    await purchase.save();

    return res.status(201).json({
      message: 'Purchase created successfully',
      purchase: {
        id: purchase._id,
        plan: plan.name,
        purchaseDate: purchase.purchaseDate,
        expiryDate: purchase.expiryDate,
        status: purchase.status,
        amount: purchase.amount
      }
    });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all purchases
export const getPurchases = async (req, res) => {
  try {
    // Build query based on who is making the request
    const query = {};
    if (req.user) {
      query.user = req.user._id;
    } else if (req.company) {
      query.company = req.company._id;
    }

    const purchases = await Purchase.find(query)
      .populate('plan', 'name price duration features')
      .populate('user', 'name email')
      .sort({ purchaseDate: -1 });

    return res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get purchase by ID
export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate('plan', 'name price duration features')
      .populate('user', 'name email');

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    // Check if the purchase belongs to the authenticated user/company
    if ((req.user && purchase.user?.toString() !== req.user._id.toString()) ||
        (req.company && purchase.company?.toString() !== req.company._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this purchase' });
    }

    return res.json(purchase);
  } catch (error) {
    console.error('Error fetching purchase:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update purchase status
export const updatePurchaseStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    // Check if the purchase belongs to the authenticated user/company
    if ((req.user && purchase.user?.toString() !== req.user._id.toString()) ||
        (req.company && purchase.company?.toString() !== req.company._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to update this purchase' });
    }

    purchase.status = status;
    await purchase.save();

    return res.json({
      message: 'Purchase status updated successfully',
      purchase
    });
  } catch (error) {
    console.error('Error updating purchase status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}; 