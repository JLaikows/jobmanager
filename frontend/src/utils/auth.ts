import axios from 'axios';
import { TLoginUser, TSignUpUser } from '../types/user';
import { getApiServer } from './fetch';
import store from '../store';

const apiServer = getApiServer();

export const setAuthToken = (token: string | null) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
    return;
  }
  axios.defaults.headers.common['Authorization'] = token;
};

export const createDefaultStore = async () => {
  try {
    setAuthToken(localStorage.jwtToken);
    const res = await getCurrentUser();
    const preloadedState = {
      user: res.data.user,
    };
    return store(preloadedState);
  } catch {
    return store({ user: null });
  }
};

export const signup = (userData: TSignUpUser) => {
  return axios.post(apiServer + '/users/register', userData);
};

export const login = (userData: TLoginUser) => {
  return axios.post(apiServer + '/users/login', userData);
};

export const getCurrentUser = () => {
  return axios.get(apiServer + '/users/current');
};
