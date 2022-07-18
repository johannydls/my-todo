require('dotenv').config();

import express, { Request, Response, NextFunction, json, urlencoded } from 'express';

import '../config/database';
import Logging from '../lib/Logging';
import { loadControllers } from './controllers';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(function (_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log();
  Logging.infoRequest(`${req.method} ${req.url} - IP: [${req.socket?.remoteAddress}]`);
  const date_start = new Date(Date.now());
  res.on('finish', () => {
    const date_end = new Date(Date.now());
    const time = new Date(date_end.getTime() - date_start.getTime()).getMilliseconds();
    Logging.infoRequest(`${req.method} ${req.originalUrl} - IP: [${req.socket?.remoteAddress}] - Status: [${res.statusCode}] - Time: [${time}ms]`);
  });
  next();
});

app.get('/api', (_req: Request, res: Response) => {
  return res.send({ info: 'API TODO APP', version: '1.0.0' });
});

loadControllers(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`[${req.method} ${req.url}] not found`);
  Logging.error(error);
  return res.status(404).send({ message: error.message });
});

const PORT = process.env.SERVER_PORT || 3002;

app.listen(PORT, () => {
  Logging.sysNL(`API listening on http://localhost:${PORT}`);
});
