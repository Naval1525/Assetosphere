import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();

// Get all users with their bills
router.get('/', getUsers);

export default router; 