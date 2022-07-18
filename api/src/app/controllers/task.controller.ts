import { Express, Router, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { Task } from '../models/task.model';

import { auth as authMiddleware } from '../middlewares/auth';
import { User } from '../models/user.model';

export function controller(app: Express): void {
  console.log('::: Loading task.controller.ts - base route: /api/task :::');

  const router = Router();

  router.get('/list', authMiddleware, async (req: CustomRequest, res: any) => {
    try {
      const paginate_options = {
        query: {
          owner: req.user_id
        },
        limit: Number(req.query.limit || 10),
        page: Number(req.query.page || 1),
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

  router.post('/create', authMiddleware, async (req: CustomRequest, res: any) => {
    try {

      const user = await User.findById(req.user_id);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({ 
          message: ReasonPhrases.NOT_FOUND 
        });
      }
      
      const body = { ...req.body };
      body.is_archived = false;
      body.owner = user._id;

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

type CustomRequest = Request & {
  user_id: string;
}
