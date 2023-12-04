import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../models/User';

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = process.env.SECRET_OR_KEY;
const options: StrategyOptions = {
  jwtFromRequest,
  secretOrKey,
};

export const initializePassport = (passport: any) => {
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then((user) => {
        if (user) {
          // return the user to the frontend
          return done(null, user);
        }
        // return false since there is no user
        return done(null, false);
      });
    }),
  );
};
