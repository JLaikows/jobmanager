import express, { Request, Response } from 'express';
import * as _ from 'lodash';
import { UserLogin, User as TUser } from '../../models/User';
import { createUser, loginUser } from '../../lib/users/user';
import { ResponseStatus } from '../../types/global';
import { stringify } from 'querystring';
import passport from 'passport';
import Logger from '../../lib/logger';
const secretOrKey = process.env.SECRET_OR_KEY;
const router = express.Router();

//todo: remove callback and call res.json in the main post body
router.post('/register', async (req: Request, res: Response) => {
  const userInfo: Partial<TUser> = req.body;
  const callback = (err: Error | null, token?: string) => {
    res.json({
      status: ResponseStatus.SUCCESS,
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
      status: ResponseStatus.FAILED,
      errorMessage: message,
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const userInfo: UserLogin = req.body;
  const callback = (err: Error | null, token?: string) => {
    res.json({
      status: ResponseStatus.SUCCESS,
      token: 'Bearer ' + token,
    });
  };

  try {
    await loginUser(userInfo, callback);
    //response is returned in the above callback
  } catch (e) {
    let message = 'Unknown Error Occured Loggin in User';
    if (e instanceof Error) message = e.message;
    res.status(400).json({
      status: ResponseStatus.FAILED,
      errorMessage: message,
    });
  }
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    if (!user) {
      Logger.warn('No current User found');
      res.status(400).json({
        errorMessage: 'No Current User Found',
      });
      return;
    }
    res.json(_.omit(user, ['password']));
  },
);

export { router as UserRouter };
