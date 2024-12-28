const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async (query = '', page = 1) => {
  const response = await fetch(`${API_URL}?q=${query}&page=${page}`);
  // const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data;
};

export const addProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error('Error in deleteProduct:', err.message);
    throw err;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    // console.log(response);
    // console.log(query);
    if (!response.ok) {
      throw new Error(`Error searching products: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in searchProducts:', err.message);
    throw err;
  }
};

