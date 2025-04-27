import express from 'express';
import { body } from 'express-validator';
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchaseStatus
} from '../controllers/purchaseController.js';
import Purchase from '../models/Purchase.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import companyAuth from '../middlewares/companyAuth.js';


const router = express.Router();

// Validation middleware
const purchaseValidation = [
  body('planId').notEmpty().withMessage('Plan ID is required')
];

// Routes for users
router.post('/', authenticateToken, purchaseValidation, createPurchase);
router.get('/', authenticateToken, getPurchases);
router.get('/:id', authenticateToken, getPurchaseById);
router.patch('/:id/status', authenticateToken, updatePurchaseStatus);

// Routes for companies
router.post('/company', companyAuth, purchaseValidation, createPurchase);
router.get('/company', companyAuth, getPurchases);
router.get('/company/:id', companyAuth, getPurchaseById);
router.patch('/company/:id/status', companyAuth, updatePurchaseStatus);

// Expiring bills route (works for both users and companies)
router.get('/expiring', authenticateToken, async (req, res) => {
  try {
    const { filter = 'week' } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    let endDate = new Date(today);
    if (filter === 'week') {
      endDate.setDate(today.getDate() + 7);
    } else if (filter === 'month') {
      endDate.setDate(today.getDate() + 30);
    }
    endDate.setHours(23, 59, 59, 999); // End of the day

    const query = {
      expiryDate: {
        $gte: today,
        $lte: endDate
      },
      status: 'active'
    };

    // If user is making the request, filter by user ID
    if (req.user) {
      query.user = req.user.id;
    }
    // If company is making the request, filter by company ID
    else if (req.company) {
      query.company = req.company.id;
    }

    const purchases = await Purchase.find(query)
      .populate('plan', 'name price duration features')
      .populate('user', 'name email phone')
      .sort({ expiryDate: 1 });

    res.json(purchases);
  } catch (err) {
    console.error('Error in expiring route:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
});

export default router; 