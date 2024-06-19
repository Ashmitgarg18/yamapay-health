// src/pages/api/user/register.js
import { clientPromise } from '../../../utils/mongodb';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  const { method } = req;

  console.log(`Received request: ${method}`); // Log request method

  try {
    const database = await clientPromise;
    const db1 = database.db("auth");

    if (method === 'POST') {
      const { username, password } = req.body;

      console.log('Register endpoint hit');
      const existingUser = await db1.collection('users').findOne({ username });
      if (existingUser) {
        console.log('Username already exists');
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db1.collection('users').insertOne({ username, password: hashedPassword });
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
