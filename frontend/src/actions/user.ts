import { UserActions } from '../reducers/user';
import { jwtDecode } from 'jwt-decode';
import { TLoginUser, TSignUpUser } from '../types/user';
import * as authAPI from '../utils/auth';
import { addError } from './error';

const loginUser = (user: TLoginUser) => ({
  type: UserActions.LOGIN,
  user,
});

const logoutUser = () => ({
  type: UserActions.LOGOUT,
});

export const signup = (user: TSignUpUser) => (dispatch: any) =>
  authAPI
    .signup(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      authAPI.setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(loginUser(decoded as TLoginUser));
    })
    .catch((err) => {
      dispatch(addError(err.message));
    });

export const login = (user: TLoginUser) => (dispatch: any) =>
  authAPI
    .login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      authAPI.setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(loginUser(decoded as any));
    })
    .catch((err) => {
      dispatch(addError(err.message));
    });

export const logout = () => (dispatch: any) => {
  console.log('hit');
  localStorage.removeItem('jwtToken');
  authAPI.setAuthToken(null);
  dispatch(logoutUser());
};
