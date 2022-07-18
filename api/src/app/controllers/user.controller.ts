import { Express, Router, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { compare as bcryptCompare } from 'bcrypt';
import { sign as JWT_Sign } from 'jsonwebtoken';

import { User } from '../models/user.model';
import { auth as authMiddleware } from '../middlewares/auth';
import Logging from '../../lib/Logging';

const EXPIRES_SECONDS = 50400; // 50400s = 840 minutes = 14h

function generateToken(params = {}) {
  return JWT_Sign(params, process.env.JWT_SECRET || 'secr3t', { expiresIn: EXPIRES_SECONDS }); // 50400s = 840 minutes = 14h
}

export function controller(app: Express): void {
  Logging.info('::: Loading user.controller.ts - base route: /api/user :::');

  const router = Router();

  router.get('/profile', authMiddleware, async (req: CustomRequest, res: any) => {
    try {
      const user = await User.findById(req.user_id);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: ReasonPhrases.NOT_FOUND
        });
      }
      return res.send(user);
    } catch (error) {
      Logging.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  router.get('/admin/list', authMiddleware, async (req: CustomRequest, res: any) => {
    try {
      const admin = await User.findById(req.user_id);

      if (!admin) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: ReasonPhrases.NOT_FOUND
        });
      }

      if (!admin.is_admin) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'User not allowed'
        });
      }

      const paginate_options = {
        limit: Number(req.query.limit || 10),
        page: Number(req.query.page || 1)
      };

      const users = await User.paginate(paginate_options);
      return res.send(users);
    } catch (error) {
      Logging.error(error);
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
      Logging.error(error);
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

      const JWT_TOKEN = generateToken({ id: user._id });
      const date_expires = new Date(Date.now()).setSeconds(EXPIRES_SECONDS);
      return res.send({
        token: JWT_TOKEN,
        token_expires: new Date(date_expires),
        user
      });
    } catch (error) {
      Logging.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
  });

  app.use('/api/user', router);
}

type CustomRequest = Request & {
  user_id: string;
}
