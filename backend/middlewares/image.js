// config/cloudinary.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure cloudinary
cloudinary.config({
  cloud_name:'dj49kskat',
  api_key:'384795918682746',
  api_secret:'cU1CF1WyB8X-MCEZPcIFIm3Q1WE'
});

// Configure multer and Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_images', // Specify the folder name in Cloudinary where you want to store images
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Add transformations
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
