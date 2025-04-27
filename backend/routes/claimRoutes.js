import express from 'express';
import { body } from 'express-validator';
import {
  getClaims,
  getClaimById,
  updateClaimStatus,
  createClaim
} from '../controllers/claimController.js';

const router = express.Router();

// Validation middleware
const claimValidation = [
  body('user').notEmpty().withMessage('User ID is required'),
  body('plan').notEmpty().withMessage('Plan ID is required'),
  body('deviceDetails').notEmpty().withMessage('Device details are required'),
  body('issueDescription').notEmpty().withMessage('Issue description is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('documents').isArray().withMessage('Documents must be an array')
];

// Routes
router.get('/', getClaims);
router.get('/:id', getClaimById);
router.post('/', claimValidation, createClaim);
router.patch('/:id/status', updateClaimStatus);

export default router; 