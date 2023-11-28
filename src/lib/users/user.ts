import User, { UserLogin, User as UserType } from '../../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Logger from '../logger';
const secretOrKey = process.env.SECRET_OR_KEY;

/**
 * @description Creates a new user in the database. Takes UserInfo and a callback function for after the user is created. Will return an error if invalid UserInfo is passed in
 * @param {UserType} UserObject - User info is passed in to create a user
 * @param {Function} callback - takes a callback to call after the user is created
 * @returns {Promise<void>}
 * */
export const createUser = async (
  userInfo: Partial<UserType>,
  callback: (err: Error | null, token: string | undefined) => void,
): Promise<void> => {
  const userExists: UserType = await User.findOne({ email: userInfo.email });
  if (userExists) throw new Error('Email Already Taken');
  const user = new User(userInfo);

  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(user.password, salt, async (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save().then((newUser: UserType) => {
        const payload = { id: newUser.id, email: newUser.email };
        jwt.sign(payload, secretOrKey as string, { expiresIn: 3600 }, callback);
      });
    });
  });
};

/**
 * @description Attempts to login a user based on email and password. Returns error if password doesn't match, or user isn't found
 * @param {UserLogin} UserLogin - User Login info
 * @param {Function} callback - takes a callback for after the user is logged in
 * @returns {Promise<void>}
 */
export const loginUser = async (
  userInfo: UserLogin,
  callback: (err: Error | null, token: string | undefined) => void,
): Promise<void> => {
  const { email, password } = userInfo;

  User.findOne({ email }).then((user: UserType) => {
    if (!user) {
      throw new Error('Email not yet included in ');
    }

    bcryptjs.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.email };

        jwt.sign(payload, secretOrKey as string, { expiresIn: 3600 }, callback);
      } else {
        throw new Error('Incorrect Password');
      }
    });
  });
};
