import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import { searchProducts } from './api/products';
import './App.css';

function App() {
  
  const [searchResults, setSearchResults] = useState([]);

   const handleSearch = async (query) => {
    if (query) {
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
        // console.log(searchResults)
      }
      catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div className="container">
      <h1>Product Management Dashboard</h1>
      {/* Add Search */}
      {/* <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-bar"
        />
      </div>       */}
      {/* Add Form and Product List */}
      <SearchBar handleSearch={handleSearch} />
      <ProductList results={searchResults} />
      <ProductForm />
    </div>
  );
}

export default App;
