import { OpportunityActions } from '../reducers/opportunities';
import * as _ from 'lodash';
import * as APIUtil from '../utils/opportunities';

const getAll = (opportunities: any) => ({
  type: OpportunityActions.GET_OPPORTUNITIES,
  opportunities,
});

export const getAllOpportunities = () => (dispatch: any) => {
  APIUtil.getAllOpportunities().then((res) => {
    const { opportunities } = res.data;
    const opportunitiesObject = _.keyBy(opportunities, '_id');
    dispatch(getAll(opportunitiesObject));
  });
};
