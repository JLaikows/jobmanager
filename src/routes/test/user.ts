import express, { Request, Response } from 'express';
import * as _ from 'lodash';
import Logger from '../../lib/logger';
import passport from 'passport';
import { User } from '../../models/User';
const router = express.Router();

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
    res.json(_.omit(user, 'password'));
  },
);

export { router as userRouter };
