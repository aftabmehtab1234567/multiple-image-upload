// routes.js
import express from 'express';
import Upload from '../Utils/upload.js';
import { uploadFile } from '../controller/controller.js';
const router = express.Router();

router.post('/upload', Upload.array('file', 6), uploadFile);

export default router;
