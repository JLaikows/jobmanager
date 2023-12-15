import { FC } from 'react';
import { Login } from '../../pages/Login';

interface IRequireAuth {
  user: any;
  getCurrentUser: () => void;
  children: any;
}

const RequireAuth: FC<IRequireAuth> = ({ user, children, getCurrentUser }) => {
  if (user === 'get-user') {
    getCurrentUser();
    return;
  }
  if (user) return children;
  return <Login />;
};

export default RequireAuth;
