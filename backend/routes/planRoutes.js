import express from 'express';
import { body } from 'express-validator';
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  togglePlanStatus
} from '../controllers/planController.js';

import companyAuth from '../middlewares/companyAuth.js';

const router = express.Router();

// Validation middleware
const planValidation = [
  body('name').notEmpty().withMessage('Plan name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('features').isArray().withMessage('Features must be an array'),
  body('coverage').notEmpty().withMessage('Coverage details are required'),
  body('terms').notEmpty().withMessage('Terms and conditions are required')
];

// Routes for companies
router.post('/', companyAuth, planValidation, createPlan);
router.get('/', companyAuth, getPlans);
router.get('/:id', companyAuth, getPlanById);
router.put('/:id', companyAuth, planValidation, updatePlan);
router.delete('/:id', companyAuth, deletePlan);
router.patch('/:id/status', companyAuth, togglePlanStatus);

export default router; 