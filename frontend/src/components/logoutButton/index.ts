import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { LogoutButton } from './component';
import { TState } from '../../types/state';

const mSTP = (state: TState) => ({});

const mDTP = (dispatch: any) => ({
  logout: () => dispatch(logout()),
});

export default connect(mSTP, mDTP)(LogoutButton);
