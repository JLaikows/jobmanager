import { FC } from 'react';
import Auth from '../../components/auth';
import { Box } from '@mui/material';

export const Login: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100vh',
      }}
    >
      <Auth />
    </Box>
  );
};
