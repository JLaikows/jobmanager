import { connect } from 'react-redux';
import { OpportunityForm } from './component';
import { createOpportunity } from '../../actions/opportunities';
import { TState } from '../../types/state';

const mSTP = (state: TState) => ({});

const mDTP = (dispatch: any) => ({
  createOpportunity: (opportunity: any) =>
    dispatch(createOpportunity(opportunity)),
});

export default connect(mSTP, mDTP)(OpportunityForm);
