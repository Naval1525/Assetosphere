import express from 'express';
import {
  getDashboard,
  addBill,
  getBillDetails,
  updateBill,
  deleteBill,
  getBillsByCategory,
  getExpiringWarranties
} from '../controllers/dashboardController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get dashboard data
router.get('/dashboard', authenticateToken, getDashboard);

// Bill routes
router.post('/bills', authenticateToken, addBill);
router.get('/bills/:billId', authenticateToken, getBillDetails);
router.put('/bills/:billId', authenticateToken, updateBill);
router.delete('/bills/:billId', authenticateToken, deleteBill);

// Category routes
router.get('/categories/:category', authenticateToken, getBillsByCategory);

// Warranty routes
router.get('/warranties/expiring', authenticateToken, getExpiringWarranties);

export default router;
