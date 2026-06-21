const express = require('express');
const router = express.Router();
const valkeyClient = require('../valkeyClient');

// Subsystem 13: Real-time Recommendations
router.get('/', async (req, res) => {
  try {
    // Basic recommendation logic: get all products and pick random 4
    const keys = await valkeyClient.keys('product:*');
    const products = [];
    
    // Pick 4 random keys
    const randomKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    for (const key of randomKeys) {
      const product = await valkeyClient.json.get(key);
      if (product) products.push(product);
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
