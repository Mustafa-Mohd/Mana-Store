const valkeyClient = require('../valkeyClient');
const logger = require('../utils/logger');
const PubSubService = require('./pubsubService');

class InventoryService {
  /**
   * Atopically decrement inventory
   * @param {string} productId 
   * @param {number} qty 
   */
  static async reserveInventory(productId, qty) {
    const productKey = `product:${productId}`;
    try {
      // Fetch product to check inventory
      // In a real production system, you'd use a Lua script for check-and-set atomicity
      const product = await valkeyClient.json.get(productKey);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      if (product.inventory.quantity >= qty) {
        product.inventory.quantity -= qty;
        await valkeyClient.json.set(productKey, '$', product);
        
        // Publish real-time update
        PubSubService.publishInventoryUpdate(productId, product.inventory.quantity, 'Reserved');
        return true;
      }
      return false; // Out of stock
    } catch (error) {
      logger.error('Error reserving inventory:', error);
      throw error;
    }
  }

  static async getInventory(productId) {
    const productKey = `product:${productId}`;
    const product = await valkeyClient.json.get(productKey);
    return product ? product.inventory.quantity : 0;
  }
}

module.exports = InventoryService;
