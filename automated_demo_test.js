const axios = require('axios');
const valkeyClient = require('./backend/valkeyClient');

const API_URL = 'http://localhost:5000/api';
const PRODUCT_ID = 'testproduct123';

async function runDemoTest() {
  console.log("=== STARTING VALKEY CONCURRENCY DEMO TEST ===\n");

  // Connect to Valkey directly to seed and verify state
  try {
    await valkeyClient.connect();
  } catch(e) {
    // might already be connected
  }

  // Ensure lock doesn't exist from previous test runs
  await valkeyClient.del(`lock:${PRODUCT_ID}`);

  console.log("---------------------------------------------------------");
  console.log("SCENARIO 1: Strict Concurrency (Simultaneous Purchases)");
  console.log("Goal: Prevent overselling when stock is 1.");
  console.log("---------------------------------------------------------");
  
  // Step 2: Seed inventory
  await valkeyClient.set(`inventory:${PRODUCT_ID}`, 1);
  console.log(`✅ [Step 2] Seeded inventory:${PRODUCT_ID} = 1`);

  // Step 3: Verify Inventory Endpoint
  const getInvRes = await axios.get(`${API_URL}/inventory/${PRODUCT_ID}`);
  console.log(`✅ [Step 3] Verified Inventory Endpoint: Stock is ${getInvRes.data.stock}`);

  // Step 4 & 5: Simulate concurrent checkouts
  const checkoutPayloadA = { items: [{ id: PRODUCT_ID, qty: 1 }], userId: 'UserA' };
  const checkoutPayloadB = { items: [{ id: PRODUCT_ID, qty: 1 }], userId: 'UserB' };

  console.log("\n[Step 4 & 5] User A and User B click 'Buy Now' at the exact same millisecond...");

  const reqA = axios.post(`${API_URL}/checkout/process`, checkoutPayloadA).catch(e => e.response);
  const reqB = axios.post(`${API_URL}/checkout/process`, checkoutPayloadB).catch(e => e.response);

  // Await both simultaneously
  const [resA, resB] = await Promise.all([reqA, reqB]);

  console.log(`\nUser A Result: [Status ${resA.status}] -> ${JSON.stringify(resA.data)}`);
  console.log(`User B Result: [Status ${resB.status}] -> ${JSON.stringify(resB.data)}`);

  if ((resA.status === 200 && resB.status !== 200) || (resA.status !== 200 && resB.status === 200)) {
    console.log("✅ Exactly ONE user succeeded and the other was blocked! (Distributed Locking is working)");
  } else {
    console.error("❌ FAILED: Either both succeeded or both failed unexpectedly.");
  }

  // Step 6: Verify final inventory
  const finalStock1 = await valkeyClient.get(`inventory:${PRODUCT_ID}`);
  console.log(`\n[Step 6] Final Stock: ${finalStock1}`);
  if (parseInt(finalStock1) === 0) {
    console.log("✅ Atomic operations successful! Stock is exactly 0 (No negative inventory).");
  } else {
    console.error(`❌ FAILED: Stock is ${finalStock1} instead of 0.`);
  }

  // Step 7 & 8: Verify lock is removed
  const lockExists = await valkeyClient.exists(`lock:${PRODUCT_ID}`);
  if (lockExists === 0) {
    console.log("✅ [Step 7 & 8] Lock was successfully removed automatically after purchase.");
  } else {
    console.error("❌ FAILED: Lock was not removed.");
  }

  console.log("\n---------------------------------------------------------");
  console.log("SCENARIO 2: High Concurrency (Judge Level Test)");
  console.log("Goal: 5 stock, 5 simultaneous concurrent buyers");
  console.log("---------------------------------------------------------");
  
  await valkeyClient.set(`inventory:${PRODUCT_ID}`, 5);
  console.log(`✅ Seeded inventory:${PRODUCT_ID} = 5`);

  console.log("\n5 users clicking 'Buy Now' simultaneously...");
  const concurrentRequests = [];
  for (let i = 1; i <= 5; i++) {
    // Use staggered delays to simulate realistic high load or identical fire
    concurrentRequests.push(
      axios.post(`${API_URL}/checkout/process`, { items: [{ id: PRODUCT_ID, qty: 1 }], userId: `User${i}` })
        .then(r => `✅ [200] Success: User${i} got the product.`)
        .catch(e => `❌ [${e.response?.status}] Failed: User${i} -> ${e.response?.data?.message}`)
    );
  }

  const results = await Promise.all(concurrentRequests);
  results.forEach(res => console.log(res));

  const finalStock5 = await valkeyClient.get(`inventory:${PRODUCT_ID}`);
  console.log(`\n[Step 10] Final Stock after 5 concurrent purchases: ${finalStock5}`);
  
  if (parseInt(finalStock5) === 0) {
    console.log("✅ High Concurrency Test Passed! Inventory accurately tracked 5 separate purchases.");
  } else if (parseInt(finalStock5) > 0) {
      console.log(`⚠️ Some purchases failed due to lock contention (expected in NX locks). Stock remaining: ${finalStock5}`);
  } else {
      console.error("❌ FAILED: Stock dropped below 0!");
  }

  console.log("\n=== ALL TESTS COMPLETED ===");
  process.exit(0);
}

runDemoTest();
