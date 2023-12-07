import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { LogoutButton } from './component';

const mSTP = (state: any) => ({});

const mDTP = (dispatch: any) => ({
  logout: () => dispatch(logout()),
});

export default connect(mSTP, mDTP)(LogoutButton);
