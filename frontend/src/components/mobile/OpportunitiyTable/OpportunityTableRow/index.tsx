import { connect } from 'react-redux';
import {
  updateLastChecked,
  updateOpportunity,
} from '../../../../actions/opportunities';
import { MobileOpportunityTableRow } from './component';
import { TState } from '../../../../types/state';

const mSTP = (state: TState) => ({});

const mDTP = (dispatch: any) => ({
  updateLastChecked: (opportunityId: string) =>
    dispatch(updateLastChecked(opportunityId)),
  updateOpportunity: (opportunityId: string, opportunity: any) =>
    dispatch(updateOpportunity(opportunityId, opportunity)),
});

export default connect(mSTP, mDTP)(MobileOpportunityTableRow);
