import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors()); 
// console.log(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/api/products', (req, res) => {});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port 'http://localhost:${port}'`);
});
