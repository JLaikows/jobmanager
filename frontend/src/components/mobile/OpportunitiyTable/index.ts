import { connect } from 'react-redux';
import { getAllOpportunities } from '../../../actions/opportunities';
import { MobileOpportunityTable } from './component';

const mSTP = (state: any) => ({
  opportunities: Object.values(state.entities.opportunities),
});

const mDTP = (dispatch: any) => ({
  getAllOpportunities: () => dispatch(getAllOpportunities()),
});

export default connect(mSTP, mDTP)(MobileOpportunityTable);
