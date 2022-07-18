import { Request } from 'express';
import { verify as JWT_Verify,  } from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export function auth (req: CustomRequest, res: any, next: any): any {
  const auth_header = req.headers ? req.headers.authorization : '';
  // const authCookie = req.cookies ? req.cookies.authorization : '';

  if (!auth_header) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized. Missing "authorization" token in header request'
    });
  }

  const parts = auth_header.split('.');

  if (!(parts.length === 3)) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Token error' });
  }

  const [part1, part2, part3] = parts;
  if (!(part1.length === 36)) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Token malformatted' });
  }

  const decoded = JWT_Verify(auth_header, process.env.JWT_SECRET || '') as any;

  if (decoded) {
    req.user_id = decoded.id;
    return next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Invalid token' });
  }

}

type CustomRequest = Request & {
  user_id: string;
}
