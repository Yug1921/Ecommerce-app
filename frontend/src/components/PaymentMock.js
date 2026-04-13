import React, { useMemo, useState } from 'react';
import { createMockPayment } from '../services/api';

function PaymentMock({ total, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const amount = useMemo(() => Math.round(total || 0), [total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setResult(null);

    try {
      const response = await createMockPayment({
        amount,
        currency: 'INR',
        paymentMethod
      });
      setResult(response.data.data);
      setMessage(response.data.message);
      if (onSuccess) {
        onSuccess(response.data.data);
      }
    } catch (requestError) {
      const responseData = requestError.response?.data;
      setError(responseData?.message || 'Payment failed');
      setResult(responseData?.data || null);
    }
  };

  return (
    <div className="payment-flow">
      <p className="eyebrow">Payment</p>
      <h2>Complete your payment</h2>
      <p className="muted">Choose a payment method and confirm your order.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Payment method
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
            <option value="fail">Force failure</option>
          </select>
        </label>
        <button className="btn btn-full" type="submit">
          Pay INR {amount}
        </button>
      </form>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="detail-box">
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Reference:</strong> <span className="inline-code">{result.transactionId || result.reason}</span></p>
        </div>
      )}
    </div>
  );
}

export default PaymentMock;
