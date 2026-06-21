const express = require('express');
const router = express.Router();
const LockManager = require('../services/lockManager');
const InventoryService = require('../services/inventoryService');
const PubSubService = require('../services/pubsubService');

router.post('/reserve', async (req, res) => {
  const { productId, userId } = req.body;
  
  // Attempt to acquire lock
  const locked = await LockManager.acquireLock(productId, userId);
  if (!locked) {
    return res.status(409).json({ message: "Product currently being purchased" });
  }

  // Publish lock status
  await PubSubService.publishLockStatus(productId, true);

  res.json({ message: "Lock acquired, proceed to checkout" });
});

router.post('/release', async (req, res) => {
  const { productId, userId } = req.body;
  await LockManager.releaseLock(productId, userId);
  await PubSubService.publishLockStatus(productId, false);
  res.json({ message: "Lock released" });
});

router.get('/:productId', async (req, res) => {
  const qty = await InventoryService.getInventory(req.params.productId);
  res.json({ stock: qty });
});

module.exports = router;
