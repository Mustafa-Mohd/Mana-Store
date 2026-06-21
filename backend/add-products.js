const http = require('http');

const products = [
  {
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with 30-hour battery life.",
    brand: "AudioTech",
    tags: ["headphones", "audio", "wireless"],
    categoryId: "electronics",
    price: { amount: 149.99, currency: "USD", discount: 10 },
    inventory: { quantity: 50 },
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"],
    ratings: { average: 4.8, count: 124 }
  },
  {
    name: "DSLR Action Camera Pro",
    description: "4K video recording, waterproof up to 10m, dual screens.",
    brand: "CamPro",
    tags: ["cameras", "photography", "action"],
    categoryId: "electronics",
    price: { amount: 399.99, currency: "USD", discount: 0 },
    inventory: { quantity: 20 },
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop"],
    ratings: { average: 4.5, count: 89 }
  },
  {
    name: "Urban Classic Sneakers",
    description: "Comfortable everyday sneakers with breathable mesh.",
    brand: "StepRun",
    tags: ["sneakers", "shoes", "fashion"],
    categoryId: "fashion",
    price: { amount: 89.99, currency: "USD", discount: 0 },
    inventory: { quantity: 100 },
    images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop"],
    ratings: { average: 4.3, count: 42 }
  },
  {
    name: "Crimson Red Kicks",
    description: "High-top stylish red kicks for the modern look.",
    brand: "StepRun",
    tags: ["red kicks", "sneakers", "shoes"],
    categoryId: "fashion",
    price: { amount: 110.00, currency: "USD", discount: 15 },
    inventory: { quantity: 30 },
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"],
    ratings: { average: 4.7, count: 215 }
  },
  {
    name: "Onyx Smart Watch Series X",
    description: "Fitness tracking, heart rate monitor, and seamless notifications.",
    brand: "TechWear",
    tags: ["smart watches", "wearable", "fitness"],
    categoryId: "electronics",
    price: { amount: 199.99, currency: "USD", discount: 20 },
    inventory: { quantity: 75 },
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"],
    ratings: { average: 4.6, count: 312 }
  }
];

async function addProducts() {
  for (const product of products) {
    const data = JSON.stringify(product);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let resData = '';
        res.on('data', chunk => resData += chunk);
        res.on('end', () => {
          console.log(`Added ${product.name}: ${res.statusCode}`);
          resolve();
        });
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
}

addProducts().catch(console.error);
