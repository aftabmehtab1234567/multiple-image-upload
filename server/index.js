

import express from 'express';
import cors from 'cors';
import router from './route/routes.js'; // Correct the import path
import { connectToDatabase } from './Database/dbs.js';

const app = express();
app.use(cors());
app.use(express.json());
connectToDatabase();
// app.use(bodyParser.urlencoded({ extended: true }))

// Use the router for routing
app.use('/', router);
const Port = 8000;


app.listen(Port, () => console.log(`Server running successfully on Port ${Port}`));