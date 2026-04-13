const express = require('express');
const { body } = require('express-validator');
const authenticate = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validate');
const {
  createCatalogProduct,
  getCatalogProducts,
  getCatalogProductById
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getCatalogProducts);
router.get('/:id', getCatalogProductById);

router.post(
  '/',
  authenticate,
  upload.single('image'),
  [
    body('title').trim().notEmpty().withMessage('Product title is required'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  validate,
  createCatalogProduct
);

module.exports = router;
