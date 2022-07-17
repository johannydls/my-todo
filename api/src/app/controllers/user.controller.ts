import { Express, Router, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { User } from "../models/user.model";

export function controller (app: Express) {
  console.log('::: Loading user.controller.ts - base route: /api/user :::');

  const router = Router();

  router.get('/admin/list', async (req: Request, res: Response) => {
    try {
      const users = await User.paginate();
      return res.send(users);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  app.use('/api/user', router);
}