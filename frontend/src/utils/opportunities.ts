import { getApiServer } from './fetch';
import axios from 'axios';

const apiServer = getApiServer();

export const getAllOpportunities = () => {
  return axios.get(apiServer + '/opportunities');
};

export const createOpportunity = (opportunity: any) => {
  return axios.post(apiServer + '/opportunites/create', opportunity);
};
