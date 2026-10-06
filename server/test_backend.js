const http = require('http');

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

async function runBackendTests() {
  console.log('==================================================');
  console.log('🧪 RUNNING COMPLETE BACKEND TEST SUITE FOR DECODEVAULT');
  console.log('==================================================\n');

  let createdId = null;

  // TEST 1: CREATE
  console.log('--- TEST 1: CREATE (POST /api/items) ---');
  const createRes = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: 'Logitech MX Master 3S', category: 'Electronics', quantity: 10, price: 99.99 }
  );
  console.log(`Status: ${createRes.status}`);
  console.log('Response:', JSON.stringify(createRes.body, null, 2));
  createdId = createRes.body.data ? createRes.body.data._id : null;
  console.log(`\nCreated Item ID: ${createdId}\n`);

  // TEST 2: READ ALL
  console.log('--- TEST 2: READ ALL (GET /api/items) ---');
  const readAllRes = await request({ host: 'localhost', port: 5000, path: '/api/items', method: 'GET' });
  console.log(`Status: ${readAllRes.status}`);
  console.log(`Item Count: ${readAllRes.body.count}\n`);

  // TEST 2B: READ SINGLE
  console.log(`--- TEST 2B: READ SINGLE (GET /api/items/${createdId}) ---`);
  const readSingleRes = await request({ host: 'localhost', port: 5000, path: `/api/items/${createdId}`, method: 'GET' });
  console.log(`Status: ${readSingleRes.status}`);
  console.log('Response:', JSON.stringify(readSingleRes.body, null, 2), '\n');

  // TEST 3: UPDATE
  console.log(`--- TEST 3: UPDATE (PUT /api/items/${createdId}) ---`);
  const updateRes = await request(
    { host: 'localhost', port: 5000, path: `/api/items/${createdId}`, method: 'PUT', headers: { 'Content-Type': 'application/json' } },
    { name: 'Logitech MX Master 3S Wireless', quantity: 2, price: 89.99 }
  );
  console.log(`Status: ${updateRes.status}`);
  console.log('Response:', JSON.stringify(updateRes.body, null, 2), '\n');

  // TEST 4: DELETE
  console.log(`--- TEST 4: DELETE (DELETE /api/items/${createdId}) ---`);
  const deleteRes = await request({ host: 'localhost', port: 5000, path: `/api/items/${createdId}`, method: 'DELETE' });
  console.log(`Status: ${deleteRes.status}`);
  console.log('Response:', JSON.stringify(deleteRes.body, null, 2), '\n');

  // TEST 5: MISSING REQUIRED FIELDS
  console.log('--- TEST 5: EDGE CASE - MISSING REQUIRED FIELDS ---');
  const missingRes = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { category: 'Electronics', quantity: 5 }
  );
  console.log(`Status: ${missingRes.status}`);
  console.log('Response:', JSON.stringify(missingRes.body, null, 2), '\n');

  // TEST 6: INVALID DATA (NEGATIVE QUANTITY)
  console.log('--- TEST 6: EDGE CASE - INVALID DATA (NEGATIVE QUANTITY) ---');
  const invalidDataRes = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: 'Invalid Item', category: 'Electronics', quantity: -5, price: 50 }
  );
  console.log(`Status: ${invalidDataRes.status}`);
  console.log('Response:', JSON.stringify(invalidDataRes.body, null, 2), '\n');

  // TEST 7: NON-EXISTING RECORD
  console.log('--- TEST 7: EDGE CASE - NON-EXISTING RECORD ---');
  const nonExistRes = await request({ host: 'localhost', port: 5000, path: '/api/items/nonexistent12345', method: 'GET' });
  console.log(`Status: ${nonExistRes.status}`);
  console.log('Response:', JSON.stringify(nonExistRes.body, null, 2), '\n');

  // TEST 8: DUPLICATE NAME CONSTRAINTS
  console.log('--- TEST 8: EDGE CASE - DUPLICATE NAME CONSTRAINT ---');
  const dup1 = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: 'Unique Desk Lamp', category: 'Furniture', quantity: 10, price: 29.99 }
  );
  const dup2 = await request(
    { host: 'localhost', port: 5000, path: '/api/items', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { name: 'Unique Desk Lamp', category: 'Furniture', quantity: 5, price: 29.99 }
  );
  console.log(`Status: ${dup2.status}`);
  console.log('Response:', JSON.stringify(dup2.body, null, 2), '\n');

  console.log('==================================================');
  console.log('✅ ALL BACKEND TESTS EXECUTED SUCCESSFULLY');
  console.log('==================================================');
}

runBackendTests().catch(console.error);
