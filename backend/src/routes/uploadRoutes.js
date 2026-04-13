const express = require('express');
const authenticate = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { uploadProductImage } = require('../controllers/uploadController');

const router = express.Router();

router.post('/product-image', authenticate, upload.single('image'), uploadProductImage);

module.exports = router;
