// src/pages/api/user/login.js
import { clientPromise } from '../../../utils/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const { method } = req;

  console.log(`Received request: ${method}`); // Log request method

  try {
    const database = await clientPromise;
    const db1 = database.db("auth");

    if (method === 'POST') {
      const { username, password } = req.body;

      console.log('Login endpoint hit');
      const user = await db1.collection('users').findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log('Invalid credentials');
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('User logged in successfully');
      res.status(200).json({ token });
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
