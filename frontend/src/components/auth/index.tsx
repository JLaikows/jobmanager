import { connect } from 'react-redux';
import { login, signup } from '../../actions/user';
import { TLoginUser, TSignUpUser } from '../../types/user';
import { Auth } from './component';

const mSTP = (state: any) => ({});

const mDTP = (dispatch: any) => ({
  login: (user: TLoginUser) => dispatch(login(user)),
  signUp: (user: TSignUpUser) => dispatch(signup(user)),
});

export default connect(mSTP, mDTP)(Auth);
