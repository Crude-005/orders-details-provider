import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

client = new MongoClient(uri, options);
clientPromise = client.connect()
  .then((client) => {
    console.log('Successfully connected to MongoDB.');
    return client;
  })
  .catch((error) => {
    console.error('MongoDB connection error:', {
      message: error.message,
      code: error.code,
      uri: uri.replace(/:[^/:]+@/, ':****@') // Mask password in connection string
    });
    throw error;
  });

// Test the connection
clientPromise
  .then(async (client) => {
    try {
      // Attempt to ping the database
      await client.db().admin().ping();
      console.log('Database ping successful - connection is healthy');
    } catch (error) {
      console.error('Database ping failed:', error);
    }
  });

export default clientPromise;