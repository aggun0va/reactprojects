import express, { json } from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const __dirname = path.dirname(__import Product from './models/product.model';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// console.log(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/products', productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port 'http://localhost:${port}'`);
});
