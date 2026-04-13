function mockPayment(req, res) {
  const { amount, currency, paymentMethod } = req.body;

  const shouldFail = paymentMethod === 'fail' || amount > 100000;

  if (shouldFail) {
    return res.status(400).json({
      success: false,
      message: 'Payment failed in mock gateway',
      data: {
        amount,
        currency,
        status: 'failed',
        reason: 'Mock rule triggered'
      }
    });
  }

  return res.json({
    success: true,
    message: 'Payment successful in mock gateway',
    data: {
      amount,
      currency,
      status: 'success',
      transactionId: `txn_${Date.now()}`
    }
  });
}

module.exports = {
  mockPayment
};
