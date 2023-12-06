import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: `mongodb://127.0.0.1:27017/image`,
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];
    const trimmedFileName = file.originalname.replace(/\s+/g, '-');

    if (match.indexOf(file.mimetype) === -1) {
      // If mimetype doesn't match, return a unique filename
      return `${Date.now()}-file-${trimmedFileName}`;
    }

    // Return an object with the bucketName and filename for Multer GridFS Storage
    return {
      bucketName: "photos",
      filename: `${Date.now()}-file-${trimmedFileName}`,
    };
  },
});

export default multer({ storage });
