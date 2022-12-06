import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import http from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app); //for websocket
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const PORT = 3001;

    app.use(cors({
      allowedHeaders: '*',
      origin: 'http://localhost:5173',
      methods: '*'
    }));
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(PORT, () => {
      console.log(`🚀 Running server on http://localhost:${PORT}`);
    });

  })
  .catch(() => console.log('❌ Failed to connect to database.'));

