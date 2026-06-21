require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const valkeyClient = require('./valkeyClient');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./utils/logger');
const { register, httpRequestDurationMicroseconds } = require('./utils/metrics');
const categoryRoutes = require('./routes/categories');
const vendorRoutes = require('./routes/vendors');
const searchRoutes = require('./routes/search');
const adRoutes = require('./routes/ads');
const agentRoutes = require('./routes/agent');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const deliveryRoutes = require('./routes/delivery');
const recommendationsRoutes = require('./routes/recommendations');
const inventoryRoutes = require('./routes/inventory');
const PubSubService = require('./services/pubsubService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Apply rate limiter to all requests
app.use(rateLimiter);

// Log all requests using Winston
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : req.path, code: res.statusCode });
  });
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/inventory', inventoryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start server
const startServer = async () => {
  try {
    await valkeyClient.connect();
    
    // Initialize PubSub and WebSockets
    await PubSubService.init(io);
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
