import React, { useState } from 'react';
import { addProduct } from '../api/products';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    available: true,
    release_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      alert('Product added successfully!');
      setFormData({ name: '', category: '', price: '', available: true, release_date: '' });
    //   onRefresh(); // Refresh Product List
    window.location.reload(false);
    } catch (err) {
      alert('Failed to add product');
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
