import { clientPromise } from '../../../utils/mongodb';

const handler = async (req, res) => {
  const { method } = req;

  try {
    const client = await clientPromise;
    const db = client.db("auth"); // Use the 'auth' database
    const collection = db.collection("comments");

    switch (method) {
      case 'GET':
        const comments = await collection.find({}).toArray();
        res.status(200).json(comments);
        break;
      case 'POST':
        const { content } = req.body;
        const newComment = { content, replies: [] };
        const result = await collection.insertOne(newComment);
        const insertedComment = await collection.findOne({ _id: result.insertedId });
        res.status(201).json(insertedComment);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
