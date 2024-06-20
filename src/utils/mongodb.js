import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
};

let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(() => {
      console.log('Connected to MongoDB');
      return client;
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    });
}

export { clientPromise };
