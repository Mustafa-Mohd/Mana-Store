const express = require('express');
const router = express.Router();
const valkeyClient = require('../valkeyClient');

// Subsystem 10: Checkout & Inventory Tracking
router.post('/process', async (req, res) => {
  try {
    const { items, userId } = req.body;
    
    // Simulate transaction to decrement inventory safely
    for (const item of items) {
      const product = await valkeyClient.json.get(`product:${item.id}`);
      if (product && product.inventory.quantity >= item.qty) {
        product.inventory.quantity -= item.qty;
        await valkeyClient.json.set(`product:${item.id}`, '$', product);
      } else {
        return res.status(400).json({ success: false, message: `Insufficient inventory for ${item.name}` });
      }
    }

    // Clear cart
    await valkeyClient.del(`cart:${userId}`);

    res.json({ success: true, orderId: `ORD-${Date.now()}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
