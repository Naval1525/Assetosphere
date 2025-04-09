// // const { v2: cloudinary } = require('cloudinary');
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const multer = require('multer');

// // // Cloudinary config
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET
// // });

// // // Multer + Cloudinary Storage
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: {
// //     folder: 'bills',
// //     allowed_formats: ['jpg', 'png', 'pdf'],
// //     public_id: (req, file) => file.originalname.split('.')[0],
// //   }
// // });

// // const upload = multer({ storage });

// // module.exports = { upload };
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Multer + Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'bills',
//     allowed_formats: ['jpg', 'png', 'pdf'],
//     public_id: (req, file) => file.originalname.split('.')[0],
//   }
// });

// export const upload = multer({ storage });
// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create CloudinaryStorage instance
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'assetosphere_bills',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    transformation: [{ width: 1000, crop: "limit" }],
    // Generate a unique public_id
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = file.originalname.split('.')[0];
      return `bill_${fileName}_${uniqueSuffix}`;
    }
  }
});

// Export the configured multer instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images and PDF only
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG and PDF formats are allowed.'), false);
    }
  }
});

export { cloudinary, upload };