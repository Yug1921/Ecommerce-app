import React, { useEffect, useState } from "react";
import { getStorefrontProducts } from "../services/api";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364758b" font-family="Arial" font-size="28">Image unavailable</text></svg>';

function ProductList() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getStorefrontProducts()
      .then((items) => setProducts(items))
      .catch(() => setError('Unable to load products right now. Please try again.'));
  }, []);

  return (
    <div>
      <p className="eyebrow">Featured collection</p>
      <h2>Discover products</h2>
      {error && <p className="error-text">{error}</p>}

      <div className="product-grid">

        {products.map(product => (

          <div className="product-card" key={product.id}>

            <img
              src={product.image}
              alt={product.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />

            <h4>{product.title}</h4>

            {product.source === 'custom' && <p className="product-badge">Seller listing</p>}

            <p className="price">${product.price}</p>

            <Link to={`/product/${product.id}`}>
              <button className="btn">View Details</button>
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductList;