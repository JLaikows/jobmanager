import { Button } from '@mui/material';
import { FC } from 'react';

interface ILogoutButton {
  logout: () => void;
}

export const LogoutButton: FC<ILogoutButton> = ({ logout }) => {
  return <Button onClick={logout}>LogOut</Button>;
};
