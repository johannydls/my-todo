import { Express, Router, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { Task } from '../models/task.model';

export function controller(app: Express): void {
  console.log('::: Loading task.controller.ts - base route: /api/task :::');

  const router = Router();

  router.get('/list', async (req: Request, res: Response) => {
    try {
      const paginate_options = {
        query: {},
        limit: 10,
        page: 1,
        populate: [
          { path: 'owner', select: 'email' }
        ]
      }
      const tasks = await Task.paginate(paginate_options);

      return res.send(tasks);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  router.post('/create', async (req, res) => {
    try {
      console.log(req.body);
      const body = { ...req.body };
      body.is_archived = false;

      const task = await Task.create(body);

      return res.send(task);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  app.use('/api/task', router);
}