import axios from 'axios';
import { TLoginUser, TSignUpUser } from '../types/user';

export const setAuthToken = (token: string | null) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
    return;
  }
  axios.defaults.headers.common['Authorization'] = token;
};

export const signup = (userData: TSignUpUser) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData: TLoginUser) => {
  return axios.post('/api/users/login', userData);
};
