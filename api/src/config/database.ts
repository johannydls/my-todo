import mongoose from 'mongoose';
import Logging from '../lib/Logging';

main().catch((err) => {
  console.log('Database connection error');
  console.log(err);
});

async function main() {
  const DB_USER = process.env.DB_USER || 'user';
  const DB_PASS = process.env.DB_PASS || 'pass';
  const DB_NAME = process.env.DB_NAME || '';
  const DB_URL = process.env.DB_URL || 'url';

  const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}`;
  Logging.info('Connecting database...');
  await mongoose.connect(URL, { retryWrites: true, w: 'majority' }).then(() => {
    Logging.info('Database connected');
  });
}

export { mongoose };
