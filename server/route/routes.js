import express from 'express';
import { uploadFile } from '../controller/controller.js';
import Upload from '../Utils/upload.js';

const router = express.Router();

router.post('/upload', (req,res)=>{
    console.log(req.files);
});


// Protected route using the verifyToken middleware

export default router;
