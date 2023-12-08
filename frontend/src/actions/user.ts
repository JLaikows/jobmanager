import toast from 'react-hot-toast';
import { UserActions } from '../reducers/user';
import { TLoginUser, TSignUpUser, TUser } from '../types/user';
import * as authAPI from '../utils/auth';
import { addError } from './error';

const loginUser = (user: TLoginUser) => ({
  type: UserActions.LOGIN,
  user,
});

const logoutUser = () => ({
  type: UserActions.LOGOUT,
});

const updateUser = (user: TUser) => ({
  type: UserActions.UPDATE_PREFERENCES,
  user,
});

export const signup = (user: TSignUpUser) => (dispatch: any) =>
  authAPI
    .signup(user)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem('jwtToken', token);
      authAPI.setAuthToken(token);
      dispatch(loginUser(user));
    })
    .catch((err) => {
      toast.error(err.message);
      dispatch(addError(err.message));
    });

export const login = (user: TLoginUser) => (dispatch: any) =>
  authAPI
    .login(user)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem('jwtToken', token);
      authAPI.setAuthToken(token);
      dispatch(loginUser(user as any));
    })
    .catch((err) => {
      toast.error(err.message);
      dispatch(addError(err.message));
    });

export const getCurrentUser = () => (dispatch: any) => {
  authAPI
    .getCurrentUser()
    .then((res) => {
      const { user } = res.data;
      dispatch(updateUser(user));
    })
    .catch((err) => {
      toast.error(err.message);
      dispatch(addError(err.message));
    });
};

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('jwtToken');
  authAPI.setAuthToken(null);
  dispatch(logoutUser());
};
