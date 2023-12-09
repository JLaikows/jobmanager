import { getApiServer } from './fetch';
import axios from 'axios';

const apiServer = getApiServer();

export const getAllOpportunities = () => {
  return axios.get(apiServer + '/opportunities');
};

export const createOpportunity = (opportunity: any) => {
  return axios.post(apiServer + '/opportunities', opportunity);
};

export const updateLastChecked = (opportunityId: string) => {
  return axios.post(
    apiServer + `/opportunities/${opportunityId}/update-last-checked`,
  );
};

export const updateOpportunity = (opportunityId: string, opportunity: any) => {
  return axios.post(apiServer + `/opportunities/${opportunityId}`, opportunity);
};
