const valkeyClient = require('../valkeyClient');
const logger = require('../utils/logger');

class LockManager {
  /**
   * Acquire a distributed lock for a product.
   * @param {string} productId 
   * @param {string} userId 
   * @param {number} ttlSeconds 
   * @returns {boolean} true if lock acquired, false otherwise
   */
  static async acquireLock(productId, userId, ttlSeconds = 10) {
    const lockKey = `lock:product:${productId}`;
    try {
      // SET key value NX EX seconds
      const result = await valkeyClient.set(lockKey, userId, {
        NX: true,
        EX: ttlSeconds
      });
      
      if (result === 'OK') {
        logger.info(`Lock acquired for ${productId} by user ${userId}`);
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Error acquiring lock:', error);
      return false;
    }
  }

  /**
   * Release a distributed lock.
   * @param {string} productId 
   * @param {string} userId 
   */
  static async releaseLock(productId, userId) {
    const lockKey = `lock:product:${productId}`;
    try {
      // Basic check-and-delete to ensure we only delete our own lock
      // In production, use a Lua script for atomicity
      const currentOwner = await valkeyClient.get(lockKey);
      if (currentOwner === userId) {
        await valkeyClient.del(lockKey);
        logger.info(`Lock released for ${productId} by user ${userId}`);
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Error releasing lock:', error);
      return false;
    }
  }
}

module.exports = LockManager;
