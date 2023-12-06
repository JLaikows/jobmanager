import { FC, useMemo, useState } from 'react';
import { TLoginUser, TSignUpUser } from '../../types/user';
import { Button, TextField } from '@mui/material';
import { MagicMotion } from 'react-magic-motion';
import * as _ from 'lodash';

interface IAuth {
  login: (user: TLoginUser) => void;
  signUp: (user: TSignUpUser) => void;
}

interface IJMTextField {
  label: string;
  name: string;
  type?: any;
  onClick?: any;
}

enum FormTypes {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
}

export const JMTextField: FC<IJMTextField> = (props) => (
  <div style={{ padding: '2% 0%' }}>
    <TextField {...props}></TextField>
  </div>
);

export const Auth: FC<IAuth> = ({ login, signUp }) => {
  const [formType, setFormType] = useState(FormTypes.SIGN_UP);
  const [userInfo, setUserInfo] = useState({});

  const isSignUp = useMemo(() => formType === FormTypes.SIGN_UP, [formType]);

  const updateFormType = (e: any, type: FormTypes) => {
    e.preventDefault();
    if (type != formType) {
      setFormType(type);
    }
  };

  const onUpdate = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log('hit');
    if (isSignUp) {
      signUp(userInfo as any);
    }
    const user: any = _.pickBy(userInfo, ['email, password']);
    login(user);
  };

  return (
    <MagicMotion>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10% 5%',
          margin: '10% 0%',
          width: '80%',
          border: '2px solid #7A8D7D',
          borderRadius: '10px',
          transitionDuration: '1s',
        }}
      >
        {isSignUp && (
          <>
            <JMTextField key="a" label="First Name" name="firstName" />
            <JMTextField key="b" label="Last Name" name="lastName" />
            <JMTextField key="v" label="LinkedIn" name="LinkedIn" />
            <JMTextField key="f" label="Github" name="github" />
          </>
        )}
        <JMTextField key="d " label="Email" name="email" />
        <JMTextField key="1" type="password" label="Password" name="password" />
        <Button variant="contained" onClick={onSubmit}>
          {isSignUp ? 'Create User' : 'Login'}
        </Button>
        <div>
          <Button onClick={(e) => updateFormType(e, FormTypes.LOGIN)}>
            Login
          </Button>
          <Button onClick={(e) => updateFormType(e, FormTypes.SIGN_UP)}>
            Sign Up
          </Button>
        </div>
      </form>
    </MagicMotion>
  );
};
