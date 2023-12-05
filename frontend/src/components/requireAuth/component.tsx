import { FC } from 'react';

interface IRequireAuth {
  user: any;
  children: any;
}

const RequireAuth: FC<IRequireAuth> = ({ user, children }) => {
  if (user) {
    return children;
  }
  return null;
};

export default RequireAuth;
