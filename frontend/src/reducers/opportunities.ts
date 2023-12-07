import { UserActions } from './user';

export enum OpportunityActions {
  GET_OPPORTUNITIES = 'GET_OPPORTUNITES',
  UPDATE_OPPORTUNITY = 'UPDATE_OPPORTUNITY',
}

const initialState: any | undefined = {
  opportunity: {},
};

const opportunityReducer = (state = initialState, action: any) => {
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
    case UserActions.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default opportunityReducer;
