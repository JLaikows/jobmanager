import { UserActions } from '../reducers/user';
import { jwtDecode } from 'jwt-decode';
import { TLoginUser, TSignUpUser, TUser } from '../types/user';
import * as authAPI from '../utils/auth';
import { addError } from './error';

export const loginUser = (user: TUser) => ({
  type: UserActions.LOGIN,
  user,
});

export const logoutUser = () => ({
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
      dispatch(loginUser(decoded as any));
    })
    .catch((err) => {
      dispatch(addError(err.response.data));
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
      dispatch(addError(err.response.data));
    });

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('jwtToken');
  authAPI.setAuthToken(null);
  dispatch(logoutUser());
};
