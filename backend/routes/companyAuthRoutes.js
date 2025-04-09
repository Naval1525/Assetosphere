import express from 'express';
import { signup, login } from '../controllers/companyAuthController.js';

const router = express.Router();

// Route: POST /api/company/signup
router.post('/signup', signup);

// Route: POST /api/company/login
router.post('/login', login);

export default router;
