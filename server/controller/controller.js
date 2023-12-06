import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});

export const uploadFile = async (req, res) => {console.log('hoi');
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(404).json({ error: 'Files not found' });
    }

    const imageUrls = [];

    // Iterate through each file in req.files
    for (const file of req.files) {
      const imageUrl = `${url}/upload/file/${file.filename}`;
      imageUrls.push(imageUrl);
    }

    // Send the array of image URLs in the response
    return res.status(200).json({ imageUrls });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
