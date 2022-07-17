import { Express, Router, Request, Response } from "express";

export function controller (app: Express) {
  console.log('::: Loading user.controller.ts - base route: /api/user :::');

  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    return res.send('Users');
  });

  app.use('/api/user', router);
}