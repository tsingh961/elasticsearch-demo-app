// Backend: app.js
const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

require('dotenv').config();

const app = express();
const port = 5000;
const elasticClient = new Client({
  node: 'http://localhost:9200',
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Add Product
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, available, release_date } = req.body;
    const response = await elasticClient.index({
      index: 'products',
      body: {
        name,
        category,
        price,
        available,
        release_date,
      },
    });
    res.status(201).send({ message: 'Product added', response });
  } catch (err) {
    console.error('Elasticsearch error:', err.message);
    res.status(500).send({ error: err.message });
  }
});

// Get Products
app.get('/api/products', async (req, res) => {
  try {
    const response = await elasticClient.search({
      index: 'products',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    const products = response.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));
    // console.log(products);
    res.send(products);
    
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send({ error: err.message });
  }
});

// Search Products
app.get('/api/products/search', async (req, res) => {
  console.log("first")
  const query = req.query.query;
  // console.log(req);
  try {
    const response = await elasticClient.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['name', 'category'],
          },
        },
      },
    });

    const results = response.hits.hits.map((hit) => ({
      id: hit._id, 
      ...hit._source
    }));

    res.status(200).send(results);
  } catch (err) {
    console.error('Error searching products:', err.message);
    res.status(500).send({ error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const response = await elasticClient.search({
      index: 'products',
      body: {
        from: (page - 1) * limit,
        size: limit,
        query: {
          match_all: {},
        },
      },
    });

    const products = response.hits.hits.map((hit) => hit._source);
    res.send({
      page,
      limit,
      total: response.hits.total.value,
      products,
    });
  } catch (err) {
    console.error('Error fetching paginated products:', err.message);
    res.status(500).send({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await elasticClient.delete({
      index: 'products',
      id,
    });
    res.send({ message: 'Product deleted', response });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).send({ error: err.message });
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
