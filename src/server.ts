import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/connect';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch(error) {
    console.log(error);
  }
}

start();
