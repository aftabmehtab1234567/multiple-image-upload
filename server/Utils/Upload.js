import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: `mongodb://127.0.0.1:27017/image`,
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    const trimmedFileName = file.originalname.replace(/\s+/g, '-');
    const fileExtension = file.mimetype.split('/')[1]; // Changed index from [10] to [1]

    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${trimmedFileName}.${fileExtension}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-file-${trimmedFileName}.${fileExtension}`,
    };
  },
});

const Upload = multer({ storage }).array('images', 10);

export default Upload;
