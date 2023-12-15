import { Button, Typography } from '@mui/material';
import { FC } from 'react';

interface ILogoutButton {
  logout: () => void;
}

export const LogoutButton: FC<ILogoutButton> = ({ logout }) => {
  return (
    <Button variant="text" color="secondary" onClick={logout}>
      <Typography fontWeight="bold" color="white" variant="h6">
        Log out
      </Typography>
    </Button>
  );
};
