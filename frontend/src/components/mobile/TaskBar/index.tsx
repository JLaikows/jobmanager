import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import LogoutButton from '../../logoutButton';

export const Taskbar: FC = () => {
  const onClick = () => {
    window.location.href = 'http://localhost:3000/create';
  };

  return (
    <Box
      sx={{
        height: '30px',
        padding: '10px 10px',
        backgroundColor: '#7A8D7D',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button
        value="redirect"
        variant="text"
        color="secondary"
        onClick={onClick}
      >
        <Typography fontWeight="bold" color="white">
          +
        </Typography>
      </Button>
      <LogoutButton />
    </Box>
  );
};
