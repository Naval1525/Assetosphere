// import express from 'express';
// import { upload } from '../utils/cloudinary.js';
// import { uploadBill, getBills } from '../controllers/billController.js';
// import authenticateToken from '../middlewares/authMiddleware.js';


// const router = express.Router();

// router.post('/upload', authenticateToken, upload.single('invoiceFile'), uploadBill);
// router.get('/my-bills', authenticateToken, getBills);

// export default router;
// routes/billRoutes.js
import express from 'express';
import { uploadBill, getBills } from '../controllers/billController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

// Upload bill route with auth middleware and file upload middleware
// The 'single' method specifies which form field contains the file
router.post('/upload', authenticateToken, upload.single('invoiceFile'), uploadBill);

// Get bills route with auth middleware
router.get('/', authenticateToken, getBills);

export default router;