require('dotenv').config();

import express, { Request, Response } from 'express';

const app = express();

app.get('/api', (_req: Request, res: Response) => {
  return res.send({ info: 'API TODO APP', version: '1.0.0' });
});

const PORT = process.env.SERVER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`\nAPI listening on http://localhost:${PORT}`);
});