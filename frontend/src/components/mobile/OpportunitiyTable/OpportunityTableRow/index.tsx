import { connect } from 'react-redux';
import { updateLastChecked } from '../../../../actions/opportunities';
import { MobileOpportunityTableRow } from './component';

const mSTP = (state: any) => ({});

const mDTP = (dispatch: any) => ({
  updateLastChecked: (opportunityId: string) =>
    dispatch(updateLastChecked(opportunityId)),
});

export default connect(mSTP, mDTP)(MobileOpportunityTableRow);
