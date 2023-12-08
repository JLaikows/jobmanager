import { connect } from 'react-redux';
import { OpportunityForm } from './component';
import { createOpportunity } from '../../actions/opportunities';

const mSTP = (state: any) => ({});

const mDTP = (dispatch: any) => ({
  createOpportunity: (opportunity: any) =>
    dispatch(createOpportunity(opportunity)),
});

export default connect(mSTP, mDTP)(OpportunityForm);
