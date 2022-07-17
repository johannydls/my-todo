require('dotenv').config();

import express, { Request, Response } from 'express';

import '../config/database';
import { loadControllers } from './controllers';

const app = express();

app.get('/api', (_req: Request, res: Response) => {
  return res.send({ info: 'API TODO APP', version: '1.0.0' });
});

loadControllers(app);

const PORT = process.env.SERVER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`\nAPI listening on http://localhost:${PORT}`);
});