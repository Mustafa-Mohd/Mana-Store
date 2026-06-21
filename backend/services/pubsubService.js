const { createClient } = require('redis'); // Or the valkey equivalent you are using
const logger = require('../utils/logger');

// We need a separate connection for subscribing in Redis/Valkey
const pubClient = createClient({ url: process.env.VALKEY_URL || 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

class PubSubService {
  static io;

  static async init(ioInstance) {
    this.io = ioInstance;
    
    await pubClient.connect();
    await subClient.connect();

    logger.info('Pub/Sub clients connected');

    // Subscribe to inventory updates
    await subClient.subscribe('inventory_updates', (message) => {
      logger.info(`Received inventory update: ${message}`);
      // Broadcast to all connected WebSockets
      if (this.io) {
        this.io.emit('inventory_update', JSON.parse(message));
      }
    });
  }

  static async publishInventoryUpdate(productId, remainingStock, status) {
    const message = JSON.stringify({ productId, remainingStock, status });
    await pubClient.publish('inventory_updates', message);
  }

  static async publishLockStatus(productId, isLocked) {
    const message = JSON.stringify({ productId, isLocked, type: 'LOCK_STATUS' });
    await pubClient.publish('inventory_updates', message);
  }
}

module.exports = PubSubService;
