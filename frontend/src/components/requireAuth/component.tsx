import { FC } from 'react';
import { Login } from '../../pages/Login/lindex';

interface IRequireAuth {
  user: any;
  children: any;
}

const RequireAuth: FC<IRequireAuth> = ({ user, children }) => {
  if (user) {
    return children;
  }
  return <Login />;
};

export default RequireAuth;
