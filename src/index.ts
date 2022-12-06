import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import cors from 'cors';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const PORT = 3001;

    app.use(cors({
      allowedHeaders: '*',
      origin: 'http://localhost:5173',
      methods: '*'
    }));
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀 Running server on http://localhost:${PORT}`);
    });

  })
  .catch(() => console.log('❌ Failed to connect to database.'));

