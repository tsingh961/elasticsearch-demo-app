import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../api/products";

const ProductList = ({results}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    // console.log(results.length);
    setLoading(true);
    if (results && results.length > 0) {
      setProducts(results); // Set products to search results
      // console.log("products");
      setLoading(false);
      // return;
    } else {
      const data = await fetchProducts();
        // console.log(data);
      setProducts(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [results]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Available</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.release_date}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.available ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
