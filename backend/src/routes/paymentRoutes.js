const express = require('express');
const { body } = require('express-validator');
const { mockPayment } = require('../controllers/paymentController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post(
  '/mock',
  authenticate,
  [
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('currency')
      .isLength({ min: 3, max: 3 })
      .withMessage('Currency must be a 3-letter code'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required')
  ],
  validate,
  mockPayment
);

module.exports = router;
