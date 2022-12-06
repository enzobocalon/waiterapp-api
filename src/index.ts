import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const PORT = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Controll-Allow-Origin', 'http://127.0.0.1:5173');
      res.setHeader('Access-Controll-Allow-Methods', '*');
      res.setHeader('Access-Controll-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀 Running server on http://localhost:${PORT}`);
    });

  })
  .catch(() => console.log('❌ Failed to connect to database.'));

