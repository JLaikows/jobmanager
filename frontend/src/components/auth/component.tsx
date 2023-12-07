import { FC, useMemo, useState } from 'react';
import { TLoginUser, TSignUpUser } from '../../types/user';
import { Button, TextField } from '@mui/material';
import * as _ from 'lodash';

interface IAuth {
  login: (user: TLoginUser) => void;
  signUp: (user: TSignUpUser) => void;
}

interface IJMTextField {
  label: string;
  name: string;
  type?: any;
  onChange?: any;
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
    if (type !== formType) {
      setFormType(type);
    }
  };

  const onUpdate = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (isSignUp) {
      signUp(userInfo as any);
      return;
    }
    const user: any = _.pick(userInfo, ['email', 'password']);
    login(user);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10% 5%',
        // margin: '10% 0%',
        width: '80%',
        border: '2px solid #7A8D7D',
        borderRadius: '10px',
        transitionDuration: '1s',
      }}
    >
      {isSignUp && (
        <>
          <JMTextField
            onChange={(e: any) => onUpdate(e)}
            key="a"
            label="First Name"
            name="firstName"
          />
          <JMTextField
            onChange={(e: any) => onUpdate(e)}
            key="b"
            label="Last Name"
            name="lastName"
          />
          <JMTextField
            onChange={(e: any) => onUpdate(e)}
            key="v"
            label="LinkedIn"
            name="LinkedIn"
          />
          <JMTextField
            onChange={(e: any) => onUpdate(e)}
            key="f"
            label="Github"
            name="github"
          />
        </>
      )}
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="d "
        label="Email"
        name="email"
      />
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="1"
        type="password"
        label="Password"
        name="password"
      />
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
  );
};
