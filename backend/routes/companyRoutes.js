// routes/companyRoutes.js
import express from 'express';
import companyController from '../controllers/companyController.js';
import companyAuth from '../middlewares/companyAuth.js';


const router = express.Router();

// @route   POST /api/companies/register
// @desc    Register a company
// @access  Public
router.post('/register', companyController.register);

// @route   POST /api/companies/login
// @desc    Authenticate company & get token
// @access  Public
router.post('/login', companyController.login);

// @route   GET /api/companies/me
// @desc    Get current company profile
// @access  Private
router.get('/me', companyAuth, companyController.getProfile);

// @route   PUT /api/companies/profile
// @desc    Update company profile
// @access  Private
router.put('/profile', companyAuth, companyController.updateProfile);

// @route   POST /api/companies/plans
// @desc    Create a new plan
// @access  Private
router.post('/plans', companyAuth, companyController.createPlan);

// @route   PUT /api/companies/plans/:planId
// @desc    Update a plan
// @access  Private
router.put('/plans/:planId', companyAuth, companyController.updatePlan);

// @route   DELETE /api/companies/plans/:planId
// @desc    Delete a plan
// @access  Private
router.delete('/plans/:planId', companyAuth, companyController.deletePlan);

// @route   GET /api/companies/plans
// @desc    Get all insurance plans
// @access  Public
router.get('/plans', companyController.getAllPlans);

// @route   GET /api/companies/stats
// @desc    Get company statistics
// @access  Private
router.get('/stats', companyAuth, companyController.getCompanyStats);

export default router;