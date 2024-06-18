// src/pages/api/user.js
import { connectToDatabase } from '../../utils/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    switch (method) {
      case 'POST':
        const { username, password } = req.body;

        if (req.url.endsWith('/register')) {
          console.log('Register endpoint hit');
          const existingUser = await db.collection('users').findOne({ username });
          if (existingUser) {
            console.log('Username already exists');
            return res.status(400).json({ message: 'Username already exists' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          await db.collection('users').insertOne({ username, password: hashedPassword });
          console.log('User registered successfully');
          res.status(201).json({ message: 'User registered' });
        } else if (req.url.endsWith('/login')) {
          console.log('Login endpoint hit');
          const user = await db.collection('users').findOne({ username });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          console.log('User logged in successfully');
          res.status(200).json({ token });
        }
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
