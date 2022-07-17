require('dotenv').config();

import express, { Request, Response, NextFunction, json } from 'express';

import '../config/database';
import { loadControllers } from './controllers';

const app = express();

app.use(json());

app.use(function (_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
  next();
});

app.get('/api', (_req: Request, res: Response) => {
  return res.send({ info: 'API TODO APP', version: '1.0.0' });
});

loadControllers(app);

const PORT = process.env.SERVER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`\nAPI listening on http://localhost:${PORT}`);
});