import { Express, Router, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { compare as bcryptCompare } from 'bcrypt';

import { User } from '../models/user.model';

export function controller (app: Express): void {
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

  router.post('/register', async (req: Request, res: Response) => {
    try {
      const body = { ...req.body };
      let user = await User.findOne({ email: body.email });

      if (user) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'User alread exists'
        });
      }

      body.is_admin = false;
      user = await User.create(body);
      user.password = undefined;
      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  router.post('/authenticate', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({ 
          message: ReasonPhrases.NOT_FOUND 
        });
      }

      if (!await bcryptCompare(password, user.password || '')) {
        return res.status(StatusCodes.BAD_REQUEST).send({ 
          message: 'Invalid password' 
        }); 
      }

      user.password = undefined;

      return res.send({
        user
      });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  app.use('/api/user', router);
}