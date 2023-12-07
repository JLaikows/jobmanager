import axios from 'axios';
import { TLoginUser, TSignUpUser } from '../types/user';
import { getApiServer } from './fetch';

const apiServer = getApiServer();

export const setAuthToken = (token: string | null) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
    return;
  }
  axios.defaults.headers.common['Authorization'] = token;
};

export const signup = (userData: TSignUpUser) => {
  return axios.post(apiServer + '/users/register', userData);
};

export const login = (userData: TLoginUser) => {
  return axios.post(apiServer + '/users/login', userData);
};
