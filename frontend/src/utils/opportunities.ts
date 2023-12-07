import { getApiServer } from './fetch';
import axios from 'axios';

const apiServer = getApiServer();

export const getAllOpportunities = () => {
  return axios.get(apiServer + '/opportunities');
};
