import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {

  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="panel">

      <p className="eyebrow">Shopping cart</p>
      <h2>Review your items</h2>

      {cart.length === 0 ? (
        <div className="detail-box">
          <p className="muted">Your cart is empty. Browse the collection and add something you like.</p>
          <Link to="/">
            <button className="btn">Shop now</button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map(item => (

            <div key={item.id} className="cart-item">

              <h4>{item.title}</h4>

              <p>${item.price}</p>

              <button className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>

            </div>

          ))}

          <h3>Total: ${total.toFixed(2)}</h3>

          <Link to="/checkout">
            <button className="btn">Continue to checkout</button>
          </Link>
        </>
      )}

    </div>
  );
}

export default Cart;