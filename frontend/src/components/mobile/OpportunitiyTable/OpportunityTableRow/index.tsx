import { connect } from 'react-redux';
import {
  updateLastChecked,
  updateOpportunity,
} from '../../../../actions/opportunities';
import { MobileOpportunityTableRow } from './component';

const mSTP = (state: any) => ({});

const mDTP = (dispatch: any) => ({
  updateLastChecked: (opportunityId: string) =>
    dispatch(updateLastChecked(opportunityId)),
  updateOpportunity: (opportunityId: string, opportunity: any) =>
    dispatch(updateOpportunity(opportunityId, opportunity)),
});

export default connect(mSTP, mDTP)(MobileOpportunityTableRow);
