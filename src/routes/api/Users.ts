import express, { Request, Response } from 'express';
import * as _ from 'lodash';
import User, { User as TUser } from '../../models/User';
import { ResponseStatus } from '../../types/global';
import bcryptjs from 'bcryptjs';
import passport from 'passport';
import Logger from '../../lib/logger';
import jwt from 'jsonwebtoken';
const secretOrKey = process.env.SECRET_OR_KEY;
const router = express.Router();

const USER_RETURN_VALUES = [
  'email',
  'firstName',
  'lastName',
  'linkedIn',
  'github',
];

//todo: remove callback and call res.json in the main post body
router.post('/register', async (req: Request, res: Response) => {
  const userInfo: Partial<TUser> = req.body;

  const userExists: TUser | null = await User.findOne({
    email: userInfo.email,
  });
  if (userExists)
    res.status(500).json({
      status: ResponseStatus.FAILED,
      errorMessage: 'Email Already Taken',
    });
  const user = new User(userInfo);

  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      res
        .status(500)
        .json({ status: ResponseStatus.FAILED, errorMessage: err.message });
    }
    bcryptjs.hash(user.password, salt, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .json({ status: ResponseStatus.FAILED, errorMessage: err.message });
      }
      user.password = hash;
      user.save().then((newUser) => {
        const payload = { id: newUser?.id, email: newUser.email };
        jwt.sign(
          payload,
          secretOrKey as string,
          { expiresIn: 3600 },
          (err: Error | null, token?: string) => {
            res.json({
              status: ResponseStatus.SUCCESS,
              token: 'Bearer ' + token,
              user: _.pick(user, USER_RETURN_VALUES),
            });
          },
        );
      });
    });
  });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        errorMessage: 'Email doesn`t exist in database',
      });
      return;
    }

    bcryptjs.compare(password, user?.password || '').then((isMatch) => {
      if (isMatch) {
        const payload = { id: user?._id, username: user?.email };

        jwt.sign(
          payload,
          secretOrKey as string,
          { expiresIn: 3600 },
          (err: Error | null, token?: string) => {
            res.json({
              status: ResponseStatus.SUCCESS,
              token: 'Bearer ' + token,
              user: _.pick(user, USER_RETURN_VALUES),
            });
          },
        );
      } else {
        res.status(500).json({
          status: ResponseStatus.FAILED,
          errorMessage: 'Incorrect Password',
        });
      }
    });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    if (!user) {
      Logger.warn('No current User found');
      res.status(500).json({
        errorMessage: 'No Current User Found',
      });
      return;
    }
    res.json({ user: _.pick(user, USER_RETURN_VALUES) });
  },
);

export { router as UserRouter };
