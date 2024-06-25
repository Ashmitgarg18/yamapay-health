import { clientPromise } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

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
        const { content, parentId } = req.body;
        const newComment = { content, replies: [] };

        if (parentId) {
          // This is a reply to an existing comment
          const parentComment = await collection.findOne({ _id: new ObjectId(parentId) });
          if (!parentComment) {
            return res.status(404).json({ message: 'Parent comment not found' });
          }
          const reply = { _id: new ObjectId(), content };
          await collection.updateOne({ _id: new ObjectId(parentId) }, { $push: { replies: reply } });
          res.status(201).json(reply);
        } else {
          // This is a new comment
          const result = await collection.insertOne(newComment);
          const insertedComment = await collection.findOne({ _id: result.insertedId });
          res.status(201).json(insertedComment);
        }
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
