const express = require('express');
const router = express.Router();
const valkeyClient = require('../valkeyClient');
const LockManager = require('../services/lockManager');
const InventoryService = require('../services/inventoryService');
const PubSubService = require('../services/pubsubService');

// Subsystem 10: Checkout & Inventory Tracking
router.post('/process', async (req, res) => {
  try {
    const { items, userId } = req.body;
    
    // Simulate transaction to decrement inventory safely
    for (const item of items) {
      // Step 1: Acquire lock before processing
      const locked = await LockManager.acquireLock(item.id, userId);
      if (!locked) {
        return res.status(409).json({ success: false, message: "Product currently being purchased" });
      }

      try {
        // Step 2: Atomic decrement
        const reserved = await InventoryService.reserveInventory(item.id, item.qty);
        if (!reserved) {
          await LockManager.releaseLock(item.id, userId);
          return res.status(400).json({ success: false, message: `Out of stock` });
        }
      } finally {
        // Step 3: Release lock
        await LockManager.releaseLock(item.id, userId);
        await PubSubService.publishLockStatus(item.id, false);
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
