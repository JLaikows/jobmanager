import { TOpportunity } from '../types/opportunity';
import { UserActions } from './user';

export enum OpportunityActions {
  GET_OPPORTUNITIES = 'GET_OPPORTUNITES',
  UPDATE_OPPORTUNITY = 'UPDATE_OPPORTUNITY',
  ADD_OPPORTUNITY = 'ADD_OPPORTUNITY',
}

export type TOpportunityAction = {
  type: OpportunityActions | UserActions;
  opportunities: TOpportunity | undefined;
};

const initialState: { [key: string]: TOpportunity } = {};

const opportunityReducer = (
  state = initialState,
  action: TOpportunityAction,
) => {
  switch (action.type) {
    case OpportunityActions.UPDATE_OPPORTUNITY:
      return {
        ...state,
        ...action.opportunities,
      };
    case OpportunityActions.GET_OPPORTUNITIES:
      return {
        ...action.opportunities,
      };
    case OpportunityActions.ADD_OPPORTUNITY:
      return {
        ...state,
        ...action.opportunities,
      };
    case UserActions.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default opportunityReducer;
