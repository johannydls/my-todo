import mongoose from 'mongoose';

main().catch(err => {
  console.log('Database connection error');
  console.log(err);
});

async function main() {
  const DB_USER = process.env.DB_USER || 'user';
  const DB_PASS = process.env.DB_PASS || 'pass';
  const DB_NAME = process.env.DB_NAME || '';

  const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.y7uig.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  console.log(`\nConnecting database...`);
  await mongoose.connect(URL).then(() => {
    console.log(`Database connected ${new Date(Date.now())}\n`);
  });
}

export { mongoose };