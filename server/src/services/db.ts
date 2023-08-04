/* eslint-disable prettier/prettier */
import * as path from 'path';
import {config} from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-var-requires
config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
});
import mongoose from 'mongoose';
import { get_full_access_url } from './db_password_loader';
const MONGO_URL = get_full_access_url(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.CLUSTER_URL,
);


mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error('Connection err:');
  console.error(err);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}