const API_URL = 'http://localhost:5000/api';

async function seed() {
  console.log('Starting seed...');

  // 1. Create categories
  const catNames = ['Mobile & Accessories', 'Laptop', 'Electronics', 'Smart Watch', 'Vegetables', 'Beverages', 'Meats & Seafood'];
  const categories = {};
  for (const name of catNames) {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug: name.toLowerCase().replace(/ /g, '-') })
    });
    const data = await res.json();
    categories[name] = data.id;
    console.log('Created category:', data.id);
  }

  // 2. Create vendors
  const vendorNames = ['Farms Direct', 'Tech Hub', 'GadgetStore'];
  const vendors = {};
  for (const name of vendorNames) {
    const res = await fetch(`${API_URL}/vendors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email: `${name.toLowerCase().replace(/ /g, '')}@example.com` })
    });
    const data = await res.json();
    vendors[name] = data.id;
    console.log('Created vendor:', data.id);
  }

  // 3. Create products
  const productsToCreate = [
    // --- VEGETABLES ---
    {
      name: "Fresh Organic Broccoli", categoryId: categories['Vegetables'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Crisp and fresh organic broccoli.", price: { amount: 4.99, currency: "USD", discount: 0 }, inventory: { quantity: 150, sku: "VEG-001" }, ratings: { average: 4.8, count: 120 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOyntfuHSmGo8-2mqfzppCZEJ5s-mQlc10aLYmie3PyQ&s=10"], attributes: { weight: "500g" }
    },
    {
      name: "Ripe Red Tomatoes", categoryId: categories['Vegetables'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Juicy organic tomatoes on the vine.", price: { amount: 3.49, currency: "USD", discount: 0 }, inventory: { quantity: 200, sku: "VEG-002" }, ratings: { average: 4.5, count: 85 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSim6L4Svk1Q-1oiWmFH5uIT6JpgCf9PFk4x47nBo4zVw&s=10"], attributes: { weight: "1kg" }
    },
    {
      name: "Green Bell Peppers", categoryId: categories['Vegetables'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Crunchy green bell peppers.", price: { amount: 2.99, currency: "USD", discount: 0 }, inventory: { quantity: 100, sku: "VEG-003" }, ratings: { average: 4.6, count: 60 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqVwtasL1Mn1QocdR10GGQi7gTGEEwYgTUBGR7YJ_inA&s=10"], attributes: { weight: "3 pcs" }
    },
    {
      name: "Organic Carrots", categoryId: categories['Vegetables'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Sweet and crunchy carrots.", price: { amount: 1.99, currency: "USD", discount: 0 }, inventory: { quantity: 300, sku: "VEG-004" }, ratings: { average: 4.9, count: 210 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsb5Q8huWKC_y1FKO9Oe_UMubRE3B6jWmeblrSPyAZA&s=10"], attributes: { weight: "1kg bunch" }
    },
    {
      name: "Fresh Spinach", categoryId: categories['Vegetables'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Nutrient-packed fresh baby spinach.", price: { amount: 5.99, currency: "USD", discount: 0 }, inventory: { quantity: 80, sku: "VEG-005" }, ratings: { average: 4.7, count: 95 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hItoE1zYTSuDBbOxvBb6jmqCo1b4osGoZ3W6HmUyFQ&s"], attributes: { weight: "250g" }
    },

    // --- BEVERAGES ---
    {
      name: "Sparkling Lemon Water", categoryId: categories['Beverages'], vendorId: vendors['Farms Direct'], brand: "AquaFresh", description: "Refreshing sparkling water with a hint of lemon.", price: { amount: 1.49, currency: "USD", discount: 0 }, inventory: { quantity: 500, sku: "BEV-001" }, ratings: { average: 4.5, count: 300 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeadlUgVeTaPLFbtK4Pu0LTwKevkwW52WsEBGJgF9zA&s=10"], attributes: { volume: "500ml" }
    },
    {
      name: "100% Orange Juice", categoryId: categories['Beverages'], vendorId: vendors['Farms Direct'], brand: "CitrusGlow", description: "Freshly squeezed 100% pure orange juice.", price: { amount: 4.99, currency: "USD", discount: 0 }, inventory: { quantity: 150, sku: "BEV-002" }, ratings: { average: 4.8, count: 450 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiRSyB1AV_fTzfWmwDj0oETFjrFlS4DKJsF_w4Qvqk5A&s=10"], attributes: { volume: "1L" }
    },
    {
      name: "Cold Brew Coffee", categoryId: categories['Beverages'], vendorId: vendors['Farms Direct'], brand: "MorningRoast", description: "Smooth and strong cold brew coffee.", price: { amount: 3.99, currency: "USD", discount: 0 }, inventory: { quantity: 200, sku: "BEV-003" }, ratings: { average: 4.9, count: 800 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxOtacya-whExJiK60yXAPGXjGg8oNiQts7To4vDXQw&s=10"], attributes: { volume: "350ml" }
    },
    {
      name: "Organic Green Tea", categoryId: categories['Beverages'], vendorId: vendors['Farms Direct'], brand: "ZenLeaf", description: "Calming organic iced green tea.", price: { amount: 2.49, currency: "USD", discount: 0 }, inventory: { quantity: 300, sku: "BEV-004" }, ratings: { average: 4.6, count: 120 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPs-2GIv7RwLLGsYiQm-Gx9Q872QDESN2gguQieqbiBg&s=10"], attributes: { volume: "500ml" }
    },
    {
      name: "Berry Protein Smoothie", categoryId: categories['Beverages'], vendorId: vendors['Farms Direct'], brand: "FitFuel", description: "Mixed berry smoothie packed with protein.", price: { amount: 5.49, currency: "USD", discount: 0 }, inventory: { quantity: 100, sku: "BEV-005" }, ratings: { average: 4.7, count: 210 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEsz-IhVExeGME5auM7nXhmorVYNgy0HluiAsEVBXKA&s=10"], attributes: { volume: "400ml" }
    },

    // --- MEATS & SEAFOOD ---
    {
      name: "Fresh Atlantic Salmon", categoryId: categories['Meats & Seafood'], vendorId: vendors['Farms Direct'], brand: "OceanCatch", description: "Premium fresh-caught Atlantic salmon fillet.", price: { amount: 14.99, currency: "USD", discount: 0 }, inventory: { quantity: 50, sku: "MEA-001" }, ratings: { average: 4.9, count: 180 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbQ94MYLr7BiG5KCzs86UNZWNdrrXpbE6YfSD4jE6Xzw&s=10"], attributes: { weight: "1 lb" }
    },
    {
      name: "Organic Chicken Breast", categoryId: categories['Meats & Seafood'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Boneless, skinless organic chicken breasts.", price: { amount: 9.99, currency: "USD", discount: 0 }, inventory: { quantity: 100, sku: "MEA-002" }, ratings: { average: 4.7, count: 320 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrStTzjUgy7nZEftoD69I5BZ0urXH_jaFbiKO71BkMDA&s=10"], attributes: { weight: "1.5 lbs" }
    },
    {
      name: "Grass-Fed Beef Ribeye", categoryId: categories['Meats & Seafood'], vendorId: vendors['Farms Direct'], brand: "PrimeCuts", description: "Thick-cut grass-fed beef ribeye steak.", price: { amount: 19.99, currency: "USD", discount: 0 }, inventory: { quantity: 40, sku: "MEA-003" }, ratings: { average: 4.8, count: 250 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLoXybILzADNqViVv4CAHsjqOUsq-fuK4ojsSDNHW4DA&s=10"], attributes: { weight: "1 lb" }
    },
    {
      name: "Jumbo Shrimp", categoryId: categories['Meats & Seafood'], vendorId: vendors['Farms Direct'], brand: "OceanCatch", description: "Wild-caught raw jumbo shrimp.", price: { amount: 16.99, currency: "USD", discount: 0 }, inventory: { quantity: 60, sku: "MEA-004" }, ratings: { average: 4.6, count: 140 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpe1C3WY_lFmXtGjrvqsmYgOyKoBjzEe3qXfYUYvz7gA&s=10"], attributes: { weight: "1 lb" }
    },
    {
      name: "Ground Turkey", categoryId: categories['Meats & Seafood'], vendorId: vendors['Farms Direct'], brand: "Farm Fresh", description: "Lean ground turkey meat.", price: { amount: 6.99, currency: "USD", discount: 0 }, inventory: { quantity: 80, sku: "MEA-005" }, ratings: { average: 4.5, count: 190 },
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXyRGw5G1tjMbLnpb5vcMWCEZJ12DnY4y9S_om316CLQ&s=10"], attributes: { weight: "1 lb" }
    }
  ];

  for (const p of productsToCreate) {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p)
    });
    const data = await res.json();
    console.log(`Created product ${p.name}:`, data.id);
  }

  console.log('Seeding complete!');
}

seed().catch(console.error);
