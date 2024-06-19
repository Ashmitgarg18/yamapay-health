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
  clientPromise = client.connect();
  console.log('Connected to MongoDB');
}

export { clientPromise };
