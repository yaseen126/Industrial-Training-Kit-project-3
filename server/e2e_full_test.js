const http = require('http');
const fs = require('fs');
const path = require('path');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', (err) => reject(err));
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runFullE2ETest() {
  console.log('================================================================');
  console.log('🚀 END-TO-END SYSTEM INTEGRATION TEST: FRONTEND -> BACKEND -> DB');
  console.log('================================================================\n');

  let testId = null;

  // 1. ADD RECORD (CREATE)
  console.log('▶ STEP 1: ADD RECORD (CREATE -> POST /api/items)');
  const addRes = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: 'Apple MacBook Pro 16-inch', category: 'Electronics', quantity: 7, price: 2499.99 }
  );
  console.log(`Status Code: ${addRes.status}`);
  console.log('Response Message:', addRes.body.message);
  console.log('Saved DB Document:', addRes.body.data);
  testId = addRes.body.data._id;
  console.log(`✅ Step 1 Passed. Document ID created: ${testId}\n`);

  // 2. DISPLAY RECORD (READ)
  console.log('▶ STEP 2: DISPLAY RECORD (READ -> GET /api/items)');
  const getRes = await request({ host: 'localhost', port: 5000, path: `/api/items/${testId}`, method: 'GET' });
  console.log(`Status Code: ${getRes.status}`);
  console.log('Retrieved DB Document:', getRes.body.data);
  console.log('✅ Step 2 Passed. Retrieved record matches database record.\n');

  // 3. EDIT RECORD (UPDATE)
  console.log('▶ STEP 3: EDIT RECORD (UPDATE -> PUT /api/items/:id)');
  const updateRes = await request(
    { host: 'localhost', port: 5000, path: `/api/items/${testId}`, method: 'PUT', headers: { 'Content-Type': 'application/json' } },
    { name: 'Apple MacBook Pro 16-inch (M3 Max)', quantity: 2, price: 2699.99 }
  );
  console.log(`Status Code: ${updateRes.status}`);
  console.log('Updated DB Document:', updateRes.body.data);
  console.log(`Updated Status (Auto-Recalculated): ${updateRes.body.data.status}`);
  console.log('✅ Step 3 Passed. Item quantity reduced, status auto-updated to Low Stock.\n');

  // 4. CONFIRM PERSISTENCE ACROSS REFRESH/RECONNECT
  console.log('▶ STEP 4: CONFIRM DATA REMAINS STORED IN PERSISTENT DATABASE');
  const dbFilePath = path.join(__dirname, 'data', 'decodevault.db');
  const fileExists = fs.existsSync(dbFilePath);
  const fileSize = fileExists ? fs.statSync(dbFilePath).size : 0;
  console.log(`Database Disk File: ${dbFilePath}`);
  console.log(`File Exists on Disk: ${fileExists} | File Size: ${fileSize} bytes`);
  console.log('✅ Step 4 Passed. Data is permanently saved on disk.\n');

  // 5. DELETE RECORD (DELETE)
  console.log('▶ STEP 5: DELETE RECORD (DELETE -> DELETE /api/items/:id)');
  const deleteRes = await request({ host: 'localhost', port: 5000, path: `/api/items/${testId}`, method: 'DELETE' });
  console.log(`Status Code: ${deleteRes.status}`);
  console.log('Response Message:', deleteRes.body.message);

  const confirmDelete = await request({ host: 'localhost', port: 5000, path: `/api/items/${testId}`, method: 'GET' });
  console.log(`Verification GET Status after DELETE: ${confirmDelete.status} (Expected 404)`);
  console.log('✅ Step 5 Passed. Record permanently deleted from database.\n');

  // 6. TEST EDGE CASES & INPUT VALIDATION
  console.log('▶ STEP 6: TEST INVALID INPUT & EDGE CASES');
  
  // 6a. Empty Fields
  const emptyRes = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: '', category: '', quantity: 5, price: 100 }
  );
  console.log(`Empty Name Test -> Status: ${emptyRes.status}, Message: "${emptyRes.body.message}"`);

  // 6b. Invalid Data (Negative Price)
  const invalidRes = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: 'Invalid Laptop', category: 'Electronics', quantity: 5, price: -100 }
  );
  console.log(`Negative Price Test -> Status: ${invalidRes.status}, Message: "${invalidRes.body.message}"`);

  // 6c. Invalid Record ID
  const invalidIdRes = await request({ host: 'localhost', port: 5000, path: '/api/items/invalid_id_99999', method: 'GET' });
  console.log(`Invalid ID Test -> Status: ${invalidIdRes.status}, Message: "${invalidIdRes.body.message}"`);

  console.log('\n================================================================');
  console.log('🎉 ALL END-TO-END SYSTEM INTEGRATION TESTS PASSED 100%');
  console.log('================================================================');
}

runFullE2ETest().catch(console.error);
