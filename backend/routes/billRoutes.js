const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const { uploadBill, getBills } = require('../controllers/billController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/upload', authenticateToken, upload.single('invoiceFile'), uploadBill);
router.get('/my-bills', authenticateToken, getBills);


module.exports = router;
