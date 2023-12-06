import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import User from '../model/Schema.js';

const url = 'http://localhost:8000';

let gridFsBucket;

const conn = mongoose.connection;

conn.once('open', () => {
  // Create an instance of GridFSBucket using the new keyword
  gridFsBucket = new GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
});

export const uploadFile = async (req, res) => {console.log('hi');
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(404).json({ error: 'Files not found' });
    }

    const imageUrls = [];

    for (const file of req.files) {
      const imageUrl = `${url}/upload/file/${file.filename}`;
      imageUrls.push(imageUrl);
    }

    return res.status(200).json({ imageUrls });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    // Assuming User is a Mongoose model, replace it with your actual model
    const file = await User.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
