import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";


const storage = new GridFsStorage({
  url: `mongodb://127.0.0.1:27017/image`,
  file: (req, file) => {
    console.log(file);
      const match = ["image/png", "image/jpg"];
    const trimmedFileName = file.originalname.replace(/\s+/g, '-');

      if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${trimmedFileName}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-file-${trimmedFileName}`,
    };
  },
});

const uploadFile= multer({ storage });
export default uploadFile;