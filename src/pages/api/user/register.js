import { clientPromise } from '../../../utils/mongodb';
import bcrypt from 'bcryptjs';

// Utility function to validate email addresses
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const handler = async (req, res) => {
  const { method } = req;

  console.log(`Received request: ${method}`); // Log request method

  try {
    const database = await clientPromise;
    const db1 = database.db("auth");

    if (method === 'POST') {
      const { email, password } = req.body;

      // Validate email address
      if (!validateEmail(email)) {
        console.log('Invalid email address');
        return res.status(400).json({ message: 'Invalid email address' });
      }

      console.log('Register endpoint hit');
      const existingUser = await db1.collection('users').findOne({ email });
      if (existingUser) {
        console.log('Email already exists');
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db1.collection('users').insertOne({ email, password: hashedPassword });
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
