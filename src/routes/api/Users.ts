import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { User as UserType } from '../../models/User';
import { createUser } from '../../lib/users/user';
import { Status } from '../../types/global';
import { stringify } from 'querystring';
const secretOrKey = process.env.SECRET_OR_KEY;
const router = express.Router();

//todo: remove callback and call res.json in the main post body
router.post('/register', async (req: Request, res: Response) => {
  const userInfo: Partial<UserType> = req.body;
  const callback = (err: Error | null, token?: string) => {
    res.json({
      status: Status.SUCCESS,
      token: 'Bearer ' + token,
    });
  };

  try {
    await createUser(userInfo, callback);
    //response is returned in the above callback
  } catch (e) {
    let message = 'Unknown Error Occured Creating User';
    if (e instanceof Error) message = e.message;
    res.status(400).json({
      status: Status.FAILED,
      errorMessage: message,
    });
  }
});

export { router as UserRouter };
