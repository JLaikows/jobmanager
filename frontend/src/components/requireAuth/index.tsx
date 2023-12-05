import { connect } from 'react-redux';
import RequireAuth from './component';

const mSTP = (state: any) => ({
  user: state.user,
});

const mDTP = (dispatch: any) => ({});

export default connect(mSTP, mDTP)(RequireAuth);
