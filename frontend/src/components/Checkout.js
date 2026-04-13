import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import PaymentMock from "./PaymentMock";

function Checkout() {

  const { cart } = useContext(CartContext);
  const [placedOrder, setPlacedOrder] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrderPlaced = () => {
    setPlacedOrder(true);
  };

  return (
    <div className="panel">

      <p className="eyebrow">Checkout</p>
      <h2>Review and pay securely</h2>

      {cart.length === 0 ? (
        <div className="detail-box">
          <p className="muted">Your cart is empty right now.</p>
          <Link to="/">
            <button className="btn">Continue shopping</button>
          </Link>
        </div>
      ) : (
        <>
          <h3>Total: ${total.toFixed(2)}</h3>

          <PaymentMock total={total} onSuccess={handleOrderPlaced} />

          {placedOrder && (
            <div className="detail-box">
              <p className="success-text">Your payment was successful.</p>
              <p className="muted">A confirmation view would normally follow here.</p>
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default Checkout;