import { connect } from 'react-redux';
import { getAllOpportunities } from '../../../actions/opportunities';
import { MobileOpportunityTable } from './component';
import { TState } from '../../../types/state';

const mSTP = (state: TState) => ({
  opportunities: Object.values(state.entities.opportunities).sort(
    (a: any, b: any) => {
      //sorts the values by the lastChecked, from oldest to most recent
      //type casting for now, should be updated with proper typing
      return (
        (new Date(a.lastChecked) as unknown as number) -
        (new Date(b.lastChecked) as unknown as number)
      );
    },
  ),
});

const mDTP = (dispatch: any) => ({
  getAllOpportunities: () => dispatch(getAllOpportunities()),
});

export default connect(mSTP, mDTP)(MobileOpportunityTable);
