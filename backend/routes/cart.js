const express = require('express');
const router = express.Router();
const valkeyClient = require('../valkeyClient');

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await valkeyClient.json.get(`cart:${userId}`);
    res.json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = req.body;
    await valkeyClient.json.set(`cart:${userId}`, '$', cartData);
    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validate Coupon
router.post('/coupon/validate', async (req, res) => {
  try {
    const { code } = req.body;
    if (code === 'HACKATHON20') {
      res.json({ valid: true, discountPercent: 20 });
    } else {
      res.json({ valid: false, message: 'Invalid coupon' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
