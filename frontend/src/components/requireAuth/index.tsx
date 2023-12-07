import { connect } from 'react-redux';
import RequireAuth from './component';
import { getCurrentUser } from '../../actions/user';

const mSTP = (state: any) => ({
  user: state.user,
});

const mDTP = (dispatch: any) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mSTP, mDTP)(RequireAuth);
