import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getStorefrontProductById } from "../services/api";
import { CartContext } from "../context/CartContext";

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364758b" font-family="Arial" font-size="28">Image unavailable</text></svg>';

function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getStorefrontProductById(id)
      .then((item) => setProduct(item))
      .catch(() => setError('Could not load this product.'));
  }, [id]);

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!product.id) {
    return <p className="muted">Loading product...</p>;
  }

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <h3 className="price">${product.price}</h3>

      <button className="btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductDetail;