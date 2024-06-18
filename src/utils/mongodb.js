// src/utils/mongodb.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    if (!client.isConnected()) await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(); // No need to specify the database name again here
    return { db, client };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export { connectToDatabase };
