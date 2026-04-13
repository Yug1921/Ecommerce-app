import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCatalogProduct } from '../services/api';

function UploadProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setResult(null);

    if (!file) {
      setError('Please choose an image file first.');
      return;
    }

    try {
      const response = await createCatalogProduct({
        title: form.title,
        description: form.description,
        price: form.price,
        image: file
      });

      const product = response.data.data.product;
      setResult(product);
      setMessage('Product published successfully.');
      setForm({ title: '', description: '', price: '' });
      setFile(null);

      setTimeout(() => {
        navigate(`/product/${product.id}`);
      }, 700);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="panel">
      <p className="eyebrow">Catalog</p>
      <h2>Sell a new product</h2>
      <p className="muted">Add details and an image, then publish it to your storefront.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Product title
          <input name="title" value={form.title} onChange={onChange} placeholder="e.g. Cotton T-Shirt" required />
        </label>
        <label>
          Description
          <input name="description" value={form.description} onChange={onChange} placeholder="Describe your product" required />
        </label>
        <label>
          Price
          <input type="number" min="1" step="0.01" name="price" value={form.price} onChange={onChange} placeholder="e.g. 29.99" required />
        </label>
        <label>
          Product image
          <input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        </label>
        <button className="btn btn-full" type="submit">Publish Product</button>
      </form>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="detail-box">
          <p><strong>Title:</strong> {result.title}</p>
          <p><strong>Price:</strong> ${result.price}</p>
          <p className="muted">Redirecting to your product page...</p>
        </div>
      )}
    </div>
  );
}

export default UploadProduct;
