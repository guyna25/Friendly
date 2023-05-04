const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env')});
const mongoose = require('mongoose');
const {get_full_access_url} = require('./db_password_loader');
const MONGO_URL = get_full_access_url(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.CLUSTER_URL);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});
// path.join(__dirname, '..', '..', '.env')
async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}