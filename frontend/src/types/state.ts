import { TOpportunity } from './opportunity';

export type TState = {
  user: TStateUser;
  errors: TStateErrors;
  entities: TStateEntities;
};

export type TStateUser = {
  email: string;
  firstName: string;
  github: string;
  lastName: string;
};

export type TStateErrors = {
  messages: string[];
};

export type TStateEntities = {
  opportunities: TStateOpportunities;
};

export type TStateOpportunities = {
  [key: string]: TOpportunity;
};
