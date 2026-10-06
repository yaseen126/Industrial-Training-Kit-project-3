const Datastore = require('nedb-promises');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbFile = path.join(dataDir, 'decodevault.db');
const db = Datastore.create({ filename: dbFile, autoload: true });

db.ensureIndex({ fieldName: 'name', unique: true });

const connectDB = async () => {
  console.log(`[Database] File Database (NeDB) Initialized Successfully at: ${dbFile}`);
  return db;
};

module.exports = { connectDB, db };
