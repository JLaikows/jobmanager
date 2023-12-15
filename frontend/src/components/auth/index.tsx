import { connect } from 'react-redux';
import { login, signup } from '../../actions/user';
import { TLoginUser, TSignUpUser } from '../../types/user';
import { Auth } from './component';
import { TState } from '../../types/state';

const mSTP = (state: TState) => ({});

const mDTP = (dispatch: any) => ({
  login: (user: TLoginUser) => dispatch(login(user)),
  signUp: (user: TSignUpUser) => dispatch(signup(user)),
});

export default connect(mSTP, mDTP)(Auth);
