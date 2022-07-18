import { Express, Router, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { ITask, Task } from '../models/task.model';

import { auth as authMiddleware } from '../middlewares/auth';
import { IUser, User } from '../models/user.model';
import Logging from '../../lib/Logging';

export function controller(app: Express): void {
  Logging.info('::: Loading task.controller.ts - base route: /api/task :::');

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
        ],
        sort: '-updated_at'
      };

      const tasks = await Task.paginate(paginate_options);

      return res.send(tasks);
    } catch (error) {
      Logging.error(error);
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
      Logging.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  router.put('/edit/:task_id', authMiddleware, async (req: CustomRequest, res: any) => {
    try {
      let user: IUser | any, task: ITask | any;

      await Promise.all([
        User.findById(req.user_id),
        Task.findById(req.params.task_id)
      ]).then(result => {
        user = result[0];
        task = result[1];
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: 'User not found'
        });
      }
      if (!task) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: 'Task not found'
        });
      }
      if (`${task.owner}` !== `${user._id}`) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Unauthorized. The task does not belong to you'
        });
      }

      task = await Task.findByIdAndUpdate(task._id, {
        $set: { ...req.body }
      },
        { new: true }
      );

      return res.send(task);
    } catch (error) {
      Logging.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  router.put('/archive/:task_id', authMiddleware, async (req: CustomRequest, res: any) => {
    try {
      let user: IUser | any, task: ITask | any;

      await Promise.all([
        User.findById(req.user_id),
        Task.findById(req.params.task_id)
      ]).then(result => {
        user = result[0];
        task = result[1];
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: 'User not found'
        });
      }
      if (!task) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: 'Task not found'
        });
      }
      if (`${task.owner}` !== `${user._id}`) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Unauthorized. The task does not belong to you'
        });
      }

      task = await Task.findByIdAndUpdate(task._id, {
        $set: {
          status: task.status === 'archived' ? 'pending' : 'archived',
          is_archived: task.is_archived ? false : true
        }
      },
        { new: true }
      );

      return res.send(task);
    } catch (error) {
      Logging.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  router.delete('/delete/:task_id', authMiddleware, async (req: CustomRequest, res: any) => {
    try {
      let user: IUser | any, task: ITask | any;

      await Promise.all([
        User.findById(req.user_id),
        Task.findById(req.params.task_id)
      ]).then(result => {
        user = result[0];
        task = result[1];
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: 'User not found'
        });
      }
      if (!task) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: 'Task not found'
        });
      }
      if (`${task.owner}` !== `${user._id}`) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Unauthorized. The task does not belong to you'
        });
      }

      await Task.findByIdAndDelete(task._id);

      return res.send({ message: 'Task deleted permanently' });
    } catch (error) {
      Logging.error(error);
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
